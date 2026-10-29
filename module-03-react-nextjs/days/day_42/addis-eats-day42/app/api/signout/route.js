import { NextResponse } from "next/server";
import { deleteSession } from "@/lib/session";

export async function POST(request) {
  try {
    await deleteSession();

    return NextResponse.redirect(new URL("/", request.url), 303);
  } catch (error) {
    console.error("Sign-out failed:", error);

    return NextResponse.redirect(
      new URL("/signin?error=signout", request.url),
      303,
    );
  }
}

<form action="/api/signout" method="POST">
  <button type="submit">Sign Out</button>
</form>;
