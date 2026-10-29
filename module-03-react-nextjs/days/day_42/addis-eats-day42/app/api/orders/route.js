import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { createOrder, getOrdersByUser } from "@/lib/orders";

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { message: "Please sign in first." },
      { status: 401 },
    );
  }

  try {
    const orders = await getOrdersByUser(session.userId);

    return NextResponse.json({ orders });
  } catch {
    return NextResponse.json(
      { message: "Unable to retrieve orders." },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      { message: "Please sign in first." },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();

    const { items, total, deliveryAddress } = body;

    if (
      !Array.isArray(items) ||
      items.length === 0 ||
      typeof total !== "number" ||
      !Number.isFinite(total) ||
      total < 0 ||
      typeof deliveryAddress !== "string" ||
      !deliveryAddress.trim()
    ) {
      return NextResponse.json(
        { message: "Please provide valid order details." },
        { status: 400 },
      );
    }

    const order = await createOrder({
      userId: session.userId,
      items,
      total,
      deliveryAddress,
    });

    return NextResponse.json(
      { message: "Order created successfully.", order },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { message: "Unable to create your order." },
      { status: 400 },
    );
  }
}
