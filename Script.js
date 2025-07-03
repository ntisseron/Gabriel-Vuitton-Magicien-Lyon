function getVisibleCount() {
  if (window.innerWidth <= 600)   return 1; // mobile
  if (window.innerWidth <= 1024)  return 2; // tablette
  return 3;                                   // desktop
}

const totalImages = 10;
const visibleImages = 3;
let scrollIndex = 0;

function scrollLeft() {
  if (scrollIndex > 0) {
    scrollIndex--;
  } else {
    scrollIndex = totalImages - 1;
  }
  updateScroll();
}

function scrollRight() {
  if (scrollIndex < totalImages - 1) {
    scrollIndex++;
  } else {
    scrollIndex = 0;
  }
  updateScroll();
}

function updateScroll() {
  const carouselItem = document.querySelector('.carousel-item2');
  const imageWidth = carouselItem.offsetWidth + 30; // Utilise la largeur réelle de l'élément
  const offset = scrollIndex * imageWidth;
  document.querySelector('.carousel-inner2').style.transform = `translateX(-${offset}px)`;
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

function toggleForm2() {
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

document.getElementById('toggleAvisBtn').addEventListener('click', function() {
  const form = document.getElementById('avisForm');
  if (form.style.display === 'none' || form.style.display === '') {
    form.style.display = 'flex';
    this.textContent = 'Cacher le formulaire';
  } else {
    form.style.display = 'none';
    this.textContent = 'Partager son expérience';
  }
});

// Flip progressif des cartes selon le scroll (effet Apple)
document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.flip-card');
  let hasFlipped = false;

  function flipCardsSequentially() {
    if (hasFlipped) return;
    hasFlipped = true;
    cards.forEach(card => card.classList.remove('flipped'));
    cards.forEach((card, idx) => {
      setTimeout(() => {
        card.classList.add('flipped');
      }, 500 * idx);
    });
  }

  function isCardsInView() {
    if (cards.length === 0) return false;
    const rect = cards[0].getBoundingClientRect();
    return (
      rect.top < window.innerHeight &&
      rect.bottom > 0
    );
  }

  function onScroll() {
    if (isCardsInView()) {
      flipCardsSequentially();
      window.removeEventListener('scroll', onScroll);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  // Vérifie au chargement si les cartes sont déjà visibles
  onScroll();
});

document.addEventListener('DOMContentLoaded', function () {
  const carouselInner = document.querySelector('.carousel-inner2');
  let items = document.querySelectorAll('.carousel-item2');
  let currentIndex = 1;

  /* === 1. Clonage des extrémités pour le défilement infini === */
  const firstClone = items[0].cloneNode(true);
  const lastClone  = items[items.length - 1].cloneNode(true);
  firstClone.id = 'first-clone2';
  lastClone.id  = 'last-clone2';
  carouselInner.appendChild(firstClone);
  carouselInner.insertBefore(lastClone, items[0]);

  // Re‑sélectionne après clonage
  items = document.querySelectorAll('.carousel-item2');

  /* === 2. Variables dépendant de la largeur d’écran === */
  let visibleCount   = getVisibleCount();   // 1, 2 ou 3
  let itemWidthPct   = 100 / visibleCount; // 100, 50, 33.33…

  // Applique la largeur (flex‑basis) à chaque slide
  items.forEach(it => it.style.flex = `0 0 ${itemWidthPct}%`);

  // Positionne le carrousel pour afficher la 1ʳᵉ vraie slide au centre
  carouselInner.style.transform = `translateX(-${itemWidthPct}%)`;

  /* === 3. Fonction de mise à jour === */
  function updateCarousel(animate = true) {
    // Si on a redimensionné l’écran, recalcule
    visibleCount = getVisibleCount();
    itemWidthPct = 100 / visibleCount;
    items.forEach(it => it.style.flex = `0 0 ${itemWidthPct}%`);

    carouselInner.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
    carouselInner.style.transform  = `translateX(-${currentIndex * itemWidthPct}%)`;

    // Gestion de la classe active2 (toujours l’élément au milieu)
    items.forEach(it => it.classList.remove('active2'));
    const middle = currentIndex + 1; // à cause du clone en tête
    if (items[middle]) items[middle].classList.add('active2');
  }

  /* === 4. Navigation === */
  window.nextSlide2 = function () {
    if (currentIndex >= items.length - 1) return;
    currentIndex++;
    updateCarousel();
    carouselInner.addEventListener('transitionend', handleLoop);
  };

  window.prevSlide2 = function () {
    if (currentIndex <= 0) return;
    currentIndex--;
    updateCarousel();
    carouselInner.addEventListener('transitionend', handleLoop);
  };

  /* === 5. Bouclage infini === */
  function handleLoop() {
    if (items[currentIndex].id === 'first-clone2') {
      currentIndex = 1;                 // saute au vrai 1ᵉʳ
      updateCarousel(false);
    }
    if (items[currentIndex].id === 'last-clone2') {
      currentIndex = items.length - 2;  // saute au vrai dernier
      updateCarousel(false);
    }
    carouselInner.removeEventListener('transitionend', handleLoop);
  }

  /* === 6. Re‑calcul sur redimensionnement === */
  window.addEventListener('resize', () => updateCarousel(false));

  /* === 7. Initialisation === */
  updateCarousel(false);
});

