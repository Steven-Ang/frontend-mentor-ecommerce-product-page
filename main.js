const topHeader = document.querySelector(".top-header");

const openMenuButton = document.getElementById("open-menu-button");
const closeMenuButton = document.getElementById("close-menu-button");
const navigationOverlay = document.getElementById("navigation-overlay");
const navigationContent = document.getElementById("navigation-content");

const userContainer = document.querySelector(".user-container");

const cart = document.getElementById("cart-button");
const cartBadge = document.querySelector(".cart-badge");
const cartIcon = document.querySelector(".cart-icon");

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

const toggleCart = ({ cart, cartBadge, cartIcon }) => {
  const cartContent = cart.querySelector(".cart");

  if (cart.dataset.active) {
    cart.setAttribute("aria-expanded", "false");
    delete cart.dataset.active;

    cartContent.setAttribute("inert", "");
    cartContent.setAttribute("aria-hidden", "true");

    if (!isCartBadgeEmpty(cartBadge))
      updateCartIcon({ mode: "active", cartIcon });
    if (isCartBadgeEmpty(cartBadge))
      updateCartIcon({ mode: "inactive", cartIcon });
  } else {
    cart.setAttribute("aria-expanded", "true");
    cart.dataset.active = true;

    cartContent.removeAttribute("inert");
    cartContent.setAttribute("aria-hidden", "false");

    updateCartIcon({ mode: "active", cartIcon });
  }
};

const handleCart = ({ event, cart, cartBadge, cartIcon }) => {
  const isOutside =
    !event.target.classList.contains("cart-button") &&
    !event.target.classList.contains("cart-icon") &&
    !event.target.classList.contains("cart-icon-path") &&
    !event.target.classList.contains("cart-badge");
  if (isOutside) return;

  toggleCart({ cart, cartBadge, cartIcon });
};

const changeActiveProductImage = ({ currentActiveImage, newActiveImage }) => {
  delete currentActiveImage.dataset.active;
  newActiveImage.dataset.active = true;
};

const changeThumbnailsImages = ({ elements }) => {
  const {
    currentLightboxActiveImage,
    newLightboxActiveImage,
    currentProductImagesActiveImage,
    newProductImagesActiveImage,
  } = elements;

  changeActiveProductImage({
    currentActiveImage: currentLightboxActiveImage,
    newActiveImage: newLightboxActiveImage,
  });
  changeActiveProductImage({
    currentActiveImage: currentProductImagesActiveImage,
    newActiveImage: newProductImagesActiveImage,
  });
};

const changeCarouselSlide = ({ elements }) => {
  const {
    button,
    lightboxSlides,
    productImagesSlides,
    activeLightboxSlide,
    activeProductImagesSlide,
    lightboxActiveProductThumbnailImage,
    lightBoxThumbnaillImages,
    productImagesActiveProductThumbnailImage,
    productThumbnailImages,
  } = elements;

  const isCarouselButton = button.dataset.carouselButton;
  const isThumbnailButton = button.dataset.productImage;

  let offset = null;
  if (isCarouselButton)
    offset = button.dataset.carouselButton === "next" ? 1 : -1;

  let newIndex = null;
  const imagesSlides = isLightbox(button)
    ? lightboxSlides
    : [...productImagesSlides.children];
  const activeSlide = isLightbox(button)
    ? activeLightboxSlide
    : activeProductImagesSlide;

  let newActiveLightboxSlide = null;
  let newActiveProductImagesSlide = null;
  let newLightboxActiveThumbnailImage = null;
  let newProductImagesActiveThumbnailImage = null;

  if (isCarouselButton) {
    newIndex = imagesSlides.indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = imagesSlides.length - 1;
    if (newIndex >= imagesSlides.length) newIndex = 0;

    newActiveLightboxSlide = lightboxSlides[newIndex];
    newActiveProductImagesSlide = productImagesSlides.children[newIndex];
    newLightboxActiveThumbnailImage =
      lightBoxThumbnaillImages.children[newIndex].firstElementChild;
    newProductImagesActiveThumbnailImage =
      productThumbnailImages.children[newIndex].firstElementChild;
  }

  if (isThumbnailButton) {
    newActiveLightboxSlide = lightboxSlides.find(
      (slide) => slide.dataset.productImage === button.dataset.productImage
    );
    newActiveProductImagesSlide = productImages.querySelector(
      `[data-product-image="${button.dataset.productImage}"]`
    );
    newLightboxActiveThumbnailImage = lightBoxThumbnaillImages.querySelector(
      `[data-product-image="${button.dataset.productImage}"]`
    );
    newProductImagesActiveThumbnailImage = productThumbnailImages.querySelector(
      `[data-product-image="${button.dataset.productImage}"]`
    );
  }

  changeActiveProductImage({
    currentActiveImage: activeLightboxSlide,
    newActiveImage: newActiveLightboxSlide,
  });
  changeActiveProductImage({
    currentActiveImage: activeProductImagesSlide,
    newActiveImage: newActiveProductImagesSlide,
  });

  changeThumbnailsImages({
    elements: {
      currentLightboxActiveImage: lightboxActiveProductThumbnailImage,
      newLightboxActiveImage: newLightboxActiveThumbnailImage,
      currentProductImagesActiveImage: productImagesActiveProductThumbnailImage,
      newProductImagesActiveImage: newProductImagesActiveThumbnailImage,
    },
  });
};

