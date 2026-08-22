// =====================================================
// ADDIS EATS
// =====================================================

// =====================================================
// CONSTANTS
// =====================================================

const MENU_URL = "data/menu.json";

const PHONE_REGEX = /^(09\d{8}|\+2519\d{8})$/;

// =====================================================
// LOCAL STORAGE
// =====================================================

const savedCart = localStorage.getItem("addisEatsCart");

const state = {
  menu: [],
  search: "",
  category: "All",
  cart: savedCart ? JSON.parse(savedCart) : [],
};

// =====================================================
// DOM ELEMENTS
// =====================================================

const menuContainer = document.querySelector("#menu-container");
const cartContainer = document.querySelector("#cart-container");
const cartCount = document.querySelector("#cart-count");
const sidebarCount = document.querySelector("#sidebar-count");
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

// =====================================================
// SAVE CART
// =====================================================

function saveCart() {
  localStorage.setItem("addisEatsCart", JSON.stringify(state.cart));
}

// =====================================================
// LOAD MENU
// =====================================================

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

// =====================================================
// FILTER MENU
// =====================================================

function getFilteredMenu() {
  const searchTerm = state.search.toLowerCase().trim();

  return state.menu.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm);

    const matchesCategory =
      state.category === "All" || item.category === state.category;

    return matchesSearch && matchesCategory;
  });
}

// =====================================================
// MAIN RENDER
// =====================================================

function render() {
  renderMenu();
  renderCart();
}

// =====================================================
// RENDER MENU
// =====================================================

function renderMenu() {
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

// =====================================================
// FOOD CARD
// =====================================================

function createFoodCard(item) {
  return `
    <article class="food-card">

      <img
        src="${item.image}"
        alt="${item.name}"
        loading="lazy"
      >

      <div class="food-info">

        <h3>
          ${item.name}
        </h3>

        <p>
          ${item.category}
        </p>

        <p class="price">
          ${item.price} ETB
        </p>

        <button
          type="button"
          class="add-btn"
          data-id="${item.id}"
        >
          🛒 Add to Cart
        </button>

      </div>

    </article>
  `;
}

// =====================================================
// ADD TO CART
// =====================================================

function addToCart(id) {
  if (!id) return;

  const food = state.menu.find((item) => Number(item.id) === Number(id));

  if (!food) return;

  const existingItem = state.cart.find(
    (item) => Number(item.id) === Number(id),
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cart.push({
      ...food,
      quantity: 1,
    });
  }

  // SAVE CART TO LOCAL STORAGE
  saveCart();

  renderCart();
}

// =====================================================
// REMOVE FROM CART
// =====================================================

function removeFromCart(id) {
  if (!id) return;

  state.cart = state.cart.filter((item) => Number(item.id) !== Number(id));

  // SAVE UPDATED CART
  saveCart();

  renderCart();
}

// =====================================================
// RENDER CART
// =====================================================

function renderCart() {
  if (state.cart.length === 0) {
    cartContainer.innerHTML = `
      <p class="empty-cart">
        No items added yet.
      </p>
    `;

    cartCount.textContent = "0";
    sidebarCount.textContent = "0";
    cartTotal.textContent = "0";

    return;
  }

  cartContainer.innerHTML = state.cart.map(createCartItem).join("");

  const total = calculateCartTotal();
  const count = calculateCartCount();

  cartTotal.textContent = total;
  cartCount.textContent = count;
  sidebarCount.textContent = count;
}

// =====================================================
// CREATE CART ITEM
// =====================================================

function createCartItem(item) {
  return `
    <div class="cart-item">

      <img
        src="${item.image}"
        alt="${item.name}"
      >

      <div>

        <h3>
          ${item.name}
        </h3>

        <p>
          ${item.price} ETB ×
          ${item.quantity}
        </p>

      </div>

      <div>

        <strong>
          ${item.price * item.quantity}
          ETB
        </strong>

        <button
          type="button"
          class="remove-btn"
          data-remove="${item.id}"
          aria-label="Remove ${item.name}"
        >
          ×
        </button>

      </div>

    </div>
  `;
}

// =====================================================
// CART TOTAL
// =====================================================

function calculateCartTotal() {
  return state.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
}

// =====================================================
// CART COUNT
// =====================================================

function calculateCartCount() {
  return state.cart.reduce((count, item) => count + item.quantity, 0);
}

// =====================================================
// CLEAR CART
// =====================================================

function clearCart() {
  state.cart = [];

  // REMOVE CART FROM LOCAL STORAGE
  localStorage.removeItem("addisEatsCart");

  renderCart();
}

// =====================================================
// VALIDATE NAME
// =====================================================

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

// =====================================================
// VALIDATE PHONE
// =====================================================

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

// =====================================================
// VALIDATE CART
// =====================================================

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

// =====================================================
// VALIDATE CHECKOUT
// =====================================================

function validateCheckout() {
  const validName = validateName();
  const validPhone = validatePhone();
  const validCart = validateCart();

  return validName && validPhone && validCart;
}

// =====================================================
// PLACE ORDER
// =====================================================

function placeOrder() {
  if (!validateCheckout()) {
    return;
  }

  const customerName = nameInput.value.trim();

  const total = calculateCartTotal();

  confirmation.innerHTML = `
    <h3>
      🎉 Order Confirmed!
    </h3>

    <p>
      Thank you,
      <strong>${customerName}</strong>!
    </p>

    <p>
      We'll contact you to confirm your order.
    </p>

    <strong>
      Total:
      ${total} ETB
    </strong>
  `;

  confirmation.classList.remove("hidden");

  // CLEAR CART AFTER ORDER
  state.cart = [];

  localStorage.removeItem("addisEatsCart");

  renderCart();

  checkoutForm.reset();

  confirmation.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

// =====================================================
// SEARCH
// =====================================================

searchInput.addEventListener("input", (event) => {
  state.search = event.target.value;

  renderMenu();
});

// =====================================================
// CATEGORY FILTER
// =====================================================

categorySelect.addEventListener("change", (event) => {
  state.category = event.target.value;

  renderMenu();
});

// =====================================================
// CART EVENTS
// =====================================================

document.addEventListener("click", (event) => {
  // ADD TO CART
  const addButton = event.target.closest(".add-btn");

  if (addButton) {
    const id = Number(addButton.dataset.id);

    addToCart(id);

    return;
  }

  // REMOVE FROM CART
  const removeButton = event.target.closest(".remove-btn");

  if (removeButton) {
    const id = Number(removeButton.dataset.remove);

    removeFromCart(id);
  }
});

// =====================================================
// CLEAR CART BUTTON
// =====================================================

clearCartButton.addEventListener("click", clearCart);

// =====================================================
// CHECKOUT
// =====================================================

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();

  placeOrder();
});

// =====================================================
// LIVE VALIDATION
// =====================================================

nameInput.addEventListener("input", validateName);

phoneInput.addEventListener("input", validatePhone);

// =====================================================
// START APP
// =====================================================

loadMenu();
