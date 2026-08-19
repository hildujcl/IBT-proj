const form = document.querySelector("#add-form");

const nameInput = document.querySelector("#name");

const priceInput = document.querySelector("#price");

const list = document.querySelector("#list");

const totalEl = document.querySelector("#total");

const error = document.querySelector("#error");

// ADD ITEM ROW

function addRow(name, price) {
  // Create li

  const li = document.createElement("li");

  // Save price on the li

  li.dataset.price = price;

  // Create item name

  const itemName = document.createElement("span");

  itemName.textContent = name;

  // Create price

  const itemPrice = document.createElement("span");

  itemPrice.textContent = `${price} ETB`;

  // Create delete button

  const deleteButton = document.createElement("button");

  deleteButton.textContent = "Delete";

  deleteButton.classList.add("del");

  // Add elements to li

  li.append(itemName, itemPrice, deleteButton);

  // Add li to list

  list.append(li);
}

// UPDATE TOTAL

function updateTotal() {
  let total = 0;

  const items = list.querySelectorAll("li");

  items.forEach((item) => {
    total += Number(item.dataset.price);
  });

  totalEl.textContent = total.toFixed(2);
}

// FORM SUBMIT

form.addEventListener("submit", (event) => {
  // Stop page reload

  event.preventDefault();

  // Read values

  const name = nameInput.value.trim();

  const price = Number(priceInput.value);

  // Validation

  if (!name || !price || price <= 0) {
    error.textContent = "Please enter an item name and a valid ETB price.";

    return;
  }

  // Clear error

  error.textContent = "";

  // Add item

  addRow(name, price);

  // Clear form

  form.reset();

  // Update total

  updateTotal();
});

// EVENT DELEGATION

list.addEventListener("click", (event) => {
  // DELETE

  if (event.target.matches(".del")) {
    const item = event.target.closest("li");

    item.remove();

    updateTotal();

    return;
  }

  // BOUGHT

  const item = event.target.closest("li");

  if (item) {
    item.classList.toggle("bought");
  }
});
