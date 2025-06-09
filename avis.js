const firebaseConfig = {
    apiKey: "AIzaSyDUQRpzjbC5uUIvkuQV740shG_4jA1rR0k",
    authDomain: "gestionavisv1.firebaseapp.com",
    projectId: "gestionavisv1",
    storageBucket: "gestionavisv1.firebasestorage.app",
    messagingSenderId: "201133850676",
    appId: "1:201133850676:web:ee82f8501f1f1d03c64a61",
    measurementId: "G-02TE7LQQ71"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
  }

  const db = firebase.firestore();

  document.getElementById("avisForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nom = document.getElementById("nom").value.trim();
    const message = document.getElementById("message").value.trim();

    if (nom && message) {
      try {
        await db.collection("avis").add({
          nom,
          message,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert("Avis envoyé !");
        document.getElementById("avisForm").reset();
        chargerAvis();
      } catch (err) {
        console.error("Erreur Firestore :", err);
        alert("Erreur lors de l'envoi de l'avis.");
      }
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  });

  async function chargerAvis() {
    const container = document.getElementById("avisContainer");
    container.innerHTML = "";
    const snapshot = await db.collection("avis").orderBy("timestamp", "desc").get();
    snapshot.forEach((doc) => {
      const data = doc.data();
      const div = document.createElement("div");
      div.innerHTML = `<strong>${data.nom}</strong> : ${data.message}`;
      container.appendChild(div);
    });
  }

  window.addEventListener("DOMContentLoaded", chargerAvis);