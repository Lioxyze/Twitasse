// Dans le dossier Services, nous allons créer un fichier Connexion.js

//qui contiendra le code suivant :

// Importation de MongoClient et Db depuis le module "mongodb", venant de
// l'installation via npm i mongodb
const { MongoClient, Db } = require("mongodb");

// Déclaration d'une variable client initialisée à null, et donc non utilisable
// en dehors de la fonction
var client = null;

// Définition de la fonction connect prenant en paramètres une URL et un callback
function connect(url, callback) {
  // Vérification si client est null
  if (client === null) {
    // Création d'une nouvelle instance de MongoClient avec l'URL fournie
    client = new MongoClient(url);
    // Connexion au serveur MongoDB
    client.connect((error) => {
      // Vérification d'erreur lors de la connexion
      if (error) {
        // Réinitialisation de client à null en cas d'erreur
        client = null;
        // Appel du callback avec l'erreur
        callback(error);
      } else {
        // Appel du callback sans erreur
        callback();
      }
    });
  } else {
    // Si client n'est pas null, appel du callback sans effectuer de connexion
    callback();
  }
}

// Définition de la fonction db retournant une nouvelle instance de Db en utilisant le client existant
function db() {
  return new Db(client, "Twitasse");
}

// Définition de la fonction closeConnect pour fermer la connexion avec MongoDB
function closeConnect() {
  // Vérification si client existe
  if (client) {
    // Fermeture de la connexion avec MongoDB
    client.close();
    // Réinitialisation de client à null
    client = null;
  }
}

// Exportation des fonctions connect, db et closeConnect pour les rendre accessibles depuis d'autres modules
module.exports = { connect, db, closeConnect };
