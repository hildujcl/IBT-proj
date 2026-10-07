import { cart } from "@/lib/cart";

export async function GET() {
  return Response.json(cart);
}

export async function POST(request) {
  const dish = await request.json();

  const existingItem = cart.find((item) => item.id === dish.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...dish,
      quantity: 1,
    });
  }

  return Response.json(
    {
      message: "Dish added to cart",
      cart,
    },
    { status: 201 },
  );
}

export async function PATCH(request) {
  const { id, action } = await request.json();

  const item = cart.find((dish) => dish.id === Number(id));

  if (!item) {
    return Response.json({ message: "Item not found" }, { status: 404 });
  }

  if (action === "increase") {
    item.quantity += 1;
  }

  if (action === "decrease") {
    item.quantity -= 1;
  }

  if (item.quantity <= 0) {
    const index = cart.indexOf(item);
    cart.splice(index, 1);
  }

  return Response.json(cart);
}

export async function DELETE() {
  cart.length = 0;

  return Response.json({
    message: "Cart cleared",
  });
}
