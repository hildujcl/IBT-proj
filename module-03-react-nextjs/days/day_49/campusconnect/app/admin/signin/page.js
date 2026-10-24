"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminSignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (
      email.trim().toLowerCase() === "admin@campusconnect.com" &&
      password === "Admin@123!"
    ) {
      localStorage.setItem(
        "campusConnectAdminSession",
        JSON.stringify({ role: "admin", email }),
      );

      router.push("/admin/announcements");
    } else {
      setError("Incorrect email or password.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-5 py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl"
      >
        <Link href="/" className="text-sm font-semibold text-violet-700">
          ← Back to home
        </Link>

        <div className="mt-8 text-4xl">🔐</div>
        <p className="mt-4 text-sm font-bold tracking-widest text-violet-700">
          CAMPUSCONNECT ADMIN
        </p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
          Welcome back
        </h1>
        <p className="mt-2 text-slate-600">
          Sign in to manage campus announcements.
        </p>

        <label className="mt-7 block text-sm font-bold text-slate-700">
          Email
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-violet-600"
          placeholder="admin@campusconnect.com"
        />

        <label className="mt-5 block text-sm font-bold text-slate-700">
          Password
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-violet-600"
          placeholder="Enter admin password"
        />

        {error && (
          <p role="alert" className="mt-4 text-sm font-semibold text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="mt-7 w-full rounded-xl bg-violet-700 px-5 py-3 font-bold text-white hover:bg-violet-800"
        >
          Sign in as Admin →
        </button>

        <p className="mt-5 text-xs leading-5 text-slate-500"></p>
      </form>
    </main>
  );
}
