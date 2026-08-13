const customer = {
  name: "Almaz",
  city: "Addis Ababa",
  balance: 1500,
};

for (const [key, value] of Object.entries(customer)) {
  console.log(`${key}: ${value}`);
}
