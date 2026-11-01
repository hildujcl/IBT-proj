import { NextResponse } from "next/server";
import { deleteSession } from "@/lib/session";

export async function POST() {
  await deleteSession();

  return NextResponse.json(
    {
      success: true,
      message: "You have signed out.",
    },
    {
      status: 200,
    },
  );
}
