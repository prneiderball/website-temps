// Carousel buttons
const prev = document.querySelector(".carousel-prev");
const next = document.querySelector(".carousel-next");
const carousel = document.querySelector(".menu-grid");

prev?.addEventListener("click", () => {
  carousel.scrollBy({ left: -320, behavior: "smooth" });
});

next?.addEventListener("click", () => {
  carousel.scrollBy({ left: 320, behavior: "smooth" });
});

// Form validation
const form = document.querySelector(".reservation-form");
form?.addEventListener("submit", (e) => {
  let isValid = true;
  const fields = form.querySelectorAll("input[required]");
  fields.forEach((field) => {
    const error = field.nextElementSibling;
    if (!field.value.trim()) {
      field.classList.add("error");
      error.style.display = "block";
      isValid = false;
    } else {
      field.classList.remove("error");
      error.style.display = "none";
    }
  });

  if (!isValid) e.preventDefault();
});

// Mobile nav toggle (optional enhancement)
const toggleBtn = document.querySelector(".nav-toggle");
const nav = document.querySelector("nav ul");

toggleBtn?.addEventListener("click", () => {
  nav.classList.toggle("open");
});
