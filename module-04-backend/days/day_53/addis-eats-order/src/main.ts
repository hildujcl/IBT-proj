// main.ts

import {
  Order,
  InMemoryOrderRepository,
  OrderService,
  OrderNotFoundError,
  PaymentDeclinedError,
} from './orders';

// Sample orders
const orders: Order[] = [
  {
    id: 1,
    customerName: 'Hana',
    phone: '0912345678',
    dish: {
      id: 101,
      name: 'Tibs Firfir',
      price: 250,
    },
    area: 'Bole',
    status: 'Preparing',
    quantity: 2,
    total: 500,
  },
  {
    id: 2,
    customerName: 'Abel',
    phone: '0911223344',
    dish: {
      id: 102,
      name: 'Beyaynet',
      price: 180,
    },
    area: 'Piazza',
    status: 'Pending',
    quantity: 1,
    total: 180,
  },
];

// Create repository
const repository = new InMemoryOrderRepository(orders);

// Create service
const service = new OrderService(repository);

// Display all orders
console.log('ALL ORDERS:');
console.log(repository.all());

// Find an order
console.log('\nFIND ORDER:');
console.log(service.find(1));

// Display delivery fees
console.log('\nDELIVERY FEES:');
console.log(service.feesByArea());

// Summarise customer names
console.log('\nCUSTOMER NAMES:');
console.log(service.summarise('customerName'));

// Summarise order totals
console.log('\nORDER TOTALS:');
console.log(service.summarise('total'));

// Summarise order statuses
console.log('\nORDER STATUSES:');
console.log(service.summarise('status'));

// Test custom errors
console.log('\nERROR TESTS:');

try {
  service.find(999);
} catch (error) {
  if (error instanceof OrderNotFoundError) {
    console.log(error.message);
    console.log('Missing order ID:', error.id);
  }
}

const paymentError = new PaymentDeclinedError(
  '0912345678',
  'Insufficient payment',
);

console.log(paymentError.message);
