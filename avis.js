// Configuration de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDUQRpzjbC5uUIvkuQV740shG_4jA1rR0k",
  authDomain: "gestionavisv1.firebaseapp.com",
  projectId: "gestionavisv1",
  storageBucket: "gestionavisv1.appspot.com",
  messagingSenderId: "201133850676",
  appId: "1:201133850676:web:ee82f8501f1f1d03c64a61",
  measurementId: "G-02TE7LQQ71"
};

// Initialisation de Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}

const db = firebase.firestore();

// Gestion des étoiles pour la notation
document.querySelectorAll('.star').forEach(star => {
  star.addEventListener('click', () => {
    const value = star.getAttribute('data-value');
    document.getElementById('note').value = value;

    document.querySelectorAll('.star').forEach(s => {
      s.classList.remove('active');
    });

    for (let i = 0; i < value; i++) {
      document.querySelectorAll('.star')[i].classList.add('active');
    }
  });
});

// Fonction pour générer une couleur de fond aléatoire avec opacité
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, 0.5)`; // Opacité réduite à 0.5
}

// Fonction pour obtenir un symbole de carte aléatoire
function getRandomCardSymbol() {
  const cardSymbols = ['♥', '♦', '♠', '♣']; // Cœur, Carreau, Pique, Trèfle
  return cardSymbols[Math.floor(Math.random() * cardSymbols.length)];
}

// Gestion de la soumission du formulaire avec honeypot et limitation de soumission
document.getElementById("avisForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nom = document.getElementById("nom").value.trim();
  const message = document.getElementById("message").value.trim();
  const note = document.getElementById("note").value;
  const honeypot = document.getElementById("honeypot").value;

  // Vérification du honeypot
  if (honeypot) {
    alert("La soumission du formulaire semble être automatisée.");
    return;
  }

  // Limitation de soumission
  const now = new Date();
  const userSubmissions = JSON.parse(localStorage.getItem('userSubmissions') || '[]');
  const lastSubmission = userSubmissions.length > 0 ? new Date(userSubmissions[userSubmissions.length - 1]) : null;

  if (lastSubmission && (now - lastSubmission) < 3600000) { // Limite à une soumission par heure
    alert("Vous avez déjà soumis un avis récemment. Veuillez patienter avant de soumettre un nouvel avis.");
    return;
  }

  if (nom && message && note) {
    try {
      await db.collection("avis").add({
        nom,
        message,
        note: parseInt(note, 10),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

      alert("Avis envoyé avec succès !");
      document.getElementById("avisForm").reset();
      document.querySelectorAll('.star').forEach(s => s.classList.remove('active'));

      // Mettre à jour le localStorage avec la nouvelle soumission
      userSubmissions.push(now.toISOString());
      localStorage.setItem('userSubmissions', JSON.stringify(userSubmissions));

      chargerAvis();
    } catch (err) {
      console.error("Erreur Firestore :", err);
      alert("Erreur lors de l'envoi de l'avis.");
    }
  } else {
    alert("Veuillez remplir tous les champs et donner une note.");
  }
});

// Charger les avis depuis Firestore
async function chargerAvis() {
  const container = document.getElementById("reviewsCarouselTrack");
  container.innerHTML = "";
  const snapshot = await db.collection("avis").orderBy("timestamp", "desc").get();

  snapshot.forEach((doc) => {
    const data = doc.data();
    const reviewCard = document.createElement("div");
    reviewCard.className = "review-card";

    // Générer une couleur de fond aléatoire avec opacité
    const backgroundColor = getRandomColor();
    // Obtenir un symbole de carte aléatoire
    const cardSymbol = getRandomCardSymbol();

    reviewCard.innerHTML = `
      <div class="review-card-header">
        <div class="review-avatar" style="background-color: ${backgroundColor}">${cardSymbol}</div>
        <div class="review-username">${data.nom}</div>
      </div>
      <div class="review-stars">${'★'.repeat(data.note)}${'☆'.repeat(5 - data.note)}</div>
      <div class="review-text">${data.message}</div>
    `;

    container.appendChild(reviewCard);
  });
}

// Charger les avis au démarrage
window.addEventListener("DOMContentLoaded", chargerAvis);
