export function renderGallery({
  images,
  filter = "all",
  sort = "date-desc",
  expanded = false,
  target,
  toggleBtn,
  lightbox,
  initialVisibleCount = 6
}) {
  // Sort images
  const sorted = [...images].sort((a, b) => {
    if (sort === "date-asc") return new Date(a.date) - new Date(b.date);
    if (sort === "date-desc") return new Date(b.date) - new Date(a.date);
    if (sort === "title-asc") return a.title.localeCompare(b.title);
    return 0;
  });

  // Filter images
  const filtered = filter === "all"
    ? sorted
    : sorted.filter((img) => img.category === filter);

  // Determine which images to show
  const visibleImages = expanded
    ? filtered
    : filtered.slice(0, initialVisibleCount);

  // Clear and re-render gallery
  target.innerHTML = "";
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
    target.appendChild(li);
  });

  // Show/hide toggle button
  if (filtered.length <= initialVisibleCount && !expanded) {
    toggleBtn.style.display = "none";
  } else {
    toggleBtn.style.display = "inline-block";
    toggleBtn.textContent = expanded ? "Show Less" : "Show More";
  }

  // Refresh plugins
  lightbox.refresh();
  AOS.refresh();
}
