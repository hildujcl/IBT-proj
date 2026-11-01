import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";

const COOKIE_NAME = "addis_eats_session";

const SESSION_DURATION = 60 * 60 * 24 * 7;

function getSecret() {
  const secret = process.env.SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "SESSION_SECRET must be configured with at least 32 characters.",
    );
  }

  return secret;
}

function sign(value) {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

function createToken(payload) {
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
    "base64url",
  );

  const signature = sign(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

function verifyToken(token) {
  if (typeof token !== "string") {
    return null;
  }

  const parts = token.split(".");

  if (parts.length !== 2) {
    return null;
  }

  const [encodedPayload, receivedSignature] = parts;

  try {
    const expectedSignature = sign(encodedPayload);

    const expectedBuffer = Buffer.from(expectedSignature);
    const receivedBuffer = Buffer.from(receivedSignature);

    if (
      expectedBuffer.length !== receivedBuffer.length ||
      !timingSafeEqual(expectedBuffer, receivedBuffer)
    ) {
      return null;
    }

    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString(),
    );

    if (
      !payload.email ||
      !payload.role ||
      !payload.expiresAt ||
      payload.expiresAt < Date.now()
    ) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function createSession(user) {
  const expiresAt = Date.now() + SESSION_DURATION * 1000;

  const token = createToken({
    email: user.email,
    name: user.name,
    role: user.role,
    expiresAt,
  });

  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION,
  });
}

export async function getSession() {
  const cookieStore = await cookies();

  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifyToken(token);
}

export async function deleteSession() {
  const cookieStore = await cookies();

  cookieStore.delete(COOKIE_NAME);
}
