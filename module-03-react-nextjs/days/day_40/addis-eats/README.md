# 🍲 Addis Eats

Addis Eats is a responsive Ethiopian food ordering website built with Next.js.

## Technologies

- Next.js
- React
- JavaScript
- Tailwind CSS
- App Router
- Server Components
- Client Components
- Server Actions
- Route Handlers

## Routes

| Route         | File                      |
| ------------- | ------------------------- |
| `/`           | `app/page.js`             |
| `/menu`       | `app/menu/page.js`        |
| `/menu/[id]`  | `app/menu/[id]/page.js`   |
| `/cart`       | `app/cart/page.js`        |
| `/checkout`   | `app/checkout/page.js`    |
| `/api/orders` | `app/api/orders/route.js` |

## Features

- Responsive design
- Ethiopian food menu
- Category filtering
- Dynamic dish pages
- Cart quantity controls
- Checkout form
- Server-side validation
- Server Actions
- API Route Handler
- Loading UI
- Error UI
- Custom 404 page

## Server and Client Approach

Server Components are used for pages that do not require browser interaction.

Client Components are used for the cart and interactive checkout form.

## Run the project

```bash
npm install
npm run dev
```

---

# 21. What the finished website will look like

### 🏠 `/`

You will have:

- Addis Eats logo/header
- Home / Menu / Cart / Checkout navigation
- Large Ethiopian food hero image
- **“Authentic Ethiopian Food, Delivered”**
- Yellow **View Menu** button
- Responsive mobile hero

### 🍽️ `/menu`

You will have:

- **Our Menu**
- Categories sidebar
- Kitfo
- Doro Wot
- Shiro
- Chechebsa
- Food images
- ETB prices
- **View Dish** buttons

### 🍲 `/menu/1`

You will have:

- Large Kitfo image
- Kitfo
- 350 ETB
- Description
- **Add to Cart**
- Back to Menu

### 🛒 `/cart`

You will have:

- Your Cart
- Food thumbnail
- Price
- Quantity `− 1 +`
- Total
- Delete button
- **Proceed to Checkout →**

### 💳 `/checkout`

You will have:

- Customer Information
- Name
- Phone
- 350 ETB total
- **Place Order**

After successful submission:

### ✅ Success

You will see:

> ✓  
> **Order Placed Successfully!**  
> Thank you for your order. We will contact you soon.  
> **Back to Home**

### ⏳ Loading

You will see the skeleton cards and:

> **Loading Menu...**

### ❌ Error

You will see:

> **Something went wrong.**  
> We could not load the menu.  
> **Try Again**

### 🔎 Invalid dish

For something like:

```text
/menu/999
```
