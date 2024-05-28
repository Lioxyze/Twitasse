const { pool } = require("../connexions/ConnexionSql");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { transporter } = require("../connexions/mailer");
require("dotenv").config();
const multer = require("multer");
const path = require("path");
const uploadDirectory = path.join(__dirname, "../public/uploads");
const { extractToken } = require("../Utils/Token");

// console.log(__dirname);
console.log(uploadDirectory);

const insertImageProfile = async (req, res) => {
  let newFileName;

  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDirectory);
    },

    filename: function (req, file, cb) {
      newFileName = `${file.fieldname}-${Date.now()}.jpg`;
      cb(null, newFileName);
    },
  });

  const maxSize = 3 * 1000 * 1000;

  let upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },

    fileFilter: function (req, file, cb) {
      var filetypes = /jpeg|jpg|png/;

      var mimetype = filetypes.test(file.mimetype);

      var extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
      );

      if (mimetype && extname) {
        // console.log("cest une image");
        return cb(null, true);
      }

      cb(
        "Error: File upload only supports the " +
          "following filetypes - " +
          filetypes
      );
    },
  }).single("image");

  upload(req, res, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send({ newFileName: newFileName });
    }
  });
};

const register = async (req, res) => {
  if (
    !req.body.Pseudo ||
    !req.body.Email ||
    !req.body.Image ||
    !req.body.Password
  ) {
    res.status(400).json({ error: "missing fields" });
    return;
  }
  let Pseudo = req.body.Pseudo;
  let Email = req.body.Email;
  let Image = req.body.Image;
  let Password = req.body.Password;

  try {
    const values = [Email];
    const sql = `SELECT Email FROM user WHERE Email =  ?`;
    const [result] = await pool.execute(sql, values);
    if (result.length !== 0) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    } else {
      const hash = await bcrypt.hash(Password, 10);

      const sqlInsertRequest =
        "INSERT INTO `user` VALUES (NULL, ?, ?, ?,?, ?,?,?)";

      const tokenBasis = Email + `${new Date()}`;
      const activationToken = await bcrypt.hash(tokenBasis, 10);

      let cleanToken = activationToken.replaceAll("/", "");

      const insertValues = [Pseudo, Email, Image, hash, 0, cleanToken, 2];

      const [rows] = await pool.execute(sqlInsertRequest, insertValues);

      if (rows.affectedRows > 0) {
        const info = await transporter.sendMail({
          from: `${process.env.SMTP_EMAIL}`,
          to: Email,
          subject: "Email activation",
          text: "Activate your remail",
          html: `<p> You need to activate your email, to access our services, please click on this link :
                <a href="http://localhost:3000/api/valideAccount/${cleanToken}">Activate your email</a>
          </p>`,
        });

        res.status(201).json({ success: "registration successfull" });
        return;
      } else {
        res.status(500).json({ error: "registration failed." });
        return;
      }
    }
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ message: "Erreur serveur" });
    return;
  }
};

const login = async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res.status(400).json({ error: "missing fields" });
  }

  try {
    const [result] = await pool.query(
      "SELECT * FROM user WHERE Email = ? AND isActive = 1",
      [Email]
    );

    if (result.length !== 1) {
      console.log(result);
      return res
        .status(401)
        .json({ error: "Invalid credentials or account not activated" });
    }

    const user = result[0];
    const passwordMatch = await bcrypt.compare(Password, user.Password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        email: user.Email,
        id: user.UserId,
        pseudo: user.Pseudo,
        picture: user.Image,
      },
      process.env.MY_SUPER_SECRET_KEY,
      { expiresIn: "20d" }
    );
    return res.status(200).json({ jwt: token, role: user.id_role });
  } catch (error) {
    console.log(error.stack);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.execute(`SELECT * FROM user WHERE 1`);

    res.status(200).json({ data: rows });
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const searchUser = async (req, res) => {
  try {
    const search = req.body.search;
    const [rows] = await pool.query(
      `SELECT * FROM user WHERE Pseudo LIKE "%${search}%"`
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.stack });
    return;
  }
};

const testEmail = async (req, res) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: "lorenzopro38@gmail.com",
      subject: "Test",
      text: "Hello world?",
      html: "<div> <h1>Email Subject ?</h1> <p> Paragraphe</p></div>",
    });

    console.log("Message sent: %s", info.messageId);
    return res.status(200).json(`Message sent with the id ${info.messageId}`);
  } catch (error) {
    console.error(error);
    // Affichez l'erreur pour déboguer
    console.error("SMTP Error:", error.message);
    return res.status(500).json({ error: "Failed to send email" });
  }
};

const DeleteUser = async (req, res) => {
  const token = await extractToken(req);
  jwt.verify(token, process.env.MY_SUPER_SECRET_KEY, async (err, authData) => {
    if (err) {
      console.log(err);
      res.status(401).json({ err: "Unauthorized" });
      return;
    } else {
      try {
        const id = req.params.id;
        const [rows] = await pool.execute(
          `DELETE FROM user WHERE UserId ="${id}" `
        );
        res.json(rows);
      } catch (err) {
        console.log(err.stack);
      }
    }
  });
};

const updatePassword = async (req, res) => {
  const tokenmailer = req.params.token;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const token = await extractToken(req);
  jwt.verify(token, process.env.MY_SUPER_SECRET_KEY, async (err, authData) => {
    if (err) {
      console.log(err);
      res.status(401).json({ err: "Unauthorized" });
      return;
    } else {
      try {
        const data = [hashedPassword, tokenmailer];
        const sql = `UPDATE user SET Password = ? WHERE Token= ?;  `;

        const [rows] = await pool.execute(sql, data);
        res.json(rows);
      } catch (err) {
        console.log(err);
      }
    }
  });
};

