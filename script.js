// Portfolio: filter + lightbox
(function () {
  const gallery = document.getElementById("gallery");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeBtn = document.getElementById("lightboxClose");
  const filterBtns = document.querySelectorAll(".filter-btn");

  if (!gallery) return;

  // Filtering
  function setFilter(filter) {
    const items = gallery.querySelectorAll(".gallery-item");
    items.forEach((item) => {
      const cat = item.getAttribute("data-category");
      const show = filter === "all" || cat === filter;
      item.style.display = show ? "" : "none";
    });

    filterBtns.forEach((b) => b.classList.remove("active"));
    document.querySelector(`.filter-btn[data-filter="${filter}"]`)?.classList.add("active");
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => setFilter(btn.getAttribute("data-filter")));
  });

  // Lightbox open
  gallery.addEventListener("click", (e) => {
    const link = e.target.closest("a.gallery-item");
    if (!link) return;
    e.preventDefault();
    const href = link.getAttribute("href");
    lightboxImg.src = href;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });

  // Lightbox close
  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
  }

  closeBtn?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  // Default filter
  setFilter("all");
})();
