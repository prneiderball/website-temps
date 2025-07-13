import { renderGallery } from './gallery.js';
import { placeholderImages } from './constants.js';
import { getActiveFilter, setupToggle, setupSmoothScroll } from './ui.js';
import { setupContactForm } from './contact.js';

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-gallery");
  const galleryList = document.getElementById("gallery-list");
  const sortSelect = document.getElementById("sort-select");
  const navToggle = document.querySelector(".nav__toggle");
  const navList = document.querySelector(".nav__list");

  let isExpanded = false;

  const lightbox = new SimpleLightbox(".gallery__list a", {
    overlayOpacity: 0.9,
  });

  const render = () => {
    renderGallery({
      images: placeholderImages,
      filter: getActiveFilter(),
      sort: sortSelect.value,
      expanded: isExpanded,
      target: galleryList,
      toggleBtn,
      lightbox,
    });
  };

  render();

  toggleBtn.addEventListener("click", () => {
    isExpanded = !isExpanded;
    render();
  });

  document.querySelectorAll(".filter-button").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter-button").forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      isExpanded = false;
      render();
    });
  });

  sortSelect.addEventListener("change", render);

  setupToggle(navToggle, navList);
  setupSmoothScroll();
  setupContactForm();
});
