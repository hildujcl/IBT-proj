import "server-only";

import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const users = new Map();

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function hashPassword(password, salt = randomBytes(16).toString("hex")) {
  const hash = scryptSync(password, salt, 64).toString("hex");

  return {
    salt,
    hash,
  };
}

function verifyPassword(password, stored) {
  const attemptedHash = scryptSync(password, stored.salt, 64);

  const savedHash = Buffer.from(stored.hash, "hex");

  return (
    attemptedHash.length === savedHash.length &&
    timingSafeEqual(attemptedHash, savedHash)
  );
}

function safeCompare(first, second) {
  const firstBuffer = Buffer.from(first || "");
  const secondBuffer = Buffer.from(second || "");

  return (
    firstBuffer.length === secondBuffer.length &&
    timingSafeEqual(firstBuffer, secondBuffer)
  );
}

export function registerUser({ name, email, password }) {
  const normalizedEmail = normalizeEmail(email);

  if (users.has(normalizedEmail)) {
    throw new Error("An account with this email already exists.");
  }

  if (normalizedEmail === normalizeEmail(process.env.ADMIN_EMAIL || "")) {
    throw new Error("This email is reserved for the administrator.");
  }

  const passwordData = hashPassword(password);

  const user = {
    name: name.trim(),
    email: normalizedEmail,
    role: "customer",
    password: passwordData,
  };

  users.set(normalizedEmail, user);

  return {
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export function verifyCredentials({ email, password }) {
  const normalizedEmail = normalizeEmail(email);

  const adminEmail = normalizeEmail(process.env.ADMIN_EMAIL || "");

  const adminPassword = process.env.ADMIN_PASSWORD || "";

  if (
    adminEmail &&
    adminPassword &&
    normalizedEmail === adminEmail &&
    safeCompare(password, adminPassword)
  ) {
    return {
      name: "Administrator",
      email: adminEmail,
      role: "admin",
    };
  }

  const user = users.get(normalizedEmail);

  if (!user || !verifyPassword(password, user.password)) {
    return null;
  }

  return {
    name: user.name,
    email: user.email,
    role: user.role,
  };
}
