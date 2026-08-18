// The single source of truth
const state = {
  base: "ETB",
  rates: {},
  watchlist: [],
  amount: 100,
  currency: "USD",
};

const API = "https://open.er-api.com/v6/latest/ETB";

const status = document.querySelector("#status");
const select = document.querySelector("#currency");
const form = document.querySelector("#convert-form");
const amount = document.querySelector("#amount");
const result = document.querySelector("#result");
const watchlist = document.querySelector("#watchlist");
const addBtn = document.querySelector("#watch");

// Load rates
async function loadRates() {
  status.textContent = "Loading rates...";

  try {
    const res = await fetch(API);

    if (!res.ok) {
      throw new Error("HTTP " + res.status);
    }

    const data = await res.json();

    state.rates = data.rates; //into state

    status.textContent = "";

    render();
  } catch (err) {
    status.textContent = "Could not load rates.";
  }
}

// Render dropdown
function render() {
  const codes = Object.keys(state.rates);

  select.innerHTML = codes.map((c) => `<option>${c}</option>`).join("");

  select.value = state.currency;

  renderWatchlist();
}

// Convert
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const amt = Number(amount.value);

  if (!amt || amt <= 0) {
    result.innerHTML = "Enter a valid amount.";
    return;
  }

  state.amount = amt;
  state.currency = select.value;

  const rate = state.rates[state.currency];

  const out = (amt * rate).toFixed(2);

  result.textContent = `${amt} ETB = ${out} ${state.currency}`;
});

// Add to watchlist
addBtn.addEventListener("click", () => {
  const currency = select.value;

  if (state.watchlist.includes(currency)) {
    return;
  }

  state.watchlist.push(currency);

  save();
  renderWatchlist();
});

// Render watchlist
function renderWatchlist() {
  watchlist.innerHTML = state.watchlist
    .map(
      (currency) => `
        <li>
          ${currency}
          <button
            class="remove"
            data-currency="${currency}">
            Remove
          </button>
        </li>
      `,
    )
    .join("");
}

// Remove from watchlist
watchlist.addEventListener("click", (e) => {
  if (!e.target.classList.contains("remove")) {
    return;
  }

  const currency = e.target.dataset.currency;

  state.watchlist = state.watchlist.filter((item) => item !== currency);

  save();
  renderWatchlist();
});

// Save watchlist
function save() {
  localStorage.setItem("birrWatchlist", JSON.stringify(state.watchlist));
}

// Load watchlist
function load() {
  try {
    const saved = localStorage.getItem("birrWatchlist");

    if (saved) {
      state.watchlist = JSON.parse(saved);
    }
  } catch (error) {
    state.watchlist = [];
  }
}

// Start app
load();
loadRates();
