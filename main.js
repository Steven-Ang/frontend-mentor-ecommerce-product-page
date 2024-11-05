const topHeader = document.querySelector(".top-header");

const openMenuButton = document.getElementById("open-menu-button");
const closeMenuButton = document.getElementById("close-menu-button");
const navigationOverlay = document.getElementById("navigation-overlay");
const navigationContent = document.getElementById("navigation-content");

const userContainer = document.querySelector(".user-container");

const cart = document.getElementById("cart-button");
const cartBadge = document.querySelector(".cart-badge");

const mainContainer = document.querySelector(".main");
const mainContent = document.querySelector(".main-content");

const lightbox = document.querySelector("[data-lightbox]");
const productImages = document.querySelector("[data-product-images]");

const closeLightboxButton = lightbox.querySelector(".close-lightbox-button");

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

const updateBodyScroll = (mode) => {
  const body = document.querySelector("body");
  const bodyScrollLock = bodyScrollLockUpgrade;

  if (mode === "enable") bodyScrollLock.enableBodyScroll(body);
  if (mode === "disable") bodyScrollLock.disableBodyScroll(body);
};

const isActiveElement = (dataset) => {
  const isActive = Object.keys(dataset).find((key) => key === "active");
  return isActive;
};

const isLightbox = (target) => target.closest(".lightbox")?.dataset?.lightbox;

const convertToPrice = (price) => parseFloat(price).toFixed(2);

const openMenu = ({ elements }) => {
  const {
    openMenuButton,
    closeMenuButton,
    navigationContent,
    navigationOverlay,
    userContainer,
    mainContainer,
  } = elements;

  openMenuButton.setAttribute("aria-expanded", "true");
  openMenuButton.setAttribute("aria-hidden", "true");

  closeMenuButton.setAttribute("aria-hidden", "false");

  navigationContent.removeAttribute("style");
  navigationContent.removeAttribute("inert");

  navigationOverlay.removeAttribute("style");

  userContainer.setAttribute("inert", "");
  mainContainer.setAttribute("inert", "");

  updateBodyScroll("disable");

  closeMenuButton.removeAttribute("inert");
  closeMenuButton.focus();
};

const closeMenu = ({ elements }) => {
  const {
    openMenuButton,
    closeMenuButton,
    navigationContent,
    navigationOverlay,
    userContainer,
    mainContainer,
  } = elements;

  openMenuButton.setAttribute("aria-expanded", "false");
  openMenuButton.setAttribute("aria-hidden", "false");

  closeMenuButton.setAttribute("aria-hidden", "true");
  closeMenuButton.setAttribute("inert", "");

  setTimeout(() => {
    navigationContent.style.transition = "none";
    navigationOverlay.style.transition = "none";
  }, 350);

  navigationContent.setAttribute("inert", "");

  userContainer.removeAttribute("inert");
  mainContainer.removeAttribute("inert");

  updateBodyScroll("enable");

  openMenuButton.focus();
};

const toggleCart = ({ cart }) => {
  if (cart.dataset.active) delete cart.dataset.active;
  else cart.dataset.active = true;
};

const disableCart = ({ cart }) => {
  if (cart.dataset.active) delete cart.dataset.active;
};

const handleCart = ({ event, cart }) => {
  const isOutside =
    !event.target.classList.contains("cart-button") &&
    !event.target.classList.contains("cart-icon");
  if (isOutside) return;

  toggleCart({ cart });
};

const changeActiveProductImage = ({ currentActiveImage, newActiveImage }) => {
  delete currentActiveImage.dataset.active;
  newActiveImage.dataset.active = true;
};

