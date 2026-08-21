# Addis Eats - Test Plan

## Objective

Test the Addis Eats application to make sure the menu,
search, filter, cart, checkout validation, and order
confirmation work correctly.

---

## Test 1 - Load Menu

Steps:

1. Open the application with Live Server.
2. Wait for the menu to load.

Expected result:

- Food items appear on the page.
- Each food item has an image, name, category, price,
  and Add to Cart button.

Result:

- Pass

---

## Test 2 - Search

Steps:

1. Click the search box.
2. Type "Doro".

Expected result:

- Only matching food items are displayed.

Result:

- Pass

---

## Test 3 - Category Filter

Steps:

1. Open the category dropdown.
2. Select "Breakfast".

Expected result:

- Only breakfast items are displayed.

Result:

- Pass

---

## Test 4 - Add to Cart

Steps:

1. Click Add to Cart on a food item.

Expected result:

- The item appears in the cart.
- Cart count increases.
- Cart total is updated.

Result:

- Pass

---

## Test 5 - Remove From Cart

Steps:

1. Add a food item to the cart.
2. Click Remove.

Expected result:

- The item is removed.
- Cart count decreases.
- Total is updated.

Result:

- Pass

---

## Test 6 - Empty Cart Checkout

Steps:

1. Make sure the cart is empty.
2. Go to checkout.
3. Click Place Order.

Expected result:

- An error message says the cart is empty.
- No order is placed.

Result:

- Pass

---

## Test 7 - Invalid Name

Steps:

1. Add a food item to the cart.
2. Enter only one character in the name field.
3. Submit the form.

Expected result:

- An error message appears.
- The order is not placed.

Result:

- Pass

---

## Test 8 - Invalid Phone

Steps:

1. Add a food item to the cart.
2. Enter an invalid phone number.
3. Submit the form.

Expected result:

- An error message appears.
- The order is not placed.

Result:

- Pass

---

## Test 9 - Valid Checkout

Steps:

1. Add food to the cart.
2. Enter a valid full name.
3. Enter a valid Ethiopian phone number.
4. Click Place Order.

Expected result:

- Order confirmation appears.
- Customer name is displayed.
- Order total is displayed.
- Cart is cleared.

Result:

- Pass

---

## Test 10 - Responsive Design

Steps:

1. Open browser developer tools.
2. Test desktop, tablet, and mobile sizes.

Expected result:

- Content remains readable.
- Food cards adjust to screen size.
- Navigation and checkout remain usable.

Result:

- Pass

---

## Final Review

The application was tested for:

- Menu loading
- Search
- Category filtering
- Cart
- Cart removal
- Checkout validation
- Phone validation
- Empty cart validation
- Order confirmation
- Responsive design

All major features are working as expected.
