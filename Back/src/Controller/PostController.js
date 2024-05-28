const { Post } = require("../Model/Post");
// const { ObjectId } = require("bson");
const client = require("../connexions/MongoDb");
const { extractToken } = require("../Utils/Token");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { ObjectId } = require("mongodb");

async function AddPost(req, res) {
  try {
    const token = await extractToken(req); // Vérification du token
    jwt.verify(
      token,
      process.env.MY_SUPER_SECRET_KEY,
      async (err, authData) => {
        if (err) {
          res.status(401).json({ error: "Unauthorized" });
          return;
        }

        if (!req.body.title || !req.body.image || !req.body.description) {
          res.status(400).send("Missing fields");
          return;
        }

        try {
          const newPost = {
            profilePicture: authData.picture,
            pseudo: authData.pseudo,
            title: req.body.title,
            image: req.body.image,
            description: req.body.description,
            authData: authData.id,
            createdAt: new Date(),
          };

          const result = await client
            .db("Twitasse")
            .collection("Posts")
            .insertOne(newPost);

          res.status(200).json(result);
        } catch (e) {
          console.log(e);
          res.status(500).json({ error: e.message });
        }
      }
    );
  } catch (e) {
    res.status(401).json({ error: e.message }); // Gère les erreurs de tokenCheck
  }
}

const getAllPost = async (request, response) => {
  try {
    let apiRequest = client.db("Twitasse").collection("Posts").find();
    let users = await apiRequest.toArray();
    if (users && users.length > 1) {
      response.status(200).json(users);
    } else {
      response.status(204).json({ msg: "No content" });
    }
  } catch (error) {
    // En cas d'erreur, envoi d'une réponse avec un code de statut 500 et l'erreur au format JSON
    response.status(500).json({ error });
  }
};

const getSpecificPost = async (request, response) => {
  try {
    const objectId = new ObjectId(request.params.id);
    let cursor = client
      .db("Twitasse")
      .collection("Posts")
      .find({ _id: objectId });
    let result = await cursor.toArray();
    if (result.length > 0) {
      response.status(200).json(result);
    } else {
      response.status(204).json({ msg: "Cet utilisateur n'existe pas" });
    }
  } catch (error) {
    console.log(error);
    response.status(501).json(error);
  }
};

const GetPublicationByUserId = async (request, response) => {
  const token = await extractToken(request);

  jwt.verify(token, process.env.MY_SUPER_SECRET_KEY, async (err, authData) => {
    if (err) {
      console.log(err);
      response.status(401).json({ err: "Unauthorized" });
      return;
    } else {
      console.log(authData.id);
      let publication = await client
        .db("Twitasse")
        .collection("Posts")
        .find({ authData: authData.id });

      let apiResponse = await publication.toArray();
      // console.log(apiResponse);
      response.status(200).json(apiResponse);
    }
  });
};

const deletePost = async (request, response) => {
  try {
    // Création d'une instance d'ObjectId à partir de l'ID de l'utilisateur fourni dans les paramètres de la requête
    let id = new ObjectId(request.params.id);
    // Suppression de l'utilisateur de la base de données
    let result = await client
      .db("Twitasse")
      .collection("Posts")
      .deleteOne({ _id: id });

    // Vérification si la suppression a été effectuée avec succès
    if (result.deletedCount === 1) {
      // Envoi d'une réponse avec un code de statut 200 et un message indiquant que la suppression a réussi
      response.status(200).json({ msg: "Suppression réussie" });
    } else {
      // Envoi d'une réponse avec un code de statut 404 et un message indiquant que l'utilisateur n'existe pas
      response.status(404).json({ msg: "Cet post n'existe pas" });
    }
  } catch (error) {
    // En cas d'erreur, affichage de l'erreur dans la console et envoi d'une réponse avec un code de statut 501 et l'erreur au format JSON
    console.log(error);
    response.status(501).json(error);
  }
};

async function UpdatePosts(req, res) {
  try {
    if (!req.body.title || !req.body.image || !req.body.description) {
      res.status(400).json({ err: "Missing Field" });
      return;
    }

    let PostID = new ObjectId(req.params.id);

    // Supprimer la vérification du token

    const post = {
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
    };

    const result = await client.db("Twitasse").collection("Posts").updateOne(
      { _id: PostID },
      {
        $set: post,
      }
    );

    console.log({ result });
    res.status(200).json({ msg: "ca marche" });
  } catch (err) {
    res.status(500).json({ err: "Error Serv" });
  }
}

module.exports = {
  AddPost,
  getAllPost,
  getSpecificPost,
  GetPublicationByUserId,
  extractToken,
  deletePost,
  UpdatePosts,
};
