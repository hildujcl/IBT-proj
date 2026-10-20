import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSessionToken, verifySessionToken } from "@/lib/session-core";

const COOKIE_NAME = "campusconnect_session";
const MAX_AGE = 60 * 60 * 24 * 7;
export { verifySessionToken };
export async function getSession() {
  const jar = await cookies();
  return verifySessionToken(jar.get(COOKIE_NAME)?.value);
}
export async function setSession(user) {
  const jar = await cookies();
  jar.set(COOKIE_NAME, createSessionToken(user), {
    httpOnly: true, secure: process.env.NODE_ENV === "production",
    sameSite: "lax", path: "/", maxAge: MAX_AGE,
  });
}
export async function clearSession() {
  const jar = await cookies();
  jar.set(COOKIE_NAME, "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 0 });
}
export async function requireUser() {
  const user = await getSession();
  if (!user) redirect("/signin?next=/dashboard");
  return user;
}
