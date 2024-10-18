const openMenuButton = document.getElementById("open-menu-button");
const closeMenuButton = document.getElementById("close-menu-button");
const navigationOverlay = document.getElementById("navigation-overlay");
const navigationContent = document.getElementById("navigation-content");

const carouselButtons = document.querySelectorAll("[data-carousel-button]");
const productThumbnailImageButtons = document.querySelectorAll(
  ".product-thumbnail-image-button"
);

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

const handleCarouselButton = (event) => {
  const offset = event.currentTarget.dataset.carouselButton === "next" ? 1 : -1;

  const slides = event.target
    .closest("[data-carousel]")
    .querySelector("[data-slides]");

  const activeSlide = slides.querySelector("[data-active]");
  let newIndex = [...slides.children].indexOf(activeSlide) + offset;
  if (newIndex < 0) newIndex = slides.children.length - 1;
  if (newIndex >= slides.children.length) newIndex = 0;

  slides.children[newIndex].dataset.active = true;
  delete activeSlide.dataset.active;
};

const handleProductThumbnailImageButtonClick = (event) => {
  const button = event.target.parentNode;

  const imagesList = button.closest("[data-product-thumbnail-images");

  const activeElement = imagesList.querySelector("[data-active]");

  console.log(activeElement === button);

  if (activeElement !== button) {
    button.dataset.active = true;
    delete activeElement.dataset.active;
  }
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

carouselButtons.forEach((carouselButton) =>
  carouselButton.addEventListener("click", (event) =>
    handleCarouselButton(event)
  )
);

productThumbnailImageButtons.forEach((productThumbnailImageButton) => {
  productThumbnailImageButton.addEventListener("click", (event) =>
    handleProductThumbnailImageButtonClick(event)
  );
});

minusQuantityButton.addEventListener("click", () =>
  handleMinusButtonClick(quantity)
);
plusQuantityButton.addEventListener("click", () =>
  handlePlusButtonClick(quantity)
);

media.addEventListener("change", handleResize);
