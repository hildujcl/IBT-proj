// ==============================
// ADDIS EATS
// ==============================

// Application state
const state = {
  menu: [],
  search: "",
  category: "All",
  cart: [],
};

// ==============================
// LOAD DATA
// ==============================

async function loadMenu() {
  const menuContainer = document.querySelector("#menu-container");

  try {
    const response = await fetch("data/menu.json");

    if (!response.ok) {
      throw new Error("Could not load menu data");
    }

    state.menu = await response.json();

    render();
  } catch (error) {
    menuContainer.innerHTML = `
      <p>❌ Failed to load the menu.</p>
    `;

    console.error(error);
  }
}

// ==============================
// FILTER MENU
// ==============================

function getFilteredMenu() {
  return state.menu.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(state.search.toLowerCase());

    const matchesCategory =
      state.category === "All" || item.category === state.category;

    return matchesSearch && matchesCategory;
  });
}

// ==============================
// RENDER
// ==============================

function render() {
  renderMenu();
  renderCart();
}

// ==============================
// RENDER MENU
// ==============================

function renderMenu() {
  const container = document.querySelector("#menu-container");

  const filteredMenu = getFilteredMenu();

  if (filteredMenu.length === 0) {
    container.innerHTML = `
      <p>No food found 😢</p>
    `;

    return;
  }

  container.innerHTML = filteredMenu
    .map(
      (item) => `

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

  `,
    )
    .join("");
}

// ==============================
// ADD TO CART
// ==============================

function addToCart(id) {
  const food = state.menu.find((item) => item.id === id);

  if (!food) return;

  const existingItem = state.cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity++;
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
  state.cart = state.cart.filter((item) => item.id !== id);

  renderCart();
}

// ==============================
// RENDER CART
// ==============================

function renderCart() {
  const container = document.querySelector("#cart-container");

  const cartCount = document.querySelector("#cart-count");

  const cartTotal = document.querySelector("#cart-total");

  if (state.cart.length === 0) {
    container.innerHTML = `
      <p class="empty-cart">
        Your cart is empty 💗
      </p>
    `;

    cartCount.textContent = "0";
    cartTotal.textContent = "0";

    return;
  }

  container.innerHTML = state.cart
    .map(
      (item) => `

    <div class="cart-item">

      <div>
        <h3>${item.name}</h3>
        <p>
          ${item.quantity} × ${item.price} ETB
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

  `,
    )
    .join("");

  const total = state.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  cartTotal.textContent = total;
  cartCount.textContent = totalItems;
}

// ==============================
// SEARCH
// ==============================

document.querySelector("#search").addEventListener("input", (event) => {
  state.search = event.target.value;

  renderMenu();
});

// ==============================
// CATEGORY FILTER
// ==============================

document.querySelector("#category").addEventListener("change", (event) => {
  state.category = event.target.value;

  renderMenu();
});

// ==============================
// ADD / REMOVE BUTTONS
// ==============================

document.addEventListener("click", (event) => {
  const addButton = event.target.closest(".add-btn");

  if (addButton) {
    const id = Number(addButton.dataset.id);

    addToCart(id);
  }

  const removeButton = event.target.closest(".remove-btn");

  if (removeButton) {
    const id = Number(removeButton.dataset.remove);

    removeFromCart(id);
  }
});

// ==============================
// CLEAR CART
// ==============================

document.querySelector("#clear-cart").addEventListener("click", () => {
  state.cart = [];

  renderCart();
});

// ==============================
// START APPLICATION
// ==============================

loadMenu();
