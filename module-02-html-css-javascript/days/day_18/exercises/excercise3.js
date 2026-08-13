const customer = {
  name: "Dawit",
  city: "Addis Ababa",
  balance: 2000,
};

const { name, city } = customer;

console.log(name);
console.log(city);

function greet({ name }) {
  console.log(`Hello, ${name}!`);
}

greet(customer);
