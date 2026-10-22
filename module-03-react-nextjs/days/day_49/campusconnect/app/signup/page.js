"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (cleanName.length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    try {
      const savedUser = JSON.parse(
        localStorage.getItem("campusConnectUser") || "null",
      );

      if (savedUser?.email === cleanEmail) {
        setError("An account with this email already exists on this browser.");
        return;
      }

      const newUser = {
        id: `student-${Date.now()}`,
        name: cleanName,
        email: cleanEmail,
        password,
      };

      localStorage.setItem("campusConnectUser", JSON.stringify(newUser));

      localStorage.setItem(
        "campusConnectSession",
        JSON.stringify({
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        }),
      );

      router.push("/dashboard?welcome=1");
    } catch {
      setError("Unable to save your account. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-950 via-purple-800 to-violet-600 px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="text-sm font-semibold text-purple-200 transition hover:text-white"
          >
            ← Back to Home
          </Link>

          <div className="mt-10 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-purple-200">
              Your campus community
            </p>

            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Create your CampusConnect account
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-purple-100">
              Discover campus events, find useful resources, and stay connected
              with your university community.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 sm:py-16">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center">
          <div className="hidden lg:block">
            <div className="rounded-3xl bg-violet-100 p-10">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-700 text-3xl text-white">
                ✨
              </div>

              <h2 className="mt-7 text-3xl font-bold text-slate-900">
                Make campus life more connected.
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Everything happening around your campus, gathered in one
                convenient place.
              </p>

              <ul className="mt-8 space-y-4 text-slate-700">
                <li>✓ Discover upcoming events</li>
                <li>✓ Explore learning resources</li>
                <li>✓ Stay updated with announcements</li>
              </ul>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-violet-100/60 sm:p-10">
            <h2 className="text-2xl font-bold text-slate-900">
              Create your account
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Fill in your details to get started.
            </p>

            {error && (
              <div
                role="alert"
                className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@university.edu"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  autoComplete="new-password"
                  minLength={8}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Use at least 8 characters.
                </p>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-violet-700 px-5 py-3.5 font-bold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-200"
              >
                Create Account →
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="font-bold text-violet-700 hover:text-violet-900"
              >
                Sign in
              </Link>
            </p>

            <p className="mt-5 text-center text-xs leading-5 text-slate-400">
              By creating an account, you agree to follow your campus community
              guidelines.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
