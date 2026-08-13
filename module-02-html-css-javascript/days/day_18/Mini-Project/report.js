export const totalByType = (transactions, type) => {
  return transactions
    .filter((transaction) => transaction.type === type)
    .reduce((sum, { amount }) => sum + amount, 0);
};

export const makeReceipts = (transactions) => {
  return transactions.map(({ customer, amount }) => {
    return `${customer}: ${amount} ETB`;
  });
};

export const correctTransaction = (transaction, newAmount) => {
  return {
    ...transaction,
    amount: newAmount,
  };
};
