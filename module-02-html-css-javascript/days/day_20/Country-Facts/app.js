const form = document.querySelector("#countryForm");
const input = document.querySelector("#countryInput");
const out = document.querySelector("#facts");

function render(out, label, value) {
  const div = document.createElement("div");
  div.className = "fact";

  const strong = document.createElement("strong");
  strong.textContent = `${label}:`;

  const span = document.createElement("span");
  span.textContent = value;

  div.appendChild(strong);
  div.appendChild(span);
  out.appendChild(div);
}

async function showCountry(name) {
  // Loading state
  out.textContent = "Loading...";

  try {
    const countryName = name.trim();

    if (!countryName) {
      throw new Error("Please enter a country name");
    }

    const url = `https://countries.dev/name/${encodeURIComponent(countryName)}`;

    console.log("Fetching:", url);

    const res = await fetch(url);

    console.log("Status:", res.status);
    console.log("OK:", res.ok);

    // HTTP error
    if (!res.ok) {
      throw new Error("Country not found");
    }

    const countries = await res.json();

    // First matching country
    const country = countries[0];

    if (!country) {
      throw new Error("Country not found");
    }

    // Clear loading
    out.innerHTML = "";

    // Country name
    const title = document.createElement("h2");
    title.textContent = country.name;
    out.appendChild(title);

    // Flag
    const flag = document.createElement("img");
    flag.src = country.flags.png;
    flag.alt = `${country.name} flag`;
    flag.className = "flag";

    out.appendChild(flag);

    // Capital
    render(out, "Capital", country.capital || "No capital information");

    // Population
    render(
      out,
      "Population",
      country.population
        ? country.population.toLocaleString()
        : "No population information",
    );

    // Region
    render(out, "Region", country.region || "No region information");

    // Currencies
    let currencies = "No currency information";

    if (country.currencies && country.currencies.length > 0) {
      currencies = country.currencies
        .map((currency) => {
          return `${currency.name} (${currency.symbol || ""})`;
        })
        .join(", ");
    }

    render(out, "Currencies", currencies);
  } catch (error) {
    console.error("FULL ERROR:", error);

    out.innerHTML = "";

    const errorMessage = document.createElement("p");
    errorMessage.className = "error";
    errorMessage.textContent = error.message;

    out.appendChild(errorMessage);
  }
}

// Search
form.addEventListener("submit", (event) => {
  event.preventDefault();

  showCountry(input.value);
});

// Default country
showCountry("Ethiopia");
