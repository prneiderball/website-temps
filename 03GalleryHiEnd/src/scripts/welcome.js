document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS for scroll animations
  AOS.init({
    duration: 1200,
    once: true,
    easing: "ease-out-cubic"
  });

  // Rotate teaser images with new random placeholders each load
  const teaserImages = document.querySelectorAll('.teaser-gallery__row img');
  teaserImages.forEach((img, i) => {
    const random = Math.floor(Math.random() * 1000);
    img.src = `https://picsum.photos/400/300?random=${random + i}`;
  });
});
