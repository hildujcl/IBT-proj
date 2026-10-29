import { NextResponse } from "next/server";
import { createSession } from "@/lib/session";

const users = {
  "user@example.com": {
    id: "demo-user-1",
    role: "customer",
    password: "password123",
  },
  "staff@example.com": {
    id: "demo-staff-1",
    role: "staff",
    password: "password123",
  },
};

function safeNext(value) {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\")
  ) {
    return "/";
  }

  try {
    const url = new URL(value, "http://localhost");

    return url.origin === "http://localhost"
      ? `${url.pathname}${url.search}${url.hash}`
      : "/";
  } catch {
    return "/";
  }
}

export async function POST(request) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");
  const next = safeNext(formData.get("next"));

  const user = typeof email === "string" ? users[email] : null;

  if (!user || user.password !== password) {
    return new Response("Invalid email or password.", {
      status: 401,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  await createSession(user.id);

  return NextResponse.redirect(new URL(next, request.url), 303);
}
