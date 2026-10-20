import { createHmac, timingSafeEqual } from "node:crypto";

const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
function getSecret() {
  const value = process.env.AUTH_SECRET;
  if (process.env.NODE_ENV === "production" && (!value || value.length < 32)) {
    throw new Error("AUTH_SECRET must be at least 32 characters in production.");
  }
  return value || "local-development-only-secret-change-this-value";
}
function sign(payload) {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}
export function createSessionToken(user, now = Date.now()) {
  const payload = Buffer.from(JSON.stringify({
    id: String(user.id), name: String(user.name || "Student"),
    email: String(user.email).toLowerCase(), exp: now + MAX_AGE_MS,
  })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}
export function verifySessionToken(token, now = Date.now()) {
  if (typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 2 || !parts[0] || !parts[1]) return null;
  const [payload, signature] = parts;
  const expected = Buffer.from(sign(payload));
  const received = Buffer.from(signature);
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (typeof data.id !== "string" || !data.id || typeof data.email !== "string" || !data.email || !Number.isFinite(data.exp) || data.exp <= now) return null;
    return { id: data.id, name: String(data.name || "Student"), email: data.email };
  } catch { return null; }
}
export function safeReturnPath(value, fallback = "/dashboard") {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//") || value.includes("\\") || /[\r\n]/.test(value)) return fallback;
  try {
    const parsed = new URL(value, "https://campusconnect.invalid");
    if (parsed.origin !== "https://campusconnect.invalid") return fallback;
    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch { return fallback; }
}
