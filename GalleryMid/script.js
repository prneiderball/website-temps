document.addEventListener('DOMContentLoaded', () => {
  const placeholderImages = [
    {
      full: 'hhttps://picsum.photos/200',
      thumb: 'https://picsum.photos/200',
      title: 'Placeholder Image 1',
      description: 'This is a placeholder description.',
      alt: 'Placeholder Image 1',
      category: 'nature',
      date: '2025-07-01'
    },
    {
      full: 'https://picsum.photos/100',
      thumb: 'https://picsum.photos/100',
      title: 'Placeholder Image 2',
      description: 'Another placeholder description.',
      alt: 'Placeholder Image 2',
      category: 'urban',
      date: '2025-06-15'
    },
    {
      full: 'https://picsum.photos/300',
      thumb: 'https://picsum.photos/300',
      title: 'Placeholder Image 3',
      description: 'Sample placeholder text.',
      alt: 'Placeholder Image 3',
      category: 'portraits',
      date: '2025-06-01'
    }
  ];

  function renderGallery(imagesArray, filter = 'all') {
    let imagesToRender = [...imagesArray];

    const sortBy = document.getElementById('sort-select').value;
    if (sortBy === 'date-asc') {
      imagesToRender.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'date-desc') {
      imagesToRender.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'title-asc') {
      imagesToRender.sort((a, b) => a.title.localeCompare(b.title));
    }

    const galleryList = document.getElementById('gallery-list');
    galleryList.innerHTML = '';

    const filtered = filter === 'all' ? imagesToRender : imagesToRender.filter(img => img.category === filter);

    filtered.forEach(img => {
      const li = document.createElement('li');
      li.className = 'gallery__item';
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

    new SimpleLightbox('.gallery__list a');
    AOS.refresh();
  }

  renderGallery(placeholderImages);

  document.querySelectorAll('.filter-button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderGallery(placeholderImages, filter);
    });
  });

  document.getElementById('sort-select').addEventListener('change', () => {
    const activeFilter = document.querySelector('.filter-button.active').getAttribute('data-filter');
    renderGallery(placeholderImages, activeFilter);
  });

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
