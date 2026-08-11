// tip.js

// Read bill and party size
const bill = Number(process.argv[2]);
const partySize = Number(process.argv[3]);

// Add tiered tip
let tipRate;

if (bill > 300) {
  tipRate = 0.1; // 10%
} else {
  tipRate = 0.05; // 5%
}

const tip = bill * tipRate;
const subtotal = bill + tip;

// TeleBirr / CBE Birr service fee
let service;

switch (process.argv[4]) {
  case "telebirr":
    service = 5;
    break;

  case "cbe":
    service = 3;
    break;

  default:
    service = 0;
}

const total = subtotal + service;
const perPerson = total / partySize;

// Print result
console.log(`Bill: ${bill.toFixed(2)} ETB`);
console.log(`Tip: ${tip.toFixed(2)} ETB`);
console.log(`Service fee: ${service.toFixed(2)} ETB`);
console.log(`Total: ${total.toFixed(2)} ETB`);
console.log(`Each person pays: ${perPerson.toFixed(2)} ETB`);
