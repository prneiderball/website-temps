export function getActiveFilter() {
  return document.querySelector(".filter-button.active")?.getAttribute("data-filter") || "all";
}

export function setupToggle(toggleBtn, navList) {
  toggleBtn.addEventListener("click", () => {
    toggleBtn.classList.toggle("active");
    navList.classList.toggle("active");
  });
}

export function setupSmoothScroll() {
  document.querySelectorAll(".nav__link, .hero__cta").forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}
