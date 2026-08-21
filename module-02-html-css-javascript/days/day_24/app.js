// ==============================
// ADDIS EATS
// ==============================

// ==============================
// CONSTANTS
// ==============================

const MENU_URL = "data/menu.json";

const PHONE_REGEX = /^(09\d{8}|\+2519\d{8})$/;

const state = {
  menu: [],
  search: "",
  category: "All",
  cart: [],
};

// ==============================
// DOM ELEMENTS
// ==============================

const menuContainer = document.querySelector("#menu-container");

const cartContainer = document.querySelector("#cart-container");

const cartCount = document.querySelector("#cart-count");

const cartTotal = document.querySelector("#cart-total");

const searchInput = document.querySelector("#search");

const categorySelect = document.querySelector("#category");

const clearCartButton = document.querySelector("#clear-cart");

const checkoutForm = document.querySelector("#checkout-form");

const nameInput = document.querySelector("#name");

const phoneInput = document.querySelector("#phone");

const nameError = document.querySelector("#name-error");

const phoneError = document.querySelector("#phone-error");

const checkoutError = document.querySelector("#checkout-error");

const confirmation = document.querySelector("#confirmation");

// ==============================
// LOAD MENU
// ==============================

async function loadMenu() {
  try {
    const response = await fetch(MENU_URL);

    if (!response.ok) {
      throw new Error("Unable to load menu");
    }

    const menuData = await response.json();

    if (!Array.isArray(menuData)) {
      throw new Error("Invalid menu data");
    }

    state.menu = menuData;

    render();
  } catch (error) {
    console.error(error);

    menuContainer.innerHTML = `
      <p class="no-results">
        ❌ Sorry, we could not load the menu.
      </p>
    `;
  }
}

// ==============================
// GET FILTERED MENU
// ==============================

function getFilteredMenu() {
  const searchTerm = state.search.toLowerCase().trim();

  return state.menu.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm);

    const matchesCategory =
      state.category === "All" || item.category === state.category;

    return matchesSearch && matchesCategory;
  });
}

// ==============================
// MAIN RENDER
// ==============================

function render() {
  renderMenu();

  renderCart();
}

// ==============================
// RENDER MENU
// ==============================

function renderMenu() {
  if (!menuContainer) return;

  const filteredMenu = getFilteredMenu();

  if (filteredMenu.length === 0) {
    menuContainer.innerHTML = `
      <p class="no-results">
        😢 No food found.
      </p>
    `;

    return;
  }

  menuContainer.innerHTML = filteredMenu.map(createFoodCard).join("");
}

// ==============================
// CREATE FOOD CARD
// ==============================

function createFoodCard(item) {
  return `
    <article class="food-card">

      <img
        src="${item.image}"
        alt="${item.name}"
      >

      <div class="food-info">

        <h3>${item.name}</h3>

        <p>${item.category}</p>

        <p class="price">
          ${item.price} ETB
        </p>

        <button
          class="add-btn"
          data-id="${item.id}"
        >
          Add to Cart 🛒
        </button>

      </div>

    </article>
  `;
}

// ==============================
// ADD TO CART
// ==============================

function addToCart(id) {
  if (!id) return;

  const food = state.menu.find((item) => item.id === id);

  if (!food) return;

  const existingItem = state.cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cart.push({
      ...food,
      quantity: 1,
    });
  }

  renderCart();
}

// ==============================
// REMOVE FROM CART
// ==============================

function removeFromCart(id) {
  if (!id) return;

  state.cart = state.cart.filter((item) => item.id !== id);

  renderCart();
}

// ==============================
// RENDER CART
// ==============================

function renderCart() {
  if (!cartContainer) return;

  if (state.cart.length === 0) {
    cartContainer.innerHTML = `
      <p class="empty-cart">
        Your cart is empty 💗
      </p>
    `;

    cartCount.textContent = "0";
    cartTotal.textContent = "0";

    return;
  }

  cartContainer.innerHTML = state.cart.map(createCartItem).join("");

  const total = calculateCartTotal();

  const itemCount = calculateCartCount();

  cartTotal.textContent = total;

  cartCount.textContent = itemCount;
}

