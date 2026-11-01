import { NextResponse } from "next/server";

import { verifyCredentials } from "@/lib/auth";
import { createSession } from "@/lib/session";
import { isValidEmail } from "@/lib/validation";

export async function POST(request) {
  try {
    const body = await request.json();

    const email = body.email;
    const password = body.password;

    if (!isValidEmail(email) || typeof password !== "string") {
      return NextResponse.json(
        {
          message: "Please enter a valid email and password.",
        },
        {
          status: 400,
        },
      );
    }

    const user = verifyCredentials({
      email,
      password,
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Incorrect email or password.",
        },
        {
          status: 401,
        },
      );
    }

    await createSession(user);

    return NextResponse.json(
      {
        success: true,
        message: "You are now signed in.",
        user,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error("Sign-in error:", error);

    return NextResponse.json(
      {
        message: "Unable to sign in.",
      },
      {
        status: 500,
      },
    );
  }
}
