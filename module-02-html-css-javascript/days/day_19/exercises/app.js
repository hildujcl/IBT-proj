// EXERCISE 1
// textContent + classList.toggle()

const title = document.querySelector("#title");
const changeTitle = document.querySelector("#change-title");

changeTitle.addEventListener("click", () => {
  title.textContent = "DOM Manipulation ";

  title.classList.toggle("highlight");
});

// EXERCISE 2
// createElement + append

const cities = ["Addis Ababa", "Bahir Dar", "Hawassa"];

const cityList = document.querySelector("#city-list");

cities.forEach((city) => {
  const li = document.createElement("li");

  li.textContent = city;

  cityList.append(li);
});

// EXERCISE 3
// event.target + bubbling

const button = document.querySelector("#click-button");
const container = document.querySelector("#container");

button.addEventListener("click", (event) => {
  console.log("Button listener");
  console.log("event.target:", event.target);
});

container.addEventListener("click", (event) => {
  console.log("Container listener");
  console.log("event.target:", event.target);
});

// EXERCISE 4
// Event delegation

const itemList = document.querySelector("#item-list");

itemList.addEventListener("click", (event) => {
  if (event.target.matches(".delete")) {
    const item = event.target.closest("li");

    item.remove();
  }
});

// EXERCISE 5
// Form + preventDefault

const form = document.querySelector("#item-form");
const input = document.querySelector("#item-input");
const newList = document.querySelector("#new-list");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const value = input.value.trim();

  if (!value) {
    return;
  }

  const li = document.createElement("li");

  li.textContent = value;

  newList.append(li);

  input.value = "";
});