// ==============================
// CREATE CART ITEM
// ==============================

function createCartItem(item) {
  return `
    <div class="cart-item">

      <div>
        <h3>${item.name}</h3>

        <p>
          ${item.quantity} ×
          ${item.price} ETB
        </p>
      </div>

      <strong>
        ${item.quantity * item.price} ETB
      </strong>

      <button
        class="remove-btn"
        data-remove="${item.id}"
      >
        Remove
      </button>

    </div>
  `;
}

// ==============================
// CART TOTAL
// ==============================

function calculateCartTotal() {
  return state.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
}

// ==============================
// CART COUNT
// ==============================

function calculateCartCount() {
  return state.cart.reduce((count, item) => count + item.quantity, 0);
}

// ==============================
// CLEAR CART
// ==============================

function clearCart() {
  state.cart = [];

  renderCart();
}

// ==============================
// VALIDATE NAME
// ==============================

function validateName() {
  const name = nameInput.value.trim();

  if (name.length < 2) {
    nameError.textContent = "Please enter your full name.";

    nameInput.classList.add("invalid");

    return false;
  }

  nameError.textContent = "";

  nameInput.classList.remove("invalid");

  return true;
}

// ==============================
// VALIDATE PHONE
// ==============================

function validatePhone() {
  const phone = phoneInput.value.trim();

  if (!PHONE_REGEX.test(phone)) {
    phoneError.textContent = "Enter a valid Ethiopian phone number.";

    phoneInput.classList.add("invalid");

    return false;
  }

  phoneError.textContent = "";

  phoneInput.classList.remove("invalid");

  return true;
}

// ==============================
// VALIDATE CART
// ==============================

function validateCart() {
  if (state.cart.length === 0) {
    checkoutError.textContent = "Your cart is empty. Please add an item first.";

    checkoutError.classList.add("show");

    return false;
  }

  checkoutError.textContent = "";

  checkoutError.classList.remove("show");

  return true;
}

// ==============================
// VALIDATE CHECKOUT
// ==============================

function validateCheckout() {
  const validName = validateName();

  const validPhone = validatePhone();

  const validCart = validateCart();

  return validName && validPhone && validCart;
}

// ==============================
// PLACE ORDER
// ==============================

function placeOrder() {
  if (!validateCheckout()) {
    return;
  }

  const customerName = nameInput.value.trim();

  const total = calculateCartTotal();

  confirmation.innerHTML = `
    <h3>🎉 Order Confirmed!</h3>

    <p>
      Thank you, ${customerName}!
    </p>

    <p>
      Your order has been received.
    </p>

    <strong>
      Total: ${total} ETB
    </strong>
  `;

  confirmation.classList.remove("hidden");

  state.cart = [];

  renderCart();

  checkoutForm.reset();

  confirmation.scrollIntoView({
    behavior: "smooth",
  });
}

// ==============================
// SEARCH EVENT
// ==============================

searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;

  renderMenu();
});

// ==============================
// CATEGORY EVENT
// ==============================

categorySelect.addEventListener("change", (event) => {
  state.category = event.target.value;

  renderMenu();
});

// ==============================
// CART BUTTON EVENTS
// ==============================

document.addEventListener("click", (event) => {
  const addButton = event.target.closest(".add-btn");

  if (addButton) {
    const id = Number(addButton.dataset.id);

    addToCart(id);

    return;
  }

  const removeButton = event.target.closest(".remove-btn");

  if (removeButton) {
    const id = Number(removeButton.dataset.remove);

    removeFromCart(id);
  }
});

// ==============================
// CLEAR CART EVENT
// ==============================

clearCartButton.addEventListener("click", clearCart);

// ==============================
// CHECKOUT EVENT
// ==============================

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();

  placeOrder();
});

// ==============================
// LIVE VALIDATION
// ==============================

nameInput.addEventListener("input", validateName);

phoneInput.addEventListener("input", validatePhone);

// ==============================
// START APP
// ==============================

loadMenu();
