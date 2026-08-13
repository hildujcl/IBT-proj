import { transactions } from "./transactions.js";

import { totalByType, makeReceipts, correctTransaction } from "./report.js";

const totalCredits = totalByType(transactions, "credit");
const totalDebits = totalByType(transactions, "debit");

console.log("=== TeleBirr Transaction Report ===");

console.log(`Total Credits: ${totalCredits} ETB`);
console.log(`Total Debits: ${totalDebits} ETB`);

console.log("\nReceipts:");

const receipts = makeReceipts(transactions);

receipts.forEach((receipt) => {
  console.log(receipt);
});

const updatedTransaction = correctTransaction(transactions[0], 300);

console.log("\nOriginal Transaction:");
console.log(transactions[0]);

console.log("\nCorrected Transaction:");
console.log(updatedTransaction);