const handleCarouselButton = ({ event, elements }) => {
  const { lightbox, productImages } = elements;

  const offset = event.target.dataset.carouselButton === "next" ? 1 : -1;

  const lightBoxThumbnaillImages = lightbox.querySelector(
    "[data-product-thumbnail-images]"
  );
  const productThumbnailImages = productImages.querySelector(
    "[data-product-thumbnail-images]"
  );

  const lightboxSlides = lightbox.querySelector("[data-slides]");
  const productImagesSlides = productImages.querySelector("[data-slides]");

  const filteredLightboxSlides = [...lightboxSlides.children].filter(
    (slide) => slide.nodeName === "LI"
  );

  const activeLightboxSlide = lightboxSlides.querySelector("[data-active]");
  const activeProductImagesSlide = productImages.querySelector("[data-active]");

  const lightboxActiveProductThumbnailImage =
    lightBoxThumbnaillImages.querySelector("[data-active]");
  const productImagesActiveProductThumbnailImage =
    productThumbnailImages.querySelector("[data-active]");

  let newIndex = null;
  const imagesSlides = isLightbox(event.target)
    ? filteredLightboxSlides
    : [...productImagesSlides.children];
  const activeSlide = isLightbox(event.target)
    ? activeLightboxSlide
    : activeProductImagesSlide;

  newIndex = imagesSlides.indexOf(activeSlide) + offset;
  if (newIndex < 0) newIndex = imagesSlides.length - 1;
  if (newIndex >= imagesSlides.length) newIndex = 0;

  changeActiveProductImage({
    currentActiveImage: activeLightboxSlide,
    newActiveImage: filteredLightboxSlides[newIndex],
  });
  changeActiveProductImage({
    currentActiveImage: activeProductImagesSlide,
    newActiveImage: productImagesSlides.children[newIndex],
  });

  changeActiveProductImage({
    currentActiveImage: lightboxActiveProductThumbnailImage,
    newActiveImage:
      lightBoxThumbnaillImages.children[newIndex].firstElementChild,
  });
  changeActiveProductImage({
    currentActiveImage: productImagesActiveProductThumbnailImage,
    newActiveImage: productThumbnailImages.children[newIndex].firstElementChild,
  });
};

const handleProductThumbnailImageButtonClick = ({ event, elements }) => {
  const { lightbox, productImages } = elements;

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

  const isDifferentImage =
    (isLightbox(event.target) &&
      button !== lightboxActiveProductThumbnailImage) ||
    (!isLightbox(event.target) &&
      button !== productImagesActiveProductThumbnailImage);

  if (isDifferentImage) {
    changeActiveProductImage({
      currentActiveImage: activeLightboxSlide,
      newActiveImage: lightboxSlide,
    });
    changeActiveProductImage({
      currentActiveImage: activeProductImagesSlide,
      newActiveImage: productImageSlide,
    });
    changeActiveProductImage({
      currentActiveImage: lightboxActiveProductThumbnailImage,
      newActiveImage: lightBoxThumbnaillImage,
    });
    changeActiveProductImage({
      currentActiveImage: productImagesActiveProductThumbnailImage,
      newActiveImage: productThumbnailImage,
    });
  }
};

const toggleLightbox = ({ lightbox }) => {
  if (lightbox.dataset.active) {
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.setAttribute("inert", "");
    delete lightbox.dataset.active;
  } else {
    lightbox.setAttribute("aria-hidden", "false");
    lightbox.removeAttribute("inert");
    lightbox.dataset.active = true;
  }
};

const handleLightboxCloseButtonClick = ({ event, lightbox }) => {
  toggleLightbox({ event, lightbox });

  topHeader.removeAttribute("inert");
  mainContainer.removeAttribute("inert");

  updateBodyScroll("enable");

  event.target.focus();
};

const handleLightbox = ({ event, elements }) => {
  const { lightbox, topHeader, mainContainer } = elements;

  const isActive = isActiveElement(event.target.dataset);
  if (!isActive) return;

  if (!isLightbox(event.target)) toggleLightbox({ event, lightbox });

  topHeader.setAttribute("inert", "");
  mainContainer.setAttribute("inert", "");

  updateBodyScroll("disable");
};

const updateProductQuantity = ({ quantity, quantityAmount }) => {
  quantity.textContent = quantityAmount;
};

const handleMinusButtonClick = (quantity) => {
  const quantityAmount = Number(quantity.textContent);
  if (quantityAmount > 0)
    updateProductQuantity({ quantity, quantityAmount: quantityAmount - 1 });
};

const handlePlusButtonClick = (quantity) => {
  const quantityAmount = Number(quantity.textContent);
  updateProductQuantity({ quantity, quantityAmount: quantityAmount + 1 });
};

