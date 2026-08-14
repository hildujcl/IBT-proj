// DOM MANIPULATION

// Select by ID
let firstheading = document.getElementById("firstheading");

// Select the first h1
let title = document.querySelector("h1");

// Select the first item
let first = document.querySelector(".item");

// Select ALL items
// This returns a NodeList
let items = document.querySelectorAll(".item");

// NODELIST

console.log("Number of items:", items.length);

// forEach works directly on a NodeList
items.forEach((item) => {
  console.log(item.textContent);
});

// CONVERT NODELIST TO ARRAY

// Convert NodeList into an Array
let itemArray = [...items];

console.log("Array:", itemArray);

// map() works because itemArray is an Array
let names = itemArray.map((item) => item.textContent.trim());

console.log("Names:", names);

// PRODUCT CHECKBOXES

let products = document.querySelectorAll(".product");

// INPUT

let input = document.querySelector("#qty");

// Input value is a string
console.log("Input value:", input.value);

// Convert it to a number
let quantity = Number(input.value);

console.log("Quantity:", quantity);

// ATTRIBUTES

console.log("First item class:", first.getAttribute("class"));

console.log("First item data-id:", first.dataset.id);

// BUTTON AND OUTPUT

let button = document.querySelector("#showBtn");

let output = document.querySelector("#output");

// This value will CHANGE
let selectedItem = "Nothing selected";

let total = 0;

// BUTTON CLICK

button.addEventListener("click", () => {
  // Update quantity
  quantity = Number(input.value);

  // Find checked products
  let selected = [...products].filter((product) => product.checked);

  // Check if nothing was selected
  if (selected.length === 0) {
    selectedItem = "Nothing selected";
    total = 0;
  } else {
    // Change selectedItem
    selectedItem = selected
      .map((product) => product.parentElement.textContent.trim())
      .join(", ");

    // Reset total
    total = 0;

    // Calculate total
    selected.forEach((product) => {
      let price = Number(product.value);

      total = total + price * quantity;
    });
  }

  // CHANGE THE HEADING

  firstheading.textContent = "Your Order";

  // DISPLAY RESULT

  output.innerHTML = `
        <h3>Order Information</h3>

        <p>
            <strong>Selected:</strong>
            ${selectedItem}
        </p>

        <p>
            <strong>Quantity:</strong>
            ${quantity}
        </p>

        <p>
            <strong>Total:</strong>
            ${total} ETB
        </p>
    `;
});