const handleCarousel = ({ event, elements }) => {
  const { lightbox, productImages } = elements;

  const lightBoxThumbnaillImages = lightbox.querySelector(
    "[data-product-thumbnail-images]"
  );
  const productThumbnailImages = productImages.querySelector(
    "[data-product-thumbnail-images]"
  );

  const lightboxSlides = lightbox.querySelector("[data-slides]");
  const productImagesSlides = productImages.querySelector("[data-slides]");

  const filteredLightboxSlides = [...lightboxSlides.children].filter(
    (slide) => slide.classList.contains("carousel-item")
  );

  const activeLightboxSlide = lightboxSlides.querySelector("[data-active]");
  const activeProductImagesSlide = productImages.querySelector("[data-active]");

  const lightboxActiveProductThumbnailImage =
    lightBoxThumbnaillImages.querySelector("[data-active]");
  const productImagesActiveProductThumbnailImage =
    productThumbnailImages.querySelector("[data-active]");

  changeCarouselSlide({
    elements: {
      button: event.target,
      lightboxSlides: filteredLightboxSlides,
      productImagesSlides,
      activeLightboxSlide,
      activeProductImagesSlide,
      lightboxActiveProductThumbnailImage,
      lightBoxThumbnaillImages,
      productImagesActiveProductThumbnailImage,
      productThumbnailImages,
    },
  });
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

const updateCartIcon = ({ mode, cartIcon }) => {
  if (mode === "active") cartIcon.dataset.active = true;
  if (mode === "inactive") delete cartIcon.dataset.active;
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

const isCartBadgeEmpty = (cartBadge) =>
  parseInt(cartBadge.textContent) < 1 || cartBadge.textContent === "";

const updateCartBadge = ({ mode, cartBadge, cartIcon, quantity }) => {
  if (mode === "plus")
    cartBadge.textContent =
      parseInt(cartBadge.textContent) + parseInt(quantity);
  if (mode === "minus")
    cartBadge.textContent =
      parseInt(cartBadge.textContent) - parseInt(quantity);
  if (mode === "replace") cartBadge.textContent = quantity;

  if (!isCartBadgeEmpty(cartBadge))
    updateCartIcon({ mode: "active", cartIcon });
};

const clearCart = ({ cart, cartContent, cartIcon, cartBadge }) => {
  cartContent.classList.add("empty");
  cartContent.innerHTML = `
        <p class="empty-cart-label">Your cart is empty</p>
      `;
  cartBadge.textContent = "";
  if (!cart.dataset.active) updateCartIcon({ mode: "inactive", cartIcon });
};

const removeCartItem = ({
  cartItems,
  cartItem,
  cartBadge,
  cartIcon,
  quantity,
}) => {
  updateCartBadge({ mode: "plus", cartBadge, cartIcon, quantity });
  cartItems.removeChild(cartItem);
};

const handleTrashButtonOnClick = ({
  cart,
  cartContent,
  cartItems,
  cartItem,
  cartBadge,
  cartIcon,
}) => {
  if (cartItems.children.length === 1) {
    clearCart({ cart, cartContent, cartBadge, cartIcon });
    return;
  }

  const cartItemQuantity = cartItem.querySelector(
    ".cart-item-quantity"
  ).textContent;
  removeCartItem({
    cartItems,
    cartItem,
    cartBadge,
    cartIcon,
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
    <div class="cart-item-content">
      <img class="cart-item-image" src="${productThumbnailImage}" />
      <div class="cart-item-labels">
        <p class="cart-item-name">${productName}</p>
        <p class="cart-item-price">
          $<span class="cart-item-current-price">${currentPrice}</span> x <span class="cart-item-quantity">${quantityAmount}</span> <span class="bold">$</span><span class="cart-item-total-price">${totalPrice}</span>
        </p>
      </div>
    </div>
  `;

  return cartItem;
};

const updateCartItem = ({ cartItem, cartIcon, quantity, quantityAmount }) => {
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

  updateCartBadge({
    mode: "plus",
    cartBadge,
    cartIcon,
    quantity: quantityAmount,
  });

  updateProductQuantity({ quantity, quantityAmount: "0" });
};

const createTrashIcon = ({
  cart,
  cartContent,
  cartItems,
  cartItem,
  cartBadge,
  cartIcon,
  handleTrashButtonOnClick,
}) => {
  const trashButton = document.createElement("button");
  trashButton.classList.add("trash-icon-button");
  trashButton.innerHTML = `
  <img class="trash-icon" src="images/icon-delete.svg" />
  `;

  trashButton.addEventListener("click", () =>
    handleTrashButtonOnClick({
      cart,
      cartContent,
      cartItems,
      cartItem,
      cartBadge,
      cartIcon,
    })
  );

  return trashButton;
};

const createCheckButton = () => {
  const checkoutButton = document.createElement("button");
  checkoutButton.classList.add("checkout-button");
  checkoutButton.textContent = "Checkout";
  return checkoutButton;
};

const handleAddToCart = ({ elements }) => {
  const { cart, cartIcon, mainContent, productImages, quantity } = elements;

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
        updateCartItem({ cartItem, cartIcon, quantity, quantityAmount });
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
    cart,
    cartContent,
    cartItems,
    cartItem,
    cartBadge,
    cartIcon,
    handleTrashButtonOnClick,
  });

  cartItem.appendChild(trashButton);
  cartItems.appendChild(cartItem);

  if (cartItems.children.length > 1)
    updateCartBadge({
      mode: "plus",
      cartBadge,
      cartIcon,
      quantity: quantityAmount,
    });
  else
    updateCartBadge({
      mode: "replace",
      cartBadge,
      cartIcon,
      quantity: quantityAmount,
    });

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

const handleWindowOnLoad = ({ elements }) => {
  const { lightbox, cart, navigationContent, navigationOverlay } = elements;

  const cartContent = cart.querySelector(".cart");

  lightbox.setAttribute("inert", "");
  cartContent.setAttribute("inert", "");

  if (media.matches) {
    navigationContent.setAttribute("inert", "");

    setTimeout(() => {
      navigationContent.style.transition = "none";
      navigationOverlay.style.transition = "none";
    }, 350);
  } else navigationContent.removeAttribute("inert");
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

cart.addEventListener("click", (event) =>
  handleCart({ event, cart, cartBadge, cartIcon })
);

carouselButtons.forEach((carouselButton) =>
  carouselButton.addEventListener("click", (event) =>
    handleCarousel({ event, elements: { lightbox, productImages } })
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
    handleCarousel({
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
addToCartButton.addEventListener("click", () =>
  handleAddToCart({
    elements: { cart, cartIcon, mainContent, productImages, quantity },
  })
);

window.addEventListener("load", () =>
  handleWindowOnLoad({
    elements: { cart, lightbox, navigationContent, navigationOverlay },
  })
);

media.addEventListener("change", handleResize);
