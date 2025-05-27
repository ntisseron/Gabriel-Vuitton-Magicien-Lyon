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
