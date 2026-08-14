const list = document.getElementById("list");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const refreshBtn = document.getElementById("refreshBtn");

const API_URL = "https://jsonplaceholder.typicode.com/posts";

async function load() {
  loading.textContent = "Loading...";
  error.textContent = "";
  list.innerHTML = "";

  try {
    const res = await fetch(API_URL);

    if (!res.ok) {
      throw new Error("Request failed");
    }

    const data = await res.json();

    data.forEach((item) => {
      const li = document.createElement("li");

      li.innerHTML = `
                <h3>${item.title}</h3>
                <p>${item.body}</p>
            `;

      list.appendChild(li);
    });
  } catch (err) {
    error.textContent = "Sorry, we couldn't load the data. Please try again.";
  } finally {
    loading.textContent = "";
  }
}

refreshBtn.addEventListener("click", load);

load();
