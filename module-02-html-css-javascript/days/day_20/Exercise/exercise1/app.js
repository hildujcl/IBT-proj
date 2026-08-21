async function getUsdToEtbRate() {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");

    if (!res.ok) {
      throw new Error("Failed to fetch exchange rate");
    }

    const data = await res.json();

    const rate = data.rates.ETB;

    if (!rate) {
      throw new Error("ETB rate was not found");
    }

    return rate;
  } catch (error) {
    console.error("Error:", error.message);
  }
}

getUsdToEtbRate().then((rate) => {
  console.log("1 USD =", rate, "ETB");
});