const UpdateMailpassword = async (req, res) => {
  const token = await extractToken(req);
  jwt.verify(token, process.env.MY_SUPER_SECRET_KEY, async (err, authData) => {
    if (err) {
      console.log(err);
      res.status(401).json({ err: "Unauthorized" });
      return;
    } else {
      const email = authData.Email;
      const tokenTemporaire = jwt.sign(
        {
          id: authData.UserId,
          email: authData.Email,
        },

        process.env.MY_SUPER_SECRET_KEY,
        { expiresIn: "1h" }
      );
      const data = [tokenTemporaire, email];
      const sql = `UPDATE user SET Token = ? WHERE Email = ?;  `;

      const [rows] = await pool.execute(sql, data);

      if (rows.affectedRows === 1) {
        const link = `http://127.0.0.1:5500/Auth/Change_Password/change_password.html?token=${tokenTemporaire}`;

        const info = await transporter.sendMail({
          from: `Twittasse@gmail.com`,
          to: "lorenzopro38@gmail.com",
          subject: `changer votre mot de passe`,
          text: `suivre le mail suivant`,
          html: `<b>Bonjour ${authData.pseudo}</b>
    <p>voici le lien qui vous permettra de changer votre mot de passe : </p>
    <a href="${link}" >cliquer ici</a>`,
        });

        res
          .status(200)
          .json({ msg: `Message send with the id ${info.messageId}` });
      }
    }
  });
};

// Activation de compte
const valideAccount = async (req, res) => {
  try {
    // On récupère le token présent dans le lien de l'email.
    const token = req.params.token;
    // On recherche l'utilisateur qui aurait ce token, que nous avions insérer lors
    // de la création
    const sql = `SELECT * FROM user WHERE token = ?`;
    const values = [token];
    const [result] = await pool.execute(sql, values);
    if (!result) {
      res.status(204).json({ error: "Wrong credentials" });
      return;
    }
    // Si l'utilisateur ayant ce token existe, alors j'active le compte ,
    // et supprime le token car il ne me sera plus utile pour le moment
    await pool.execute(
      `UPDATE user SET is_active = 1, token = NULL WHERE token = ?`,
      [token]
    );
    return res.status(200).json({ result: "Account activated" });
  } catch (error) {
    res.status(500).json({ error: error.stack });
    console.log(error.stack);
  }
};

// Génération du mail renouvellement mot de passe
const emailForgotPassword = async (req, res) => {
  if (!req.body.email) {
    res
      .status(400)
      .json({ error: "merci d'indiquer votre mail de connexion !" });
    return;
  }
  try {
    const email = req.body.email;
    const values = [email];
    const sql = `SELECT * FROM user WHERE email =  ?`;
    const [result] = await pool.execute(sql, values);
    if (result.length === 0) {
      res.status(400).json({
        error: "Ce mail est erroné",
      });
      return;
    } else {
      const token = jwt.sign(
        {
          email: result[0].email,
          id: result[0].id,
          user_name: result[0].user_name,
          picture_user: result[0].picture_user,
        },
        process.env.SECRET_KEY,
        { expiresIn: "20d" }
      );
      const info = await transporter.sendMail({
        from: `${process.env.SMTP_EMAIL}`,
        to: "steve.chapuis4@free.fr",
        subject: "Regénération de votre mot de passe ✔",
        text: "Activer votre compte",
        html: `<p> You need to activate your email, to access our services, please click on this link :
                <a href="http://127.0.0.1:5500/front/Views/auth/ForgotPassword.html?token=${token}">Activate your email</a>
          </p>`,
      });
      console.log(result);
      // res.status(201).json({ success: "Envoie de mail réussi" });
      console.log();
      res.status(200).json({ jwt: token });
      return;
    }
  } catch (error) {
    console.log(error.stack);
    res.status(500).json({ error: "Erreur du serveur" });
    return;
  }
};

// Réinitialisation du mot de passe
const ForgotPassword = async (request, response) => {
  const token = await extractToken(request);
  jwt.verify(token, process.env.SECRET_KEY, async (err, authData) => {
    if (err) {
      console.log(err);
      response
        .status(401)
        .json({ err: "Requête non autorisée le Token n'est pas bon" });
      return;
    }
    if (!request.body.password) {
      response.status(400).json({ error: "Champs manquants" });
      return;
    }
    const password = request.body.password;
    const email = authData.email;
    const hash = await bcrypt.hash(password, 10);
    const sqlModifRequest = `UPDATE user SET password = ? WHERE email = ?`;

    const modifValues = [hash, email];
    const [rows] = await pool.execute(sqlModifRequest, modifValues);
    if (rows.affectedRows > 0) {
      response
        .status(201)
        .json({ success: "Mofification mot de passe réussi" });
      return;
    } else {
      response.status(500).json({ error: "L'inscription a échoué" });
      return;
    }
  });
};

module.exports = {
  register,
  login,
  getAllUsers,
  testEmail,
  insertImageProfile,
  valideAccount,
  searchUser,
  DeleteUser,
  updatePassword,
  UpdateMailpassword,
  valideAccount,
  emailForgotPassword,
  ForgotPassword,
};
