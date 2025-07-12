// Initialize Lightbox
jQuery(document).ready(function ($) {
  lightbox.option({
    resizeDuration: 200,
    wrapAround: true,
    fadeDuration: 200,
    imageFadeDuration: 200
  });
});

// Initialize Three.js
function initThreeJS() {
  const canvas = document.querySelector('#hero-canvas');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.z = 5;

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xd4af37, 0.7);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  const geometry = new THREE.IcosahedronGeometry(1, 0);
  const material = new THREE.MeshPhongMaterial({
    color: 0xd4af37,
    shininess: 100,
    transparent: true,
    opacity: 0.6,
    wireframe: true
  });

  const crystals = [];
  for (let i = 0; i < 20; i++) {
    const crystal = new THREE.Mesh(geometry, material);
    crystal.position.set(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    );
    crystal.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    crystal.scale.setScalar(0.5 + Math.random() * 0.5);
    scene.add(crystal);
    crystals.push(crystal);
  }

  function animate() {
    requestAnimationFrame(animate);
    crystals.forEach(crystal => {
      crystal.rotation.x += 0.01;
      crystal.rotation.y += 0.01;
    });
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
}

// Preloader
window.addEventListener('load', () => {
  initThreeJS();
  const preloader = document.querySelector('.preloader');
  const progressBar = document.querySelector('.preloader__progress-bar');
  
  let width = 0;
  const interval = setInterval(() => {
    if (width >= 100) {
      clearInterval(interval);
      preloader.classList.add('preloader--hidden');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 1000);
      animateHeroText();
    } else {
      width += 5;
      progressBar.style.width = `${width}%`;
    }
  }, 200);

  // Ensure lazy-loaded images are loaded before applying effects
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    if (img.complete) return;
    img.addEventListener('load', () => {
      VanillaTilt.init(img.parentElement, {
        max: 5,
        speed: 400,
        glare: true,
        'max-glare': 0.4
      });
    });
  });
});

// Custom Cursor
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

document.querySelectorAll('.button, .nav__link, .teaser-gallery__item, .contact-modal__close, .testimonials__button').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
  el.addEventListener('mouseout', () => cursor.classList.remove('cursor--hover'));
});

// Magnetic Cursor Effect
const magneticElements = document.querySelectorAll('.button, .nav__link');
magneticElements.forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    const maxDistance = 50;
    if (distance < maxDistance) {
      const translateX = deltaX * 0.3;
      const translateY = deltaY * 0.3;
      el.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }
  });
  el.addEventListener('mouseout', () => {
    el.style.transform = 'translate(0, 0)';
  });
});

// Header Scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  const currentScroll = window.scrollY;
  
  if (currentScroll > lastScroll && currentScroll > 150) {
    header.classList.add('header--scrolled');
  } else {
    header.classList.remove('header--scrolled');
  }
  lastScroll = currentScroll;
});

// Navigation Toggle
const navToggle = document.querySelector('.nav__toggle');
const navList = document.querySelector('.nav__list');
navToggle.addEventListener('click', () => {
  document.querySelector('.nav').classList.toggle('nav--open');
  playSound('nav-toggle');
});

// Smooth Scroll
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
    playSound('click');
  });
});

// Particles.js
particlesJS('particles-js', {
  particles: {
    number: { value: 100, density: { enable: true, value_area: 600 } },
    color: { value: '#d4af37' },
    shape: { type: 'star' },
    opacity: { value: 0.4, random: true },
    size: { value: 2, random: true },
    move: { enable: true, speed: 1, direction: 'none', random: true }
  },
  interactivity: {
    events: {
      onhover: { enable: true, mode: 'bubble' },
      onclick: { enable: true, mode: 'repulse' }
    },
    modes: { bubble: { distance: 100, size: 4, duration: 0.3 } }
  }
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

function animateHeroText() {
  const spans = document.querySelectorAll('.hero__title span');
  spans.forEach((span, index) => {
    gsap.to(span, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: index * 0.1,
      ease: 'power3.out'
    });
  });
}

gsap.from('.hero__content', {
  opacity: 0,
  scale: 0.8,
  duration: 2,
  ease: 'power4.out',
  scrollTrigger: { trigger: '.hero', start: 'top bottom' }
});

document.querySelectorAll('[data-parallax]').forEach(section => {
  gsap.to(section, {
    yPercent: 15,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    }
  });
});

gsap.from('.section-heading span', {
  opacity: 0,
  y: 30,
  duration: 1,
  stagger: 0.2,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.section-heading',
    start: 'top 80%'
  }
});

// 3D Gallery Carousel (fixed)
const carousel = document.querySelector('.teaser-gallery__carousel');
const items = document.querySelectorAll('.teaser-gallery__item');
const itemCount = items.length;
let angle = 0;
const theta = itemCount > 0 ? 360 / itemCount : 0;
const radius = 700;

function positionItems() {
  if (!items || items.length === 0) return;
  items.forEach((item, index) => {
    const itemAngle = theta * index;
    item.style.transform = `
      rotateY(${itemAngle}deg)
      translateZ(${radius}px)
    `;
  });
}

function rotateCarousel(direction) {
  if (!carousel || itemCount === 0) return;
  angle += direction === 'right' ? -theta : theta;
  carousel.style.transform = `translateZ(-${radius}px) rotateY(${angle}deg)`;
  playSound('slide');
}

