const state = {
  rates: {},
  watchlist: [],
};

const API_URL = "https://open.er-api.com/v6/latest/ETB";

const status = document.querySelector("#status");
const currency = document.querySelector("#currency");
const form = document.querySelector("#convertForm");
const amount = document.querySelector("#amount");
const result = document.querySelector("#result");
const watchlist = document.querySelector("#watchlist");

// Load saved watchlist
function loadState() {
  try {
    const saved = localStorage.getItem("birrWatch");

    if (saved) {
      const data = JSON.parse(saved);

      if (Array.isArray(data.watchlist)) {
        state.watchlist = data.watchlist;
      }
    }
  } catch (error) {
    console.log("Could not load saved data");
    state.watchlist = [];
  }
}

// Save watchlist
function saveState() {
  localStorage.setItem(
    "birrWatch",
    JSON.stringify({
      watchlist: state.watchlist,
    }),
  );
}

// Fetch exchange rates
async function fetchRates() {
  status.textContent = "Loading rates...";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch rates");
    }

    const data = await response.json();

    state.rates = data.rates;

    status.textContent = "Rates loaded successfully.";

    renderCurrencies();
    renderWatchlist();
  } catch (error) {
    status.textContent = "Error loading exchange rates.";
    console.error(error);
  }
}

// Render currency dropdown
function renderCurrencies() {
  currency.innerHTML = '<option value="">Select currency</option>';

  Object.keys(state.rates)
    .sort()
    .forEach((code) => {
      const option = document.createElement("option");

      option.value = code;
      option.textContent = code;

      currency.appendChild(option);
    });
}

// Convert ETB
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const amountValue = Number(amount.value);
  const selectedCurrency = currency.value;

  if (!amountValue || amountValue <= 0) {
    result.textContent = "Please enter a valid amount.";
    return;
  }

  if (!selectedCurrency) {
    result.textContent = "Please select a currency.";
    return;
  }

  const rate = state.rates[selectedCurrency];

  if (!rate) {
    result.textContent = "Exchange rate not available.";
    return;
  }

  const converted = amountValue * rate;

  result.textContent =
    `${amountValue.toLocaleString()} ETB = ` +
    `${converted.toFixed(2)} ${selectedCurrency}`;
});

// Add currency to watchlist
function addToWatchlist(code) {
  if (!state.watchlist.includes(code)) {
    state.watchlist.push(code);

    saveState();
    renderWatchlist();
  }
}

// Render watchlist
function renderWatchlist() {
  watchlist.innerHTML = "";

  state.watchlist.forEach((code) => {
    const li = document.createElement("li");

    li.innerHTML = `
            <span>
                ${code}: ${state.rates[code] || "Loading..."}
            </span>

            <button data-code="${code}">
                Delete
            </button>
        `;

    watchlist.appendChild(li);
  });
}

// Add selected currency to watchlist
currency.addEventListener("change", function () {
  if (currency.value) {
    addToWatchlist(currency.value);
  }
});

// Delete using event delegation
watchlist.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
    const code = event.target.dataset.code;

    state.watchlist = state.watchlist.filter((item) => item !== code);

    saveState();
    renderWatchlist();
  }
});

// Start app
loadState();
fetchRates();
