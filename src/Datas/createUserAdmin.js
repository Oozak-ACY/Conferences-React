const axios = require('axios');

// Vérifiez si le nombre d'arguments est correct
if (process.argv.length !== 4) {
  console.error('Usage: node createUser.js <prenom> <nom>');
  process.exit(1);
}

// Récupère les arguments
const [id, password] = process.argv.slice(2);

// Définissez l'URL de l'API
const url = 'http://localhost:4555/signupadmin';

// Créez la charge utile JSON
const data = {
  id: id,
  password: password
};

// Envoyer la requête POST à l'API
axios.post(url, data, {
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(response => {
    if (response.status === 200) {
      console.log('Utilisateur créé avec succès :', response.data);
    } else {
      console.error('Échec de la création de l\'utilisateur. Code de statut HTTP:', response.status);
      console.error('Réponse:', response.data);
    }
  })
  .catch(error => {
    if (error.response) {
      console.error('Échec de la création de l\'utilisateur. Code de statut HTTP:', error.response.status);
      console.error('Réponse:', error.response.data);
    } else {
      console.error('Erreur:', error.message);
    }
  });
