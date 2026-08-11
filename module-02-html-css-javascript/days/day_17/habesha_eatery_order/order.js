// Calculate the subtotal from any number of prices
function subtotal(...prices) {
  return prices.reduce((total, price) => total + price, 0);
}

// Factory function that returns an arrow function
function discountBy(rate) {
  return (amount) => amount * (1 - rate);
}

// Pure helper to add 15% VAT
function withVat(amount) {
  return amount * 1.15;
}

// Pure helper to format ETB
function toETB(amount) {
  return amount.toFixed(2) + " ETB";
}

// Receipt maker with a private order number
function makeReceiptMaker() {
  let orderNumber = 0;

  return (amount) => {
    orderNumber++;
    return `#${orderNumber}: ${toETB(amount)}`;
  };
}

// Compose the functions
const applyDiscount = discountBy(0.1);
const makeReceipt = makeReceiptMaker();

function processOrder(...prices) {
  const sub = subtotal(...prices);
  const discounted = applyDiscount(sub);
  const total = withVat(discounted);

  return makeReceipt(total);
}

// Habesha Eatery orders
console.log(processOrder(120, 180, 100)); // Shiro, Doro Wot, Firfir
console.log(processOrder(150, 200)); // Tibs, Kitfo
console.log(processOrder(180, 120)); // Doro Wot, Shiro
console.log(processOrder(100, 150, 120)); // Firfir, Tibs, Shiro
console.log(processOrder(200, 180, 150)); // Kitfo, Doro Wot, Tibs
