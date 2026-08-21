const output = document.querySelector("#output");
const loadBtn = document.querySelector("#loadBtn");

async function loadData() {
  // Loading state
  output.textContent = "Loading...";

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");

    if (!res.ok) {
      throw new Error("Could not load the data");
    }

    const data = await res.json();

    // Success state
    output.innerHTML = `
      <h2>${data.title}</h2>
      <p>${data.body}</p>
    `;
  } catch (error) {
    // Error state
    output.textContent = "Sorry, something went wrong.";
    console.error(error);
  }
}

loadBtn.addEventListener("click", loadData);
