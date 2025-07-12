document.addEventListener("DOMContentLoaded", () => {
  /* =============================
     Placeholder Images (Gallery Data)
  ============================= */
  const placeholderImages = [
    {
      full: "https://picsum.photos/200",
      thumb: "https://picsum.photos/200",
      title: "Placeholder Image 1",
      description: "This is a placeholder description.",
      alt: "Placeholder Image 1",
      category: "nature",
      date: "2025-07-01",
    },
    {
      full: "https://picsum.photos/100",
      thumb: "https://picsum.photos/100",
      title: "Placeholder Image 2",
      description: "Another placeholder description.",
      alt: "Placeholder Image 2",
      category: "urban",
      date: "2025-06-15",
    },
    {
      full: "https://picsum.photos/300",
      thumb: "https://picsum.photos/300",
      title: "Placeholder Image 3",
      description: "Sample placeholder text.",
      alt: "Placeholder Image 3",
      category: "portraits",
      date: "2025-06-01",
    },
  ];

  /* =============================
     Initialize Lightbox
  ============================= */
  const lightbox = new SimpleLightbox(".gallery__list a", {
    overlayOpacity: 0.9,
  });

  /* =============================
     Gallery Rendering Function
  ============================= */
  function renderGallery(images, filter = "all") {
    const sortBy = document.getElementById("sort-select").value;

    const sorted = [...images].sort((a, b) => {
      if (sortBy === "date-asc") return new Date(a.date) - new Date(b.date);
      if (sortBy === "date-desc") return new Date(b.date) - new Date(a.date);
      if (sortBy === "title-asc") return a.title.localeCompare(b.title);
      return 0;
    });

    const filteredImages =
      filter === "all"
        ? sorted
        : sorted.filter((img) => img.category === filter);

    const galleryList = document.getElementById("gallery-list");
    galleryList.innerHTML = "";

    filteredImages.forEach((img) => {
      const li = document.createElement("li");
      li.className = "gallery__item";
      li.setAttribute("data-aos", "fade-up");
      li.innerHTML = `
        <div class="gallery__card" data-category="${img.category}">
          <a href="${img.full}">
            <img class="gallery__image" src="${img.thumb}" alt="${img.alt}" loading="lazy">
            <div class="gallery__overlay">
              <h3 class="gallery__title">${img.title}</h3>
              <p class="gallery__description">${img.description}</p>
            </div>
          </a>
        </div>`;
      galleryList.appendChild(li);
    });

    lightbox.refresh();
    AOS.refresh();
  }

  // Initial render
  renderGallery(placeholderImages);

  // Mobile Nav Toggle
  const navToggle = document.querySelector(".nav__toggle");
  const navList = document.querySelector(".nav__list");

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navList.classList.toggle("active");
  });

  /* =============================
     Filter Buttons
  ============================= */
  document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-button")
        .forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");
      renderGallery(placeholderImages, filter);
    });
  });

  /* =============================
     Sort Dropdown
  ============================= */
  document.getElementById("sort-select").addEventListener("change", () => {
    const activeFilter =
      document
        .querySelector(".filter-button.active")
        ?.getAttribute("data-filter") || "all";
    renderGallery(placeholderImages, activeFilter);
  });

  /* =============================
     Smooth Scrolling Links
  ============================= */
  document.querySelectorAll(".nav__link, .hero__cta").forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetSelector = anchor.getAttribute("href");
      if (targetSelector && targetSelector.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(targetSelector);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  /* =============================
     Contact Form Handling
  ============================= */
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", handleSubmit);
  }
});

/* =============================
   Form Submission Logic
============================= */
function handleSubmit(event) {
  event.preventDefault();
  alert("Thank you! Your message has been sent.");
  event.target.reset();
}
