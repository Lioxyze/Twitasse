// const updatePassword = async (req, res) => {
//   const tokenmailer = req.params.token;
//   const hashedPassword = await bcrypt.hash(req.body.password, 10);

//   const token = await extractToken(req);
//   jwt.verify(token, process.env.MY_SUPER_SECRET_KEY, async (err, authData) => {
//     if (err) {
//       console.log(err);
//       res.status(401).json({ err: "Unauthorized" });
//       return;
//     } else {
//       try {
//         const data = [hashedPassword, tokenmailer];
//         const sql = `UPDATE user SET Password = ? WHERE Token= ?;  `;

//         const [rows] = await pool.execute(sql, data);
//         res.json(rows);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   });
// };

// const UpdateMailpassword = async (req, res) => {
//   const token = await extractToken(req);
//   jwt.verify(token, process.env.MY_SUPER_SECRET_KEY, async (err, authData) => {
//     if (err) {
//       console.log(err);
//       res.status(401).json({ err: "Unauthorized" });
//       return;
//     } else {
//       const email = authData.Email;
//       const tokenTemporaire = jwt.sign(
//         {
//           id: authData.UserId,
//           email: authData.Email,
//         },

//         process.env.MY_SUPER_SECRET_KEY,
//         { expiresIn: "1h" }
//       );
//       const data = [tokenTemporaire, email];
//       const sql = `UPDATE user SET Token = ? WHERE Email = ?;  `;

//       const [rows] = await pool.execute(sql, data);

//       if (rows.affectedRows === 1) {
//         const link = `http://127.0.0.1:5500/Auth/Change_Password/change_password.html?token=${tokenTemporaire}`;

//         const info = await transporter.sendMail({
//           from: `Twittasse@gmail.com`,
//           to: "lorenzopro38@gmail.com",
//           subject: `changer votre mot de passe`,
//           text: `suivre le mail suivant`,
//           html: `<b>Bonjour ${authData.pseudo}</b>
//     <p>voici le lien qui vous permettra de changer votre mot de passe : </p>
//     <a href="${link}" >cliquer ici</a>`,
//         });

//         res
//           .status(200)
//           .json({ msg: `Message send with the id ${info.messageId}` });
//       }
//     }
//   });
// };

// module.exports = {
//   updatePassword,
//   UpdateMailpassword,
// };
