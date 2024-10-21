const openMenuButton = document.getElementById("open-menu-button");
const closeMenuButton = document.getElementById("close-menu-button");
const navigationOverlay = document.getElementById("navigation-overlay");
const navigationContent = document.getElementById("navigation-content");

const lightbox = document.querySelector("[data-lightbox]");
const productImages = document.querySelector("[data-product-images]");

const carouselButtons = document.querySelectorAll("[data-carousel-button]");
const carouselItems = document.querySelectorAll(".carousel-item");
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
  const isLightbox =
    event.target.parentNode.parentNode.parentNode.dataset.lightbox;

  const offset = event.target.dataset.carouselButton === "next" ? 1 : -1;

  const lightBoxThumbnaillImages = lightbox.querySelector(
    "[data-product-thumbnail-images]"
  );
  const productThumbnailImages = productImages.querySelector(
    "[data-product-thumbnail-images]"
  );

  const lightboxSlides = lightbox.querySelector("[data-slides]");
  const productImagesSlides = productImages.querySelector("[data-slides]");

  const filteredSlides = [...lightboxSlides.children].filter(
    (slide) => slide.nodeName === "LI"
  );

  const activeLightboxSlide = lightboxSlides.querySelector("[data-active]");
  const activeProductImagesSlide = productImages.querySelector("[data-active]");

  const lightboxActiveProductThumbnailImage =
    lightBoxThumbnaillImages.querySelector("[data-active]");
  const productImagesActiveProductThumbnailImage =
    productThumbnailImages.querySelector("[data-active]");

  let newIndex = null;

  if (isLightbox) {
    newIndex = filteredSlides.indexOf(activeLightboxSlide) + offset;
    if (newIndex < 0) newIndex = filteredSlides.length - 1;
    if (newIndex >= filteredSlides.length) newIndex = 0;
  } else {
    newIndex =
      [...productImagesSlides.children].indexOf(activeProductImagesSlide) +
      offset;
    if (newIndex < 0) newIndex = productImagesSlides.children.length - 1;
    if (newIndex >= productImagesSlides.children.length) newIndex = 0;
  }

  filteredSlides[newIndex].dataset.active = true;
  lightBoxThumbnaillImages.children[newIndex].dataset.active = true;

  productImagesSlides.children[newIndex].dataset.active = true;
  productThumbnailImages.children[newIndex].dataset.active = true;

  delete activeLightboxSlide.dataset.active;
  delete lightboxActiveProductThumbnailImage.dataset.active;

  delete activeProductImagesSlide.dataset.active;
  delete productImagesActiveProductThumbnailImage.dataset.active;
};

const handleProductThumbnailImageButtonClick = (event) => {
  const isLightbox =
    event.target.parentNode.parentNode.parentNode.dataset.lightbox;

  const button = event.target;

  const lightboxSlide = lightbox.querySelector(
    `[data-product-image="${button.dataset.productImage}"]`
  );
  const productImageSlide = productImages.querySelector(
    `[data-product-image="${button.dataset.productImage}"]`
  );

  const lightBoxThumbnaillImages = lightbox.querySelector(
    "[data-product-thumbnail-images]"
  );
  const productThumbnailImages = productImages.querySelector(
    "[data-product-thumbnail-images]"
  );

  const lightBoxThumbnaillImage = lightBoxThumbnaillImages.querySelector(
    `[data-product-image="${button.dataset.productImage}"]`
  );
  const productThumbnailImage = productThumbnailImages.querySelector(
    `[data-product-image="${button.dataset.productImage}"]`
  );

  const lightboxActiveProductThumbnailImage =
    lightBoxThumbnaillImages.querySelector("[data-active]");
  const productImagesActiveProductThumbnailImage =
    productThumbnailImages.querySelector("[data-active]");

  const lightboxSlides = lightbox.querySelector("[data-slides]");
  const productImagesSlides = productImages.querySelector("[data-slides]");

  const activeLightboxSlide = lightboxSlides.querySelector("[data-active]");
  const activeProductImagesSlide =
    productImagesSlides.querySelector("[data-active]");

  if (
    (isLightbox && button !== lightboxActiveProductThumbnailImage) ||
    (!isLightbox && button !== productImagesActiveProductThumbnailImage)
  ) {
    button.dataset.active = true;
    lightboxSlide.dataset.active = true;
    productImageSlide.dataset.active = true;
    lightBoxThumbnaillImage.dataset.active = true;
    productThumbnailImage.dataset.active = true;

    delete activeLightboxSlide.dataset.active;
    delete activeProductImagesSlide.dataset.active;
    delete lightboxActiveProductThumbnailImage.dataset.active;
    delete productImagesActiveProductThumbnailImage.dataset.active;
  }
};

const handleLightbox = (event) => {
  const isActive = Object.keys(event.target.dataset).find(
    (key) => key === "active"
  );
  console.log(event.target, isActive);
  if (isActive) {
    const lightbox = document.querySelector(".lightbox");
    lightbox.dataset.active = true;

    const closeButton = lightbox.querySelector(".close-lightbox-button");
    closeButton.addEventListener("click", () => delete lightbox.dataset.active);
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

carouselItems.forEach((carouselItem) => {
  carouselItem.addEventListener("click", (event) => handleLightbox(event));
});

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
