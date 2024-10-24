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
  if (
    !event.target.classList.contains("cart-button") &&
    !event.target.classList.contains("cart-icon")
  )
    return;

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

const handleTrashButtonOnClick = ({ cartContent, cartItems, cartItem }) => {
  if (cartItems.children.length === 1) {
    cartContent.classList.add("empty");
    cartContent.innerHTML = `
        <p class="empty-cart-label">Your cart is empty</p>
      `;
  } else {
    cartItems.removeChild(cartItem);
  }
};

const handleAddToCart = () => {
  const quantityAmount = quantity.textContent;
  if (parseInt(quantityAmount) === 0) return;

  const cartContent = cart.querySelector(".cart-content");
  const productId = mainContent.dataset.productId;

  if (cartContent.classList.contains("empty")) {
    cartContent.classList.remove("empty");
    cartContent.innerHTML = "";

    const cartItems = document.createElement("ul");
    cartItems.classList.add("cart-items");

    const checkoutButton = document.createElement("button");
    checkoutButton.classList.add("checkout-button");
    checkoutButton.textContent = "Checkout";

    cartContent.appendChild(cartItems);
    cartContent.appendChild(checkoutButton);
  }

  const cartItems = cartContent.querySelector(".cart-items");
  const cartItem = document.createElement("li");
  cartItem.classList.add("cart-item");
  cartItem.dataset.productId = productId;

  if (cartItems.children.length >= 1) {
    const cartItemsList = [...cartItems.children];
    cartItemsList.forEach((cartItem) => {
      if (cartItem.dataset.productId === productId) {
        const cartItemPrice = cartItem.querySelector(
          ".cart-item-current-price"
        ).textContent;
        const cartItemQuantity = cartItem.querySelector(".cart-item-quantity");
        const cartItemTotalPrice = cartItem.querySelector(
          ".cart-item-total-price"
        );

        cartItemQuantity.textContent =
          parseInt(cartItemQuantity.textContent) + parseInt(quantityAmount);

        cartItemTotalPrice.textContent = parseFloat(
          parseFloat(cartItemPrice).toFixed(2) *
            parseInt(cartItemQuantity.textContent)
        ).toFixed(2);

        quantity.textContent = "0";
      }
    });

    return;
  }

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
    .textContent.trim()
    .split("$")[1];
  const totalPrice = parseFloat(
    parseFloat(currentPrice).toFixed(2) * parseInt(quantityAmount)
  ).toFixed(2);

  cartItem.innerHTML = `
    <img class="cart-item-image" src="${productThumbnailImage}" />
    <div class="cart-item-labels">
      <p class="cart-item-name">${productName}</p>
      <p class="cart-item-price">
        $<span class="cart-item-current-price">${currentPrice}</span> x <span class="cart-item-quantity">${quantityAmount}</span> $<span class="cart-item-total-price">${totalPrice}</span>
      </p>
    </div>
  `;

  const trashButton = document.createElement("button");
  trashButton.classList.add("trash-icon-button");
  trashButton.innerHTML = `
    <img class="trash-icon" src="images/icon-delete.svg" />
  `;

  trashButton.addEventListener("click", () =>
    handleTrashButtonOnClick({ cartContent, cartItems, cartItem })
  );

  cartItem.appendChild(trashButton);
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
addToCartButton.addEventListener("click", () => handleAddToCart());

media.addEventListener("change", handleResize);
