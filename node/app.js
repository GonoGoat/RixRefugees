// Utilisation dotenv (fichier .env)
require('dotenv').config()

// Définition express (serveur http)
const express = require('express');
const app = express();

// Servir les fichiers statiques
app.use(express.static('../react-rixrefugees/build'));

// API 


// Accès à React
const path = require('path');
app.get('*', (req, res) => {
    res.sendFile(path.resolve('..', 'react-rixrefugees', 'build', 'index.html'));
});

// Déploiement
const PORT = process.env.PORT;
app.listen(PORT);