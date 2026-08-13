const prices = [200, 500, 800, 1200, 1500];

const total = prices
  .map((price) => price * 1.15)
  .filter((price) => price < 1000)
  .reduce((sum, price) => sum + price, 0);

console.log(`Grand Total: ${total.toFixed(2)} ETB`);
