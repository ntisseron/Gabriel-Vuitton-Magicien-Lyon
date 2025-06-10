const firebaseConfig = {
  apiKey: "AIzaSyDUQRpzjbC5uUIvkuQV740shG_4jA1rR0k",
  authDomain: "gestionavisv1.firebaseapp.com",
  projectId: "gestionavisv1",
  storageBucket: "gestionavisv1.appspot.com",
  messagingSenderId: "201133850676",
  appId: "1:201133850676:web:ee82f8501f1f1d03c64a61",
  measurementId: "G-02TE7LQQ71"
};

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

document.getElementById("avisForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nom = document.getElementById("nom").value.trim();
  const message = document.getElementById("message").value.trim();
  const note = document.getElementById("note").value;

  if (nom && message && note) {
    try {
      await db.collection("avis").add({
        nom,
        message,
        note: parseInt(note, 10),
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      alert("Avis envoyé !");
      document.getElementById("avisForm").reset();
      document.querySelectorAll('.star').forEach(s => s.classList.remove('active'));
      chargerAvis();
    } catch (err) {
      console.error("Erreur Firestore :", err);
      alert("Erreur lors de l'envoi de l'avis.");
    }
  } else {
    alert("Veuillez remplir tous les champs et donner une note.");
  }
});

async function chargerAvis() {
  const container = document.getElementById("reviewsCarouselTrack");
  container.innerHTML = ""; // Vider le contenu actuel

  const snapshot = await db.collection("avis").orderBy("timestamp", "desc").get();

  snapshot.forEach((doc) => {
    const data = doc.data();
    const reviewCard = document.createElement("div");
    reviewCard.className = "review-card";

    // Créer le contenu de la carte d'avis
    reviewCard.innerHTML = `
      <div class="review-card-header">
        <div class="review-avatar"></div>
        <div class="review-username">${data.nom}</div>
      </div>
      <div class="review-stars">${'★'.repeat(data.note)}${'☆'.repeat(5 - data.note)}</div>
      <div class="review-text">${data.message}</div>
    `;

    container.appendChild(reviewCard);
  });
}

window.addEventListener("DOMContentLoaded", chargerAvis);
