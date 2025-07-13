/* ===== WINDOW LOAD: Preloader Animation ===== */
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader");
  const progressBar = document.querySelector(".preloader__progress-bar");

  setTimeout(() => {
    progressBar.style.width = "100%";
  }, 100);

  setTimeout(() => {
    preloader.classList.add("preloader--hidden");
    document.body.style.overflowY = "auto";
  }, 3000);
});

/* ===== CUSTOM CURSOR: Always run as body is assumed loaded ===== */
const cursor = document.createElement("div");
cursor.classList.add("cursor");
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

document.querySelectorAll("a, button, .teaser-gallery__item").forEach((el) => {
  el.addEventListener("mouseenter", () => cursor.classList.add("cursor--hover"));
  el.addEventListener("mouseleave", () => cursor.classList.remove("cursor--hover"));
});

/* ===== PARTICLE EFFECTS (Lazy Load on Viewport) ===== */
const particlesContainer = document.getElementById("particles-js");

if (particlesContainer) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          particlesJS("particles-js", {
            particles: {
              number: { value: 60 },
              shape: { type: "circle" },
              size: { value: 3 },
              opacity: { value: 0.7 },
              move: { enable: true, speed: 1 },
              line_linked: { enable: false },
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
              },
              modes: {
                repulse: { distance: 100 },
                push: { particles_nb: 4 },
              },
            },
            retina_detect: true,
          });
          obs.disconnect(); // Only run once
        }
      });
    },
    { threshold: 0.1 }
  );
  observer.observe(particlesContainer);
}

/* ===== THEME TOGGLE ===== */
const themeToggle = document.querySelector(".theme-toggle");
const icon = themeToggle.querySelector("i");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("theme-platinum");
  icon.classList.toggle("fa-moon");
  icon.classList.toggle("fa-sun");
});

/* ===== MOBILE NAV TOGGLE ===== */
const navToggle = document.querySelector(".nav__toggle");
const nav = document.querySelector(".nav");

navToggle.addEventListener("click", () => {
  nav.classList.toggle("nav--open");
});

/* ===== DOMContentLoaded: Grouped Initializations ===== */
document.addEventListener("DOMContentLoaded", () => {
  /* --- Swiper Gallery Init --- */
  if (typeof Swiper !== "undefined") {
    const teaserSwiper = new Swiper(".teaser-swiper", {
      loop: true,
      centeredSlides: true,
      grabCursor: true,
      slidesPerView: 1,
      spaceBetween: 30,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  } else {
    console.error("Swiper is not loaded.");
  }

  /* --- GSAP Hero Animation --- */
  gsap.to(".hero__title span", {
    y: 0,
    opacity: 1,
    duration: 1.2,
    stagger: 0.15,
    ease: "power3.out",
  });

  gsap.to(".hero__subtitle", {
    opacity: 1,
    delay: 1,
    duration: 1.5,
    ease: "power2.out",
  });

  /* --- Testimonials Slider --- */
  const slider = document.getElementById("testimonials-slider");
  const prevBtn = document.querySelector(".testimonials__button--prev");
  const nextBtn = document.querySelector(".testimonials__button--next");

  const testimonials = [
    {
      quote: "Absolutely stunning shots. You truly captured the essence of the moment.",
      author: "– Emma T.",
    },
    {
      quote: "Your work is beyond professional – it’s storytelling through light.",
      author: "– Liam J.",
    },
    {
      quote: "Hands down the best experience I’ve had with a photographer.",
      author: "– Olivia R.",
    },
  ];

  let currentSlide = 0;

  function renderTestimonials() {
    slider.innerHTML = testimonials
      .map(
        (t, index) => `
      <div class="testimonials__item${index === currentSlide ? " active" : ""}">
        <p class="testimonials__quote">"${t.quote}"</p>
        <p class="testimonials__author">${t.author}</p>
      </div>
    `
      )
      .join("");
  }

  renderTestimonials();

  prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
    renderTestimonials();
  });

  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % testimonials.length;
    renderTestimonials();
  });

  /* --- Contact Modal Logic --- */
  const contactModal = document.getElementById("contact");
  const closeModal = contactModal.querySelector(".contact-modal__close");
  const nextStepBtn = contactModal.querySelector(".contact__next");
  const prevStepBtn = contactModal.querySelector(".contact__prev");
  const steps = contactModal.querySelectorAll(".contact__step");
  const progressSteps = contactModal.querySelectorAll(".contact__progress-step");

  let stepIndex = 0;

  function showStep(index) {
    steps.forEach((step, i) => {
      step.style.display = i === index ? "block" : "none";
      step.classList.toggle("active", i === index);
      progressSteps[i].classList.toggle("active", i === index);
    });
  }

  showStep(stepIndex);

  nextStepBtn.addEventListener("click", () => {
    stepIndex = 1;
    showStep(stepIndex);
  });

  prevStepBtn.addEventListener("click", () => {
    stepIndex = 0;
    showStep(stepIndex);
  });

  closeModal.addEventListener("click", () => {
    contactModal.classList.remove("contact-modal--open");
  });

  document.querySelectorAll('.nav__link[href="#contact"]').forEach((link) =>
    link.addEventListener("click", (e) => {
      e.preventDefault();
      contactModal.classList.add("contact-modal--open");
      stepIndex = 0;
      showStep(stepIndex);
    })
  );
});
