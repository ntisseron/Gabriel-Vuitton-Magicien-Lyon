const carousel = document.getElementById("carousel");
const totalImages = 10;
const visibleImages = 3;
let scrollIndex = 0;

function scrollLeft() {
    if (scrollIndex > 0) {
        scrollIndex--;
    } else {
        scrollIndex = totalImages - visibleImages;
    }
    updateScroll();
}

function scrollRight() {
    const maxIndex = totalImages - visibleImages;
    if (scrollIndex < maxIndex) {
        scrollIndex++;
    } else {
        scrollIndex = 0;
    }
    updateScroll();
}

function updateScroll() {
    const imageWidth = 300 + 30; // largeur + espacement
    const offset = scrollIndex * imageWidth;
    carousel.style.transform = `translateX(-${offset}px)`;
}

const track = document.getElementById("reviewsCarouselTrack");
const cardWidth = 320;

setInterval(() => {
    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(-${cardWidth}px)`;

    setTimeout(() => {
        track.style.transition = "none";
        const first = track.firstElementChild;
        track.appendChild(first);
        track.style.transform = "translateX(0)";
    }, 500);
}, 3000);

function toggleForm() {
  const form = document.getElementById('formContainer');
  const btn = document.querySelector('.btn-toggle-form');
  if (form.style.display === 'none' || form.style.display === '') {
    form.style.display = 'block';
    btn.textContent = 'Cacher le formulaire';
  } else {
    form.style.display = 'none';
    btn.textContent = 'Contacter Moi !';
  }
}

document.getElementById('reviewForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const reviewText = document.getElementById('reviewText').value;
  const stars = document.querySelectorAll('.star.filled').length;

  if (username && reviewText) {
    addReview(username, reviewText, stars);
    document.getElementById('reviewForm').reset();
    resetStars();
  }
});

function resetStars() {
  document.querySelectorAll('.star').forEach(star => {
    star.classList.remove('filled');
  });
}

document.querySelectorAll('.star').forEach(star => {
  star.addEventListener('click', function() {
    const value = this.getAttribute('data-value');
    document.querySelectorAll('.star').forEach((s, index) => {
      if (index < value) {
        s.classList.add('filled');
      } else {
        s.classList.remove('filled');
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Charger les avis sauvegardés au chargement de la page
  loadReviews();

  document.getElementById('reviewForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const reviewText = document.getElementById('reviewText').value;
    const stars = document.querySelectorAll('.star.filled').length;

    if (username && reviewText) {
      addReview(username, reviewText, stars);
      saveReview(username, reviewText, stars); // Sauvegarder l'avis
      document.getElementById('reviewForm').reset();
      resetStars();
    }
  });
});

function resetStars() {
  document.querySelectorAll('.star').forEach(star => {
    star.classList.remove('filled');
  });
}

document.querySelectorAll('.star').forEach(star => {
  star.addEventListener('click', function() {
    const value = this.getAttribute('data-value');
    document.querySelectorAll('.star').forEach((s, index) => {
      if (index < value) {
        s.classList.add('filled');
      } else {
        s.classList.remove('filled');
      }
    });
  });
});

function addReview(username, reviewText, stars) {
  const reviewCard = document.createElement('div');
  reviewCard.className = 'review-card';

  const starIcons = '★'.repeat(stars) + '☆'.repeat(5 - stars);

  reviewCard.innerHTML = `
    <div class="review-card-header">
      <div class="review-avatar"></div>
      <div class="review-username">${username}</div>
    </div>
    <div class="review-stars">${starIcons}</div>
    <div class="review-text">${reviewText}</div>
  `;

  document.querySelector('.reviews-carousel-track').appendChild(reviewCard);
}

function saveReview(username, reviewText, stars) {
  // Récupérer les avis existants ou initialiser un tableau vide
  let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

  // Ajouter le nouvel avis
  reviews.push({ username, reviewText, stars });

  // Sauvegarder les avis dans le localStorage
  localStorage.setItem('reviews', JSON.stringify(reviews));
}

function loadReviews() {
  // Récupérer les avis sauvegardés
  let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

  // Ajouter chaque avis au carrousel
  reviews.forEach(review => {
    addReview(review.username, review.reviewText, review.stars);
  });
}
