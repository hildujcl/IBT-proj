// ==========================================
// ADDIS EATS API - DAY 52
// ==========================================

// 1. DELIVERY AREAS

export const AREAS = ['Bole', 'Kazanchis', 'Piazza', 'Sarbet'] as const;

export type Area = (typeof AREAS)[number];

// 2. ORDER STATUS

export type OrderStatus =
  'Pending' | 'Confirmed' | 'Preparing' | 'Ready' | 'Delivered';

// 3. DISH TYPE

export type Dish = {
  name: string;
  price: number;
};

// 4. ORDER TYPE

export type Order = {
  readonly id: number;
  customerName: string;
  area: Area;
  status: OrderStatus;
  dishes: Dish[];
  teleBirrPhone?: string;
  total: number;
};

// 5. FORMAT ETB AMOUNTS

function formatETB(amountInSantim: number): string {
  const formatter = new Intl.NumberFormat('en-ET', {
    style: 'currency',
    currency: 'ETB',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(amountInSantim / 100);
}

// 6. DELIVERY FEE

export function deliveryFee(order: Order): number {
  // Free delivery for orders above 500 ETB
  if (order.total > 50000) {
    return 0;
  }

  // Bole delivery fee
  if (order.area === 'Bole') {
    return 4000;
  }

  // Other delivery areas
  return 6000;
}

// 7. STATUS MESSAGE

export function statusMessage(status: OrderStatus): string {
  switch (status) {
    case 'Pending':
      return 'Your order is waiting for confirmation.';

    case 'Confirmed':
      return 'Your order has been confirmed.';

    case 'Preparing':
      return 'Your food is being prepared.';

    case 'Ready':
      return 'Your order is ready for delivery.';

    case 'Delivered':
      return 'Your order has been delivered.';

    default: {
      const exhaustiveCheck: never = status;
      return exhaustiveCheck;
    }
  }
}

// 8. RECEIPT

export function receipt(order: Order): string {
  const subtotal = order.total;
  const fee = deliveryFee(order);
  const grandTotal = subtotal + fee;

  const dishDetails = order.dishes
    .map((dish) => `${dish.name}: ${formatETB(dish.price)}`)
    .join('\n');

  return `
====================================
          ADDIS EATS RECEIPT
====================================

Order ID:       ${order.id}
Customer:       ${order.customerName}
Delivery Area:  ${order.area}
TeleBirr Phone: ${order.teleBirrPhone ?? 'Not provided'}

------------------------------------
ORDER DETAILS
------------------------------------

${dishDetails}

------------------------------------
Subtotal:       ${formatETB(subtotal)}
Delivery Fee:   ${formatETB(fee)}
------------------------------------
TOTAL:          ${formatETB(grandTotal)}
------------------------------------

Status: ${statusMessage(order.status)}

====================================
       THANK YOU FOR ORDERING!
====================================
`;
}
