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

    // Clone first and last
    const firstClone = items[0].cloneNode(true);
    const lastClone = items[items.length - 1].cloneNode(true);
    firstClone.id = "first-clone2";
    lastClone.id = "last-clone2";

    carouselInner.appendChild(firstClone);
    carouselInner.insertBefore(lastClone, items[0]);

    // Refresh list
    items = document.querySelectorAll('.carousel-item2');
    const totalItems = items.length;
    const itemWidthPercent = 100 / 3;

    carouselInner.style.transform = `translateX(-${itemWidthPercent}%)`;

    function updateCarousel(transition = true) {
        carouselInner.style.transition = transition ? 'transform 0.5s ease-in-out' : 'none';
        const offset = -currentIndex * itemWidthPercent;
        carouselInner.style.transform = `translateX(${offset}%)`;

        items.forEach(item => item.classList.remove('active2'));
        const middleIndex = currentIndex + 1;
        if (items[middleIndex]) {
            items[middleIndex].classList.add('active2');
        }
    }

    window.nextSlide2 = function () {
        if (currentIndex >= totalItems - 1) return;
        currentIndex++;
        updateCarousel();
        carouselInner.addEventListener('transitionend', handleTransitionEnd);
    }

    window.prevSlide2 = function () {
        if (currentIndex <= 0) return;
        currentIndex--;
        updateCarousel();
        carouselInner.addEventListener('transitionend', handleTransitionEnd);
    }

    function handleTransitionEnd() {
        if (items[currentIndex].id === 'first-clone2') {
            currentIndex = 1;
            updateCarousel(false);
        }
        if (items[currentIndex].id === 'last-clone2') {
            currentIndex = totalItems - 2;
            updateCarousel(false);
        }
        carouselInner.removeEventListener('transitionend', handleTransitionEnd);
    }

    updateCarousel();
});
