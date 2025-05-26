const customCarousel = document.getElementById("custom-carousel");
const totalImages = 10;
const visibleImages = 3;
let scrollIndex = 0;

function customScrollLeft() {
  if (scrollIndex > 0) {
    scrollIndex--;
  } else {
    scrollIndex = totalImages - visibleImages;
  }
  updateCustomScroll();
}

function customScrollRight() {
  const maxIndex = totalImages - visibleImages;
  if (scrollIndex < maxIndex) {
    scrollIndex++;
  } else {
    scrollIndex = 0;
  }
  updateCustomScroll();
}

function updateCustomScroll() {
  const imageWidth = 300 + 30; // image + gap
  const offset = scrollIndex * imageWidth;
  customCarousel.style.transform = `translateX(-${offset}px)`;
}
