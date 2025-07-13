import './style.css';

// Log initial load
console.log("Script loaded!");

// --------------------------------------------------------------------------------
// WINDOW LOAD
// --------------------------------------------------------------------------------
window.addEventListener("load", onWindowLoad);
function onWindowLoad() {
  console.log("Window loaded!");
  initPreloader();
}

// Preloader animation
function initPreloader() {
  const preloader = document.querySelector(".preloader");
  const progressBar = document.querySelector(".preloader__progress-bar");

  // Prevent scrolling until preloader finishes
  document.body.style.overflowY = "hidden";

  setTimeout(() => { progressBar.style.width = "100%"; }, 100);
  setTimeout(() => {
    preloader.classList.add("preloader--hidden");
    document.body.style.overflowY = "auto";
  }, 3000);
}

// --------------------------------------------------------------------------------
// DOM CONTENT LOADED: Grouped Initializations
// --------------------------------------------------------------------------------
console.log("Welcome JS is connected.");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded.");

  initCustomCursor();
  initParticleEffects();
  initThemeToggle();
  initMobileNav();
  initSwiperGallery();
  initGsapHeroAnimation();
  initTestimonialsSlider();
  initContactModal();
});

// --------------------------------------------------------------------------------
// 1. CUSTOM CURSOR
// --------------------------------------------------------------------------------
function initCustomCursor() {
  const cursor = document.createElement("div");
  cursor.classList.add("cursor");
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", e => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  document.querySelectorAll("a, button, .swiper-slide").forEach(el => {
    el.addEventListener("mouseenter", () => cursor.classList.add("cursor--hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("cursor--hover"));
  });
}

// --------------------------------------------------------------------------------
// 2. PARTICLE EFFECTS (Lazy Load)
// --------------------------------------------------------------------------------
function initParticleEffects() {
  const container = document.getElementById("particles-js");
  if (!container) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        particlesJS("particles-js", {
          particles: {
            number: { value: 60 }, shape: { type: "circle" }, size: { value: 3 }, opacity: { value: 0.7 },
            move: { enable: true, speed: 1 }, line_linked: { enable: false }
          },
          interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" } },
            modes: { repulse: { distance: 100 }, push: { particles_nb: 4 } }
          },
          retina_detect: true
        });
        obs.disconnect();
      }
    });
  }, { threshold: 0.1 });

  observer.observe(container);
}

// --------------------------------------------------------------------------------
// 3. THEME TOGGLE (With Debug Logs)
// --------------------------------------------------------------------------------
function initThemeToggle() {
  console.log('→ [Debug] initThemeToggle called.');
  const toggle = document.querySelector('.theme-toggle');
  console.log('→ [Debug] theme-toggle element:', toggle);
  if (!toggle) return;
  const icon = toggle.querySelector('i');
  console.log('→ [Debug] theme icon element:', icon);

  toggle.addEventListener('click', () => {
    console.log('→ [Debug] theme-toggle clicked');
    document.body.classList.toggle('theme-platinum');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
    console.log('→ [Debug] body classes now:', document.body.className);
  });
}

// --------------------------------------------------------------------------------
// 4. MOBILE NAV TOGGLE
// --------------------------------------------------------------------------------
function initMobileNav() {
  const btn = document.querySelector(".nav__toggle");
  const nav = document.querySelector(".nav");
  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    nav.classList.toggle("nav--open");
  });
}

// --------------------------------------------------------------------------------
// 5. SWIPER GALLERY (With Debug Logs)
// --------------------------------------------------------------------------------
function initSwiperGallery() {
  console.log('→ [Debug] initSwiperGallery called.');
  console.log('→ [Debug] Swiper constructor:', typeof Swiper);
  const swiperEl = document.querySelector('.teaser-swiper');
  console.log('→ [Debug] .teaser-swiper element:', swiperEl);

  if (typeof Swiper === 'undefined') {
    console.error('Swiper is not loaded.');
    return;
  }
  if (!swiperEl) {
    console.error('.teaser-swiper container not found.');
    return;
  }

  const swiper = new Swiper('.teaser-swiper', {
    loop: true,
    centeredSlides: true,
    grabCursor: true,
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });
  console.log('→ [Debug] Swiper instance created:', swiper);
}

// --------------------------------------------------------------------------------
// 6. GSAP HERO ANIMATION
// --------------------------------------------------------------------------------
function initGsapHeroAnimation() {
  gsap.to(".hero__title span", { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out" });
  gsap.to(".hero__subtitle", { opacity: 1, delay: 1, duration: 1.5, ease: "power2.out" });
}

// --------------------------------------------------------------------------------
// 7. TESTIMONIALS SLIDER
// --------------------------------------------------------------------------------
function initTestimonialsSlider() {
  const sliderEl = document.getElementById("testimonials-slider");
  const prevBtn = document.querySelector(".testimonials__button--prev");
  const nextBtn = document.querySelector(".testimonials__button--next");
  if (!sliderEl || !prevBtn || !nextBtn) return;

  const items = [
    { quote: "Absolutely stunning shots. You truly captured the essence of the moment.", author: "– Emma T." },
    { quote: "Your work is beyond professional – it’s storytelling through light.", author: "– Liam J." },
    { quote: "Hands down the best experience I’ve had with a photographer.", author: "– Olivia R." }
  ];

  let currentIndex = 0;

  function render() {
    sliderEl.innerHTML = items.map((t, i) =>
      `<div class="testimonials__item${i === currentIndex ? " active" : ""}">
         <p class="testimonials__quote">"${t.quote}"</p>
         <p class="testimonials__author">${t.author}</p>
       </div>`
    ).join("");
  }

  prevBtn.addEventListener("click", () => { currentIndex = (currentIndex - 1 + items.length) % items.length; render(); });
  nextBtn.addEventListener("click", () => { currentIndex = (currentIndex + 1) % items.length; render(); });

  render();
}

// --------------------------------------------------------------------------------
// 8. CONTACT MODAL
// --------------------------------------------------------------------------------
function initContactModal() {
  const modal = document.getElementById("contact");
  if (!modal) return;

  const closeBtn = modal.querySelector(".contact-modal__close");
  const nextBtn = modal.querySelector(".contact__next");
  const prevBtn = modal.querySelector(".contact__prev");
  const steps = modal.querySelectorAll(".contact__step");
  const progress = modal.querySelectorAll(".contact__progress-step");

  let stepIndex = 0;

  function showStep(idx) {
    steps.forEach((step, i) => {
      const active = i === idx;
      step.style.display = active ? "block" : "none";
      step.classList.toggle("active", active);
      progress[i].classList.toggle("active", active);
    });
  }

  showStep(stepIndex);

  nextBtn.addEventListener("click", () => { stepIndex = Math.min(stepIndex + 1, steps.length - 1); showStep(stepIndex); });
  prevBtn.addEventListener("click", () => { stepIndex = Math.max(stepIndex - 1, 0); showStep(stepIndex); });
  closeBtn.addEventListener("click", () => modal.classList.remove("contact-modal--open"));

  document.querySelectorAll('.nav__link[href="#contact"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      modal.classList.add("contact-modal--open");
      stepIndex = 0;
      showStep(stepIndex);
    });
  });
}
