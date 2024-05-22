const express = require("express");
const { connect } = require("./connexions/MongoDb");
const user = require("./Controller/routes/user");
const publi = require("./Controller/routes/post");
const app = express();
let cors = require("cors");
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "../uploads"));

app.use(cors());
const PORT = 3000;

// Appel de la fonction connect avec l'URL de la base de données MongoDB et une fonction de callback
connect("mongodb://127.0.0.1:27017/", (error) => {
  // Vérification s'il y a une erreur lors de la connexion
  if (error) {
    // Affichage d'un message d'erreur en cas d'échec de connexion
    console.log("Failed to connect");
    // Arrêt du processus avec un code d'erreur (-1)
    process.exit(-1);
  } else {
    // Affichage d'un message de succès en cas de connexion réussie
    console.log("successfully connected");
    // Démarrage de l'application sur le port 3000
  }
});

app.use(express.json());

app.use("/api", user);
app.use("/api", publi);

app.listen(PORT);
console.log("Le serveur marche bien sur le port", PORT);
