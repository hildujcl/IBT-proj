import { NextResponse } from "next/server";

import { getSession } from "@/lib/session";
import { createOrder, getAllOrders, getOrdersForUser } from "@/lib/orders";

import { isValidName, isValidPhone } from "@/lib/validation";

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { message: "Please sign in first." },
        { status: 401 },
      );
    }

    const orders =
      session.role === "admin"
        ? getAllOrders()
        : getOrdersForUser(session.email);

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get orders error:", error);

    return NextResponse.json(
      { message: "Unable to load orders." },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { message: "Please sign in first." },
        { status: 401 },
      );
    }

    if (session.role !== "customer") {
      return NextResponse.json(
        { message: "Only customers can place orders." },
        { status: 403 },
      );
    }

    const body = await request.json();

    const customer = body.customer;
    const items = body.items;

    if (
      !customer ||
      !isValidName(customer.name) ||
      !isValidPhone(customer.phone) ||
      typeof customer.deliveryArea !== "string" ||
      !customer.deliveryArea.trim()
    ) {
      return NextResponse.json(
        { message: "Please provide valid delivery information." },
        { status: 400 },
      );
    }

    if (!Array.isArray(items) || items.length === 0 || items.length > 20) {
      return NextResponse.json(
        { message: "Your cart is empty or invalid." },
        { status: 400 },
      );
    }

    const seenIds = new Set();

    for (const item of items) {
      if (
        !item ||
        typeof item.id !== "string" ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 20 ||
        seenIds.has(item.id)
      ) {
        return NextResponse.json(
          { message: "Your cart contains invalid items." },
          { status: 400 },
        );
      }

      seenIds.add(item.id);
    }

    const order = createOrder({
      customer,
      items,
      userEmail: session.email,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your demo order has been placed.",
        order,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("Create order error:", error);

    return NextResponse.json(
      {
        message: error.message || "Unable to create order.",
      },
      {
        status: 400,
      },
    );
  }
}
