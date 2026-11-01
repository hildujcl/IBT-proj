import { NextResponse } from "next/server";

import { registerUser } from "@/lib/auth";
import { createSession } from "@/lib/session";
import { isValidEmail, isValidName, isValidPassword } from "@/lib/validation";

export async function POST(request) {
  try {
    const body = await request.json();

    const name = body.name;
    const email = body.email;
    const password = body.password;

    if (!isValidName(name)) {
      return NextResponse.json(
        {
          message: "Please enter a valid name.",
        },
        {
          status: 400,
        },
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          message: "Please enter a valid email address.",
        },
        {
          status: 400,
        },
      );
    }

    if (!isValidPassword(password)) {
      return NextResponse.json(
        {
          message: "Password must contain at least 8 characters.",
        },
        {
          status: 400,
        },
      );
    }

    const user = registerUser({
      name,
      email,
      password,
    });

    await createSession(user);

    return NextResponse.json(
      {
        success: true,
        message: "Your account has been created.",
        user,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message || "Unable to create your account.",
      },
      {
        status: 400,
      },
    );
  }
}
