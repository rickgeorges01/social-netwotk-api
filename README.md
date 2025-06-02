# Social Network API

## 🌐 Description
API d’un réseau social développé en architecture microservices avec Node.js et MongoDB.

## 🚀 Lancement
1. Cloner le repo.
2. Installer les dépendances avec `npm install`.
3. Renommer le `.env.example` en `.env` afin de lancer les tests rapidement ( `MONGO_URI`, `JWT_SECRET`, et les routes des services).
4. Lancer le projet : `npm run dev`.

## 🗂 Importer la collection Postman
1. Ouvrir Postman.
2. Importer le fichier `social-network-api.postman_collection.json`.
3. Suivre les requêtes dans l’ordre:
    - Register
    - Login (copier le token JWT)
    - Créer un post
    - Récupérer les posts
    - Ajouter un like
    - Voir les likes
    - Supprimer le like
    - Vérifier le compteur de likes

## 📚 Routes principales
- `POST /auth/register`
- `POST /auth/login`
- `POST /posts` (auth)
- `GET /posts`
- `POST /likes` (auth)
- `GET /likes`
- `DELETE /likes` (auth)

## 🛡 Sécurité
- Authentification avec JWT.
- Données sécurisées dans MongoDB (passwords hashés).