const updateCartBadge = ({ mode, cartBadge, quantity }) => {
  if (mode === "plus")
    cartBadge.textContent =
      parseInt(cartBadge.textContent) + parseInt(quantity);
  if (mode === "minus")
    cartBadge.textContent =
      parseInt(cartBadge.textContent) - parseInt(quantity);
  if (mode === "replace") cartBadge.textContent = quantity;
};

const clearCart = ({ cartContent, cartBadge }) => {
  cartContent.classList.add("empty");
  cartContent.innerHTML = `
        <p class="empty-cart-label">Your cart is empty</p>
      `;
  cartBadge.textContent = "";
};

const removeCartItem = ({ cartItems, cartItem, cartBadge, quantity }) => {
  updateCartBadge({ mode: "plus", cartBadge, quantity });
  cartItems.removeChild(cartItem);
};

const handleTrashButtonOnClick = ({
  cartContent,
  cartItems,
  cartItem,
  cartBadge,
}) => {
  if (cartItems.children.length === 1) {
    clearCart({ cartContent, cartBadge });
    return;
  }

  const cartItemQuantity = cartItem.querySelector(
    ".cart-item-quantity"
  ).textContent;
  removeCartItem({
    cartItems,
    cartItem,
    cartBadge,
    quantity: cartItemQuantity,
  });
};

const createCartItems = () => {
  const cartItems = document.createElement("ul");
  cartItems.classList.add("cart-items");
  return cartItems;
};

const createCartItem = ({
  productId,
  productThumbnailImage,
  productName,
  currentPrice,
  quantityAmount,
  totalPrice,
}) => {
  const cartItem = document.createElement("li");
  cartItem.classList.add("cart-item");
  cartItem.dataset.productId = productId;

  cartItem.innerHTML = `
    <img class="cart-item-image" src="${productThumbnailImage}" />
    <div class="cart-item-labels">
      <p class="cart-item-name">${productName}</p>
      <p class="cart-item-price">
        $<span class="cart-item-current-price">${currentPrice}</span> x <span class="cart-item-quantity">${quantityAmount}</span> $<span class="cart-item-total-price">${totalPrice}</span>
      </p>
    </div>
  `;

  return cartItem;
};

const updateCartItem = ({ cartItem, quantity, quantityAmount }) => {
  const cartItemPrice = cartItem.querySelector(
    ".cart-item-current-price"
  ).textContent;
  const cartItemQuantity = cartItem.querySelector(".cart-item-quantity");
  const cartItemTotalPrice = cartItem.querySelector(".cart-item-total-price");

  cartItemQuantity.textContent =
    parseInt(cartItemQuantity.textContent) + parseInt(quantityAmount);

  cartItemTotalPrice.textContent = convertToPrice(
    convertToPrice(cartItemPrice) * parseInt(cartItemQuantity.textContent)
  );

  updateCartBadge({ mode: "plus", cartBadge, quantity: quantityAmount });

  updateProductQuantity({ quantity, quantityAmount: "0" });
};

const createTrashIcon = ({
  cartContent,
  cartItems,
  cartItem,
  cartBadge,
  handleTrashButtonOnClick,
}) => {
  const trashButton = document.createElement("button");
  trashButton.classList.add("trash-icon-button");
  trashButton.innerHTML = `
    <img class="trash-icon" src="images/icon-delete.svg" />
  `;

  trashButton.addEventListener("click", () =>
    handleTrashButtonOnClick({ cartContent, cartItems, cartItem, cartBadge })
  );

  return trashButton;
};

const createCheckButton = () => {
  const checkoutButton = document.createElement("button");
  checkoutButton.classList.add("checkout-button");
  checkoutButton.textContent = "Checkout";
  return checkoutButton;
};