// Setup initial item positions
if (itemCount > 0 && carousel) {
  positionItems();

  // Add event listeners
  const nextBtn = document.querySelector('.teaser-gallery__button--next');
  const prevBtn = document.querySelector('.teaser-gallery__button--prev');
  if (nextBtn) nextBtn.addEventListener('click', () => rotateCarousel('right'));
  if (prevBtn) prevBtn.addEventListener('click', () => rotateCarousel('left'));

  // Auto-rotate
  setInterval(() => rotateCarousel('right'), 5000);
}

// Vanilla Tilt
VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
  max: 5,
  speed: 400,
  glare: true,
  'max-glare': 0.4
});

// Testimonials Slider
const testimonialsTrack = document.querySelector('.testimonials__track');
const testimonialsData = [
  { quote: 'A masterpiece in every frame, crafted with divine artistry.', author: 'Amara Stone' },
  { quote: 'This work redefines luxury, a visual odyssey of elegance.', author: 'Julian Blackwood' },
  { quote: 'Pure genius, each photo is a timeless treasure.', author: 'Isadora Laurent' }
];

testimonialsData.forEach(item => {
  const div = document.createElement('div');
  div.classList.add('testimonials__item');
  div.innerHTML = `
    <p class="testimonials__quote">"${item.quote}"</p>
    <p class="testimonials__author">— ${item.author}</p>
  `;
  testimonialsTrack.appendChild(div);
});

let currentSlide = 0;
const slides = document.querySelectorAll('.testimonials__item');
const totalSlides = slides.length;

function updateSlider() {
  gsap.to(testimonialsTrack, {
    x: -currentSlide * (slides[0].offsetWidth + 30),
    duration: 1,
    ease: 'power3.out'
  });
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentSlide);
  });
  playSound('slide');
}

document.querySelector('.testimonials__button--next').addEventListener('click', () => {
  currentSlide = (currentSlide < totalSlides - 1) ? currentSlide + 1 : 0;
  updateSlider();
});

document.querySelector('.testimonials__button--prev').addEventListener('click', () => {
  currentSlide = (currentSlide > 0) ? currentSlide - 1 : totalSlides - 1;
  updateSlider();
});

// Contact Modal
const contactModal = document.querySelector('.contact-modal');
const contactLinks = document.querySelectorAll('a[href*="#contact"]');
const closeButton = document.querySelector('.contact-modal__close');
const steps = document.querySelectorAll('.contact__step');
const nextButtons = document.querySelectorAll('.contact__next');
const prevButton = document.querySelector('.contact__prev');
const progressSteps = document.querySelectorAll('.contact__progress-step');
let currentStep = 0;

contactLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    contactModal.classList.add('contact-modal--open');
    playSound('modal');
  });
});

closeButton.addEventListener('click', () => {
  contactModal.classList.remove('contact-modal--open');
  resetForm();
  playSound('modal');
});

nextButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (validateStep(currentStep)) {
      gsap.to(steps[currentStep], {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => {
          steps[currentStep].style.display = 'none';
          currentStep++;
          steps[currentStep].style.display = 'block';
          gsap.to(steps[currentStep], { opacity: 1, y: 0, duration: 0.3 });
          updateProgress();
        }
      });
      playSound('click');
    }
  });
});

prevButton.addEventListener('click', () => {
  gsap.to(steps[currentStep], {
    opacity: 0,
    y: -20,
    duration: 0.3,
    onComplete: () => {
      steps[currentStep].style.display = 'none';
      currentStep--;
      steps[currentStep].style.display = 'block';
      gsap.to(steps[currentStep], { opacity: 1, y: 0, duration: 0.3 });
      updateProgress();
    }
  });
  playSound('click');
});

function updateProgress() {
  progressSteps.forEach((step, index) => {
    step.classList.toggle('active', index <= currentStep);
  });
}

function validateStep(step) {
  const inputs = steps[step].querySelectorAll('input, textarea');
  return Array.from(inputs).every(input => input.checkValidity());
}

function resetForm() {
  currentStep = 0;
  steps.forEach((step, index) => {
    step.style.display = index === 0 ? 'block' : 'none';
    gsap.set(step, { opacity: index === 0 ? 1 : 0, y: index === 0 ? 0 : -20 });
  });
  updateProgress();
  document.querySelector('.contact__form').reset();
}

// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
let isDarkTheme = true;
themeToggle.addEventListener('click', () => {
  isDarkTheme = !isDarkTheme;
  document.body.classList.toggle('theme-platinum', !isDarkTheme);
  themeToggle.querySelector('i').classList.toggle('fa-moon', isDarkTheme);
  themeToggle.querySelector('i').classList.toggle('fa-sun', !isDarkTheme);
  playSound('transition');
});

// AI-Powered Personalization
function personalizeGreeting() {
  const hours = new Date().getHours();
  let greeting = 'Welcome, Visionary';
  if (hours < 6) greeting = 'Good Evening, Night Muse';
  else if (hours < 12) greeting = 'Good Morning, Dawn Artist';
  else if (hours < 18) greeting = 'Good Afternoon, Light Weaver';
  else greeting = 'Good Evening, Starlit Creator';
  document.querySelector('.hero__subtitle').textContent = greeting;
}
setTimeout(personalizeGreeting, 500);

// Form Submission
document.querySelector('.contact__form').addEventListener('submit', async (e) => {
  e.preventDefault();
  alert('Your message has been sent!');
  contactModal.classList.remove('contact-modal--open');
  resetForm();
  playSound('click');
});