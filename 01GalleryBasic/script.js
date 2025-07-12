document.addEventListener('DOMContentLoaded', () => {
  const galleryImages = [
    {
      full: 'https://picsum.photos/1200/800?random=1',
      thumb: 'https://picsum.photos/600/400?random=1',
      alt: 'Golden hour over lake',
      title: 'Golden Reflections',
      description: 'Sunset at the lake, soft and silent.',
      delay: 0
    },
    {
      full: 'https://picsum.photos/1200/800?random=2',
      thumb: 'https://picsum.photos/600/400?random=2',
      alt: 'Urban skyline at dusk',
      title: 'Urban Contrast',
      description: 'Lines, angles, and balance.',
      delay: 100
    },
    {
      full: 'https://picsum.photos/1200/800?random=3',
      thumb: 'https://picsum.photos/600/400?random=3',
      alt: 'Forest trail at sunrise',
      title: 'Wander Through Mist',
      description: 'Morning fog along a quiet path.',
      delay: 200
    },
    {
      full: 'https://picsum.photos/1200/800?random=4',
      thumb: 'https://picsum.photos/600/400?random=4',
      alt: 'Ocean coast cliffside',
      title: 'Coastal Silence',
      description: 'Waves crashing into rugged beauty.',
      delay: 300
    },
    {
      full: 'https://picsum.photos/1200/800?random=5',
      thumb: 'https://picsum.photos/600/400?random=5',
      alt: 'Desert road and sky',
      title: 'Endless Road',
      description: 'Minimalist desert perspective.',
      delay: 400
    },
    {
      full: 'https://picsum.photos/1200/800?random=6',
      thumb: 'https://picsum.photos/600/400?random=6',
      alt: 'City at night',
      title: 'Night Pulse',
      description: 'Energy of the city after dark.',
      delay: 0
    },
    {
      full: 'https://picsum.photos/1200/800?random=7',
      thumb: 'https://picsum.photos/600/400?random=7',
      alt: 'Person in silhouette',
      title: 'Shadowed Light',
      description: 'A quiet moment of contrast.',
      delay: 100
    },
    {
      full: 'https://picsum.photos/1200/800?random=8',
      thumb: 'https://picsum.photos/600/400?random=8',
      alt: 'Mountain ridges',
      title: 'Summit Lines',
      description: 'Where sky meets stone.',
      delay: 200
    },
    {
      full: 'https://picsum.photos/1200/800?random=9',
      thumb: 'https://picsum.photos/600/400?random=9',
      alt: 'Abstract motion lights',
      title: 'Electric Motion',
      description: 'Long exposure neon bursts.',
      delay: 300
    },
    {
      full: 'https://picsum.photos/1200/800?random=10',
      thumb: 'https://picsum.photos/600/400?random=10',
      alt: 'Forest path in fog',
      title: 'Still Wander',
      description: 'Walking through morning mist.',
      delay: 400
    }
  ];

  const galleryList = document.getElementById('gallery-list');
  const loadMoreBtn = document.getElementById('load-more-btn');

  const batchSize = 6; // Number of images to load each time
  let currentIndex = 0;

  function renderBatch() {
    const nextBatch = galleryImages.slice(currentIndex, currentIndex + batchSize);

    nextBatch.forEach((img) => {
      const li = document.createElement('li');
      li.className = 'gallery__item';
      li.setAttribute('data-aos', 'fade-up');
      if (img.delay) li.setAttribute('data-aos-delay', img.delay);

      li.innerHTML = `
        <div class="gallery__card">
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

    currentIndex += batchSize;

    if (currentIndex >= galleryImages.length) {
      loadMoreBtn.style.display = 'none';
    }

    AOS.refresh(); // Refresh animations after new elements added
  }

  // Initial batch load
  renderBatch();

  // Load more on button click
  loadMoreBtn.addEventListener('click', renderBatch);

  // Initialize Lightbox and AOS
  new SimpleLightbox('.gallery__list a');
  AOS.init({ duration: 1000 });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

// Simple form submit handler (if you want to keep this)
function handleSubmit(event) {
  event.preventDefault();
  alert("Thank you! Your message has been sent.");
  event.target.reset();
}
