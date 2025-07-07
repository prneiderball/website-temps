document.addEventListener('DOMContentLoaded', () => {
  const images = [
    {
      full: 'https://picsum.photos/id/1018/1200/800',
      thumb: 'https://picsum.photos/id/1018/600/400',
      title: 'Golden Peaks',
      description: 'Sunset on snow-covered mountains.',
      alt: 'Snowy mountain range',
      category: 'nature',
      delay: 0
    },
    {
      full: 'https://picsum.photos/id/1020/1200/800',
      thumb: 'https://picsum.photos/id/1020/600/400',
      title: 'Rainy Alley',
      description: 'Reflections and solitude.',
      alt: 'City alley in the rain',
      category: 'urban',
      delay: 100
    },
    {
      full: 'https://picsum.photos/id/1005/1200/800',
      thumb: 'https://picsum.photos/id/1005/600/400',
      title: 'Eyes Like Stories',
      description: 'Soft lighting on a serious gaze.',
      alt: 'Close-up portrait of woman',
      category: 'portraits',
      delay: 200
    },
    {
      full: 'https://picsum.photos/id/1043/1200/800',
      thumb: 'https://picsum.photos/id/1043/600/400',
      title: 'Crimson Trees',
      description: 'Autumn leaves in peak color.',
      alt: 'Red forest path',
      category: 'nature',
      delay: 0
    },
    {
      full: 'https://picsum.photos/id/1011/1200/800',
      thumb: 'https://picsum.photos/id/1011/600/400',
      title: 'Steel Horizons',
      description: 'Futuristic skyline at dusk.',
      alt: 'Urban city skyline',
      category: 'urban',
      delay: 100
    },
    {
      full: 'https://picsum.photos/id/1027/1200/800',
      thumb: 'https://picsum.photos/id/1027/600/400',
      title: 'Morning Stillness',
      description: 'Lone tree in misty field.',
      alt: 'Foggy landscape with tree',
      category: 'nature',
      delay: 200
    },
    {
      full: 'https://picsum.photos/id/1012/1200/800',
      thumb: 'https://picsum.photos/id/1012/600/400',
      title: 'Into the Lights',
      description: 'Man walking through city neon.',
      alt: 'Silhouette under street lights',
      category: 'urban',
      delay: 0
    },
    {
      full: 'https://picsum.photos/id/1001/1200/800',
      thumb: 'https://picsum.photos/id/1001/600/400',
      title: 'Honest Light',
      description: 'Natural light portrait in motion.',
      alt: 'Candid smiling portrait',
      category: 'portraits',
      delay: 100
    },
    {
      full: 'https://picsum.photos/id/1039/1200/800',
      thumb: 'https://picsum.photos/id/1039/600/400',
      title: 'Skyline Noir',
      description: 'Black and white architectural forms.',
      alt: 'Black and white cityscape',
      category: 'urban',
      delay: 200
    },
    {
      full: 'https://picsum.photos/id/1056/1200/800',
      thumb: 'https://picsum.photos/id/1056/600/400',
      title: 'By the Stream',
      description: 'Tranquil forest water trail.',
      alt: 'Flowing creek in woods',
      category: 'nature',
      delay: 300
    }
  ];

  const galleryList = document.getElementById('gallery-list');

  function renderGallery(filter = 'all') {
    galleryList.innerHTML = '';
    const filtered = filter === 'all' ? images : images.filter(img => img.category === filter);

    filtered.forEach(img => {
      const li = document.createElement('li');
      li.className = 'gallery__item';
      li.setAttribute('data-aos', 'fade-up');
      if (img.delay) li.setAttribute('data-aos-delay', img.delay);

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

    new SimpleLightbox('.gallery__list a');
    AOS.refresh();
  }

  // Initial render
  renderGallery();

  // Filter buttons
  document.querySelectorAll('.filter-button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderGallery(filter);
    });
  });

  // Smooth scroll
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

function handleSubmit(event) {
  event.preventDefault();
  alert("Thank you! Your message has been sent.");
  event.target.reset();
}
