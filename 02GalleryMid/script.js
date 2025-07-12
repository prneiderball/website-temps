document.addEventListener("DOMContentLoaded", () => {
  const placeholderImages = [
    {
      full: "https://picsum.photos/id/1011/600",
      thumb: "https://picsum.photos/id/1011/300",
      title: "Placeholder Image 1",
      description: "This is a placeholder description.",
      alt: "Placeholder Image 1",
      category: "nature",
      date: "2025-07-01",
    },
    {
      full: "https://picsum.photos/id/1025/600",
      thumb: "https://picsum.photos/id/1025/300",
      title: "Placeholder Image 2",
      description: "Another placeholder description.",
      alt: "Placeholder Image 2",
      category: "urban",
      date: "2025-06-15",
    },
    {
      full: "https://picsum.photos/id/1003/600",
      thumb: "https://picsum.photos/id/1003/300",
      title: "Placeholder Image 3",
      description: "Sample placeholder text.",
      alt: "Placeholder Image 3",
      category: "portraits",
      date: "2025-06-01",
    },
    {
      full: "https://picsum.photos/id/1041/600",
      thumb: "https://picsum.photos/id/1041/300",
      title: "Placeholder Image 4",
      description: "Another sample.",
      alt: "Placeholder Image 4",
      category: "nature",
      date: "2025-05-20",
    },
    {
      full: "https://picsum.photos/id/1031/600",
      thumb: "https://picsum.photos/id/1031/300",
      title: "Placeholder Image 5",
      description: "Urban landscape.",
      alt: "Placeholder Image 5",
      category: "urban",
      date: "2025-05-10",
    },
    {
      full: "https://picsum.photos/id/1051/600",
      thumb: "https://picsum.photos/id/1051/300",
      title: "Placeholder Image 6",
      description: "Portrait with dramatic lighting.",
      alt: "Placeholder Image 6",
      category: "portraits",
      date: "2025-05-05",
    },
    {
      full: "https://picsum.photos/id/1061/600",
      thumb: "https://picsum.photos/id/1061/300",
      title: "Placeholder Image 7",
      description: "Sunset in the city.",
      alt: "Placeholder Image 7",
      category: "urban",
      date: "2025-04-25",
    },
  ];

  const toggleButton = document.getElementById("toggle-gallery");
  const galleryList = document.getElementById("gallery-list");
  let isExpanded = false;
  const initialVisibleCount = 6;

  const lightbox = new SimpleLightbox(".gallery__list a", {
    overlayOpacity: 0.9,
  });

  function renderGallery(images, filter = "all", expanded = false) {
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

    const visibleImages = expanded
      ? filteredImages
      : filteredImages.slice(0, initialVisibleCount);

    galleryList.innerHTML = "";

    visibleImages.forEach((img) => {
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
        </div>
      `;
      galleryList.appendChild(li);
    });

    if (filteredImages.length <= initialVisibleCount && !expanded) {
      toggleButton.style.display = "none";
    } else {
      toggleButton.style.display = "inline-block";
      toggleButton.textContent = expanded ? "Show Less" : "Show More";
    }

    lightbox.refresh();
    AOS.refresh();
  }

  // Initial render
  renderGallery(placeholderImages);

  // Toggle button
  toggleButton.addEventListener("click", () => {
    isExpanded = !isExpanded;
    const activeFilter =
      document
        .querySelector(".filter-button.active")
        ?.getAttribute("data-filter") || "all";
    renderGallery(placeholderImages, activeFilter, isExpanded);
  });

  // Filter buttons
  document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-button")
        .forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");
      isExpanded = false;
      renderGallery(placeholderImages, filter, isExpanded);
    });
  });

  // Sort dropdown
  document.getElementById("sort-select").addEventListener("change", () => {
    const activeFilter =
      document
        .querySelector(".filter-button.active")
        ?.getAttribute("data-filter") || "all";
    renderGallery(placeholderImages, activeFilter, isExpanded);
  });

  // Mobile Nav Toggle
  const navToggle = document.querySelector(".nav__toggle");
  const navList = document.querySelector(".nav__list");

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navList.classList.toggle("active");
  });

  // Smooth scrolling
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

  // Contact form
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you! Your message has been sent.");
      e.target.reset();
    });
  }
});
