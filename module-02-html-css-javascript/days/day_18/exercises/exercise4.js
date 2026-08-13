const customer = {
  name: "Tigist",
  city: "Adama",
  balance: 1000,
};

const updatedCustomer = {
  ...customer,
  city: "Addis Ababa",
  phone: "0912345678",
};

console.log("Original:", customer);
console.log("Updated:", updatedCustomer);
