# Twitasse

Twitasse est un réseau social moderne où les utilisateurs peuvent partager des messages courts, suivre d'autres utilisateurs, et interagir avec les publications. Le projet est construit avec les dernières technologies web pour offrir une expérience utilisateur fluide et engageante.

## Fonctionnalités

- **Publication de messages** : Les utilisateurs peuvent publier des messages courts appelés "twits".
- **Fil d'actualité** : Suivez les utilisateurs et voyez leurs dernières publications sur votre fil d'actualité.
- **Interactions** : Likez, commentez et partagez les twits des autres utilisateurs.
- **Profil utilisateur** : Personnalisez votre profil avec une photo, une bio et vos informations de contact.
- **Notifications** : Recevez des notifications pour les nouveaux followers, likes, commentaires, et partages.

## Technologies utilisées

- **Frontend** : React.js, Redux
- **Backend** : Node.js, Express.js
- **Base de données** : MongoDB
- **Authentification** : JSON Web Tokens (JWT)
- **Styling** : Tailwind CSS

## Installation

1. Clonez le dépôt :

    ```bash
    git clone https://github.com/votre-utilisateur/twitasse.git
    ```

2. Accédez au dossier du projet :

    ```bash
    cd twitasse
    ```

3. Installez les dépendances pour le backend et le frontend :

    ```bash
    cd backend
    npm install

    cd ../frontend
    npm install
    ```

4. Configurez les variables d'environnement :

    Créez un fichier `.env` dans le dossier `backend` et ajoutez les variables suivantes :

    ```plaintext
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

5. Démarrez le serveur backend :

    ```bash
    cd backend
    npm start
    ```

6. Démarrez le serveur frontend :

    ```bash
    cd ../frontend
    npm start
    ```

7. Accédez à l'application :

    Ouvrez votre navigateur et accédez à `http://localhost:3000`.
