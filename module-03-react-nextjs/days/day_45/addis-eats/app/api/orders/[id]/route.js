import { NextResponse } from "next/server";

import { getSession } from "@/lib/session";

import { getOrderById, updateOrderStatus } from "@/lib/orders";

const allowedStatuses = ["received", "preparing", "ready", "cancelled"];

export async function GET(request, { params }) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { message: "Please sign in first." },
        { status: 401 },
      );
    }

    const { id } = await params;

    const order = getOrderById(id);

    if (!order) {
      return NextResponse.json(
        { message: "Order not found." },
        { status: 404 },
      );
    }

    if (session.role !== "admin" && order.userEmail !== session.email) {
      return NextResponse.json(
        { message: "You cannot access this order." },
        { status: 403 },
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Get order error:", error);

    return NextResponse.json(
      { message: "Unable to load this order." },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { message: "Please sign in first." },
        { status: 401 },
      );
    }

    if (session.role !== "admin") {
      return NextResponse.json(
        { message: "Administrator access is required." },
        { status: 403 },
      );
    }

    const { id } = await params;
    const body = await request.json();

    if (!allowedStatuses.includes(body.status)) {
      return NextResponse.json(
        { message: "Invalid order status." },
        { status: 400 },
      );
    }

    const updatedOrder = updateOrderStatus(id, body.status);

    if (!updatedOrder) {
      return NextResponse.json(
        { message: "Order not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order status updated.",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Update order error:", error);

    return NextResponse.json(
      { message: "Unable to update order status." },
      { status: 500 },
    );
  }
}
