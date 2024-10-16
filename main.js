const openMenuButton = document.getElementById("open-menu-button");
const closeMenuButton = document.getElementById("close-menu-button");
const navigationOverlay = document.getElementById("navigation-overlay");
const navigationContent = document.getElementById("navigation-content");

const media = window.matchMedia("(width < 42em)");

const openMenu = () => {
  openMenuButton.setAttribute("aria-expanded", "true");
  navigationOverlay.classList.add("overlay-active");

  navigationContent.removeAttribute("style");
};

const closeMenu = () => {
  openMenuButton.setAttribute("aria-expanded", "false");
  navigationOverlay.classList.remove("overlay-active");

  setTimeout(() => {
    navigationContent.style.transition = "none";
  }, 5000);
};

const handleResize = (event) => {
  if (event.matches) {
    openMenuButton.setAttribute("aria-expanded", "false");
    navigationContent.style.transition = "none";
  }
};

openMenuButton.addEventListener("click", openMenu);
closeMenuButton.addEventListener("click", closeMenu);
media.addEventListener("change", handleResize);
