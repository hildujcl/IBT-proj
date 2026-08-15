const order = {
  name: "Almaz",
  city: "Addis Ababa",
  cart: ["Doro Wat", "Shiro"],
  total: 360,
  member: true,
};

const stringOrder = JSON.stringify(order);

localStorage.setItem("order", stringOrder);

const rawOrder = localStorage.getItem("order");

const savedOrder = rawOrder ? JSON.parse(rawOrder) : {};

let cart = ["Doro Wat", "Tibs"];

// Save cart
localStorage.setItem("cart", JSON.stringify(cart));

function loadCart() {
  try {
    const raw = localStorage.getItem("cart");

    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return []; // corrupt data — start fresh
  }
}

// Load the cart
cart = loadCart();

console.log("Loaded cart:", cart);

const language = document.getElementById("choose");
const saveBtn = document.getElementById("saveBtn");
const result = document.getElementById("result");

saveBtn.addEventListener("click", function () {
  const selected = language.value;

  const value = savedOrder[selected];

  result.textContent = JSON.stringify(value);
});
removeBtn.addEventListener("click", function () {
  const selected = language.value;

  // Delete selected property
  delete savedOrder[selected];

  // Save updated object
  localStorage.setItem("order", JSON.stringify(savedOrder));

  // Update the screen
  result.textContent = "Removed: " + selected;
});
