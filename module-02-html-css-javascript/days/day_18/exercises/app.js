import { addVat, VAT } from "./money.js";

const price = 500;

console.log(`VAT Rate: ${VAT * 100}%`);
console.log(`Price with VAT: ${addVat(price)} ETB`);
