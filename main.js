const openMenuButton = document.getElementById("open-menu-button");
const closeMenuButton = document.getElementById("close-menu-button");
const navigationOverlay = document.getElementById("navigation-overlay");
const navigationContent = document.getElementById("navigation-content");

const minusQuantityButton = document.getElementById("minus-quantity-button");
const plusQuantityButton = document.getElementById("plus-quantity-button");
const quantity = document.getElementById("quantity");

const media = window.matchMedia("(width < 52em)");

const openMenu = () => {
  openMenuButton.setAttribute("aria-expanded", "true");

  navigationContent.removeAttribute("style");
  navigationOverlay.removeAttribute("style");

  closeMenuButton.focus();
};

const closeMenu = () => {
  openMenuButton.setAttribute("aria-expanded", "false");

  setTimeout(() => {
    navigationContent.style.transition = "none";
    navigationOverlay.style.transition = "none";
  }, 350);

  openMenuButton.focus();
};

const handleMinusButtonClick = (quantity) => {
  const quantityAmout = Number(quantity.textContent);
  if (quantityAmout > 0) quantity.textContent = quantityAmout - 1;
};

const handlePlusButtonClick = (quantity) => {
  const quantityAmout = Number(quantity.textContent);
  quantity.textContent = quantityAmout + 1;
};

const handleResize = (event) => {
  if (event.matches) {
    openMenuButton.setAttribute("aria-expanded", "false");
    navigationContent.style.transition = "none";
    navigationOverlay.style.transition = "none";
  }
};

openMenuButton.addEventListener("click", openMenu);
closeMenuButton.addEventListener("click", closeMenu);

minusQuantityButton.addEventListener("click", () =>
  handleMinusButtonClick(quantity)
);
plusQuantityButton.addEventListener("click", () =>
  handlePlusButtonClick(quantity)
);

media.addEventListener("change", handleResize);
