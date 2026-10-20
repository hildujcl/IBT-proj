import test from "node:test";
import assert from "node:assert/strict";
import { createSessionToken, verifySessionToken, safeReturnPath } from "../lib/session-core.js";

const user = { id: "student-1", name: "Campus Student", email: "STUDENT@example.test" };
test("valid signed session token returns a minimal user", () => {
  const token = createSessionToken(user, 1_800_000_000_000);
  assert.deepEqual(verifySessionToken(token, 1_800_000_000_001), { id: "student-1", name: "Campus Student", email: "student@example.test" });
});
test("modified token is rejected", () => {
  const token = createSessionToken(user);
  const [payload, sig] = token.split(".");
  assert.equal(verifySessionToken(`${payload}.${sig.slice(0, -1)}x`), null);
});
test("expired token is rejected", () => {
  const token = createSessionToken(user, 1_000);
  assert.equal(verifySessionToken(token, 1_000 + 7 * 24 * 60 * 60 * 1000), null);
});
test("malformed tokens are rejected without throwing", () => {
  for (const token of [null, "", "abc", "a.b.c", "%%%..%%%", 42]) assert.equal(verifySessionToken(token), null);
});
test("local return paths are accepted", () => {
  assert.equal(safeReturnPath("/events?category=study#top"), "/events?category=study#top");
});
test("external and protocol-relative return paths fall back safely", () => {
  for (const path of ["https://example.com", "//example.com", "\\\\example.com", "javascript:alert(1)", "\r\nLocation: https://example.com"]) {
    assert.equal(safeReturnPath(path), "/dashboard");
  }
});
