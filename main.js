const openMenuButton = document.getElementById("open-menu-button");
const closeMenuButton = document.getElementById("close-menu-button");
const navigationOverlay = document.getElementById("navigation-overlay");
const navigationContent = document.getElementById("navigation-content");

const cart = document.getElementById("cart-button");

const mainContent = document.querySelector(".main-content");

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
const addToCartButton = document.getElementById("add-to-cart-button");

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

const handleCart = (event) => {
  if (cart.dataset.active) {
    delete cart.dataset.active;
  } else {
    cart.dataset.active = true;
  }
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

const handleAddToCart = (event) => {
  const quantityAmount = quantity.textContent;
  if (parseInt(quantityAmount) === 0) return;

  const cartItems = cart.querySelector(".cart-items");

  const cartItem = document.createElement("li");
  cartItem.classList.add("cart-item");

  if (cartItems.classList.contains("empty")) {
    cartItems.classList.remove("empty");
    cartItems.textContent = "";
  }

  const productThumbnailImage = productImages
    .querySelector(".product-thumbnail-image-button")
    .querySelector(".product-thumbnail-image").src;
  const productName = mainContent
    .querySelector(".product-name")
    .textContent.trim();
  const currentPrice = mainContent
    .querySelector(".current-price")
    .textContent.trim();
  const totalPrice = parseFloat(
    parseFloat(currentPrice.split("$").join("")).toFixed(2) *
      parseInt(quantityAmount)
  ).toFixed(2);

  cartItem.innerHTML = `
    <img class="cart-item-image" src="${productThumbnailImage}" />
    <div class="cart-item-labels">
      <p class="cart-item-name">${productName}</p>
      <p class="cart-item-price">
        ${currentPrice} x ${quantityAmount} <span class="cart-item-total-price">$${totalPrice}</span>
      </p>
    </div>
    <button class="trash-icon-button">
      <img class="trash-icon" src="images/icon-delete.svg" />
    </button>
  `;

  cartItems.appendChild(cartItem);
  quantity.textContent = "0";
};

const handleResize = (event) => {
  if (event.matches) {
    openMenuButton.setAttribute("aria-expanded", "false");
    navigationContent.style.transition = "none";
    navigationOverlay.style.transition = "none";
    delete lightbox.dataset.active;
  }
};

openMenuButton.addEventListener("click", openMenu);
closeMenuButton.addEventListener("click", closeMenu);

cart.addEventListener("click", handleCart);

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
addToCartButton.addEventListener("click", (event) => handleAddToCart(event));

media.addEventListener("change", handleResize);