const handleAddToCart = () => {
  const quantityAmount = quantity.textContent;
  if (parseInt(quantityAmount) === 0) return;

  const cartContent = cart.querySelector(".cart-content");
  const productId = mainContent.dataset.productId;

  const isCartContentEmpty = cartContent.classList.contains("empty");

  if (isCartContentEmpty) {
    cartContent.classList.remove("empty");
    cartContent.innerHTML = "";

    const cartItems = createCartItems();
    const checkoutButton = createCheckButton();

    cartContent.appendChild(cartItems);
    cartContent.appendChild(checkoutButton);
  }

  const cartItems = cartContent.querySelector(".cart-items");

  if (cartItems.children.length >= 1) {
    const cartItemsList = [...cartItems.children];
    cartItemsList.forEach((cartItem) => {
      if (cartItem.dataset.productId === productId)
        updateCartItem({ cartItem, quantity, quantityAmount });
    });
    return;
  }

  const productThumbnailImage = productImages
    .querySelector(".product-thumbnail-image-button")
    .querySelector(".product-thumbnail-image").src;
  const productName = mainContent
    .querySelector(".product-name")
    .textContent.trim();
  const currentPrice = convertToPrice(
    mainContent.querySelector(".current-price").textContent.trim().split("$")[1]
  );
  const totalPrice = convertToPrice(currentPrice * parseInt(quantityAmount));

  const cartItem = createCartItem({
    productId,
    productThumbnailImage,
    productName,
    currentPrice,
    quantityAmount,
    totalPrice,
  });

  const trashButton = createTrashIcon({
    cartContent,
    cartItems,
    cartItem,
    cartBadge,
    handleTrashButtonOnClick,
  });

  cartItem.appendChild(trashButton);
  cartItems.appendChild(cartItem);

  if (cartItems.children.length > 1)
    updateCartBadge({ mode: "plus", cartBadge, quantity: quantityAmount });
  else
    updateCartBadge({ mode: "replace", cartBadge, quantity: quantityAmount });

  updateProductQuantity({ quantity, quantityAmount: "0" });
};

const handleResize = (event) => {
  if (event.matches) {
    openMenuButton.setAttribute("aria-expanded", "false");
    navigationContent.setAttribute("inert", "");
    navigationContent.style.transition = "none";
    navigationOverlay.style.transition = "none";

    lightbox.setAttribute("inert", "");
    lightbox.setAttribute("aria-hidden", "true");
    delete lightbox.dataset.active;
  } else {
    topHeader.removeAttribute("inert");
    navigationContent.removeAttribute("inert");
    openMenuButton.setAttribute("aria-expanded", "false");
    closeMenuButton.setAttribute("inert", "");
    closeMenuButton.setAttribute("aria-hidden", "true");
    mainContainer.removeAttribute("inert");
  }
};

const handleWindowOnScroll = ({ cart }) => disableCart({ cart });

const handleWindowOnLoad = () => {
  if (media.matches) navigationContent.setAttribute("inert", "");
  else navigationContent.removeAttribute("inert");
};

openMenuButton.addEventListener("click", () =>
  openMenu({
    elements: {
      openMenuButton,
      closeMenuButton,
      navigationContent,
      navigationOverlay,
      userContainer,
      mainContainer,
    },
  })
);
closeMenuButton.addEventListener("click", () =>
  closeMenu({
    elements: {
      openMenuButton,
      closeMenuButton,
      navigationContent,
      navigationOverlay,
      userContainer,
      mainContainer,
    },
  })
);

cart.addEventListener("click", (event) => handleCart({ event, cart }));

carouselButtons.forEach((carouselButton) =>
  carouselButton.addEventListener("click", (event) =>
    handleCarouselButton({ event, elements: { lightbox, productImages } })
  )
);

carouselItems.forEach((carouselItem) => {
  carouselItem.addEventListener("click", (event) =>
    handleLightbox({ event, elements: { lightbox, topHeader, mainContainer } })
  );
});

closeLightboxButton.addEventListener("click", (event) =>
  handleLightboxCloseButtonClick({ event, lightbox })
);

productThumbnailImageButtons.forEach((productThumbnailImageButton) => {
  productThumbnailImageButton.addEventListener("click", (event) =>
    handleProductThumbnailImageButtonClick({
      event,
      elements: { lightbox, productImages },
    })
  );
});

minusQuantityButton.addEventListener("click", () =>
  handleMinusButtonClick(quantity)
);
plusQuantityButton.addEventListener("click", () =>
  handlePlusButtonClick(quantity)
);
addToCartButton.addEventListener("click", () => handleAddToCart());

window.addEventListener("scroll", () => handleWindowOnScroll({ cart }));
window.addEventListener("load", handleWindowOnLoad);

media.addEventListener("change", handleResize);
