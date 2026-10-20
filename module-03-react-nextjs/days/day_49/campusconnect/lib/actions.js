"use server";
import { redirect } from "next/navigation";
import { setSession, clearSession, getSession } from "@/lib/auth";
import { safeReturnPath } from "@/lib/session-core";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export async function signInAction(formData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const expectedEmail = (process.env.DEMO_EMAIL || "student@campusconnect.test").toLowerCase();
  const expectedPassword = process.env.DEMO_PASSWORD || "Campus123!";
  if (!emailPattern.test(email) || email !== expectedEmail || password !== expectedPassword) redirect("/signin?error=credentials");
  await setSession({ id: "demo-student", name: "Campus Student", email });
  const next = safeReturnPath(String(formData.get("next") || "/dashboard"));
  redirect(next);
}
export async function signUpAction(formData) {
  const name = String(formData.get("name") || "").trim().slice(0, 80);
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  if (name.length < 2 || !emailPattern.test(email) || password.length < 8) redirect("/signup?error=validation");
  // Educational demo: creates a signed session but does not persist an account/password in a database.
  await setSession({ id: `student-${Buffer.from(email).toString("hex").slice(0, 24)}`, name, email });
  redirect("/dashboard?welcome=1");
}
export async function signOutAction() {
  await clearSession();
  redirect("/");
}
export async function createEventAction(formData) {
  const user = await getSession();
  if (!user) redirect("/signin?next=/create-event");
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const date = String(formData.get("date") || "");
  const time = String(formData.get("time") || "");
  const location = String(formData.get("location") || "").trim();
  if (title.length < 4 || title.length > 90 || description.length < 10 || description.length > 1000 || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !time || location.length < 2) redirect("/create-event?error=validation");
  // Server-side authorization and validation are real; durable event storage needs a database adapter.
  redirect(`/dashboard?created=${encodeURIComponent(title)}`);
}
export async function protectedPingAction(formData) {
  const user = await getSession();
  if (!user) redirect("/signin?error=auth");
  const targetId = String(formData.get("targetId") || "");
  if (targetId !== user.id) redirect("/dashboard?error=forbidden");
  redirect("/dashboard?verified=1");
}
