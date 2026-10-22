"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const next = searchParams.get("next") || "/dashboard";
  const safeNext =
    next.startsWith("/") && !next.startsWith("//") && !next.includes("\\")
      ? next
      : "/dashboard";

  function handleSubmit(event) {
    event.preventDefault();

    try {
      const savedUser = JSON.parse(
        localStorage.getItem("campusConnectUser") || "null",
      );

      if (
        !savedUser ||
        savedUser.email !== email.trim().toLowerCase() ||
        savedUser.password !== password
      ) {
        setError("The email or password is incorrect. Please try again.");
        return;
      }

      localStorage.setItem(
        "campusConnectSession",
        JSON.stringify({
          id: savedUser.id,
          name: savedUser.name,
          email: savedUser.email,
        }),
      );

      router.push(safeNext);
    } catch {
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-2">
      <section className="relative hidden overflow-hidden bg-gradient-to-br from-violet-950 via-violet-800 to-indigo-700 p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
        <div className="absolute -right-20 top-24 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl" />

        <Link
          href="/"
          className="relative flex items-center gap-3 text-xl font-extrabold"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-2xl">
            C
          </span>
          CampusConnect
        </Link>

        <div className="relative max-w-lg">
          <p className="font-bold tracking-[0.2em] text-violet-300">
            WELCOME BACK
          </p>
          <h1 className="mt-5 text-5xl leading-tight font-extrabold xl:text-6xl">
            Your campus journey continues here.
          </h1>
          <p className="mt-6 text-lg leading-8 text-violet-100">
            Return to your student space to explore learning resources, discover
            opportunities, and stay connected with campus life.
          </p>

          <div className="mt-10 space-y-4">
            {[
              ["📚", "Explore learning resources"],
              ["📣", "Keep up with campus updates"],
              ["🎓", "Discover student opportunities"],
            ].map(([icon, text]) => (
              <div key={text} className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-xl">
                  {icon}
                </span>
                <span className="font-medium text-violet-100">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-sm text-violet-200">
          Learn more. Connect more. Grow together.
        </p>
      </section>

      <section className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-12">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-violet-700 lg:hidden"
          >
            ← Back to home
          </Link>

          <div className="mt-8 lg:mt-0">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-3xl">
              👋
            </div>
            <p className="mt-7 font-bold tracking-widest text-violet-700">
              YOUR STUDENT SPACE
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Welcome back!
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              Sign in to continue your CampusConnect journey.
            </p>
          </div>

          {searchParams.get("error") === "auth" && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              Please sign in to continue.
            </div>
          )}

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
                htmlFor="email"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-bold text-slate-700"
                >
                  Password
                </label>
                <span className="text-xs text-slate-500">Demo account</span>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
              />
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-700 px-5 py-4 font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-800 focus:outline-none focus:ring-4 focus:ring-violet-200"
            >
              Sign in to CampusConnect
              <span aria-hidden="true">→</span>
            </button>
          </form>

          <div className="mt-7 rounded-xl bg-violet-50 p-4">
            <p className="text-sm leading-6 text-slate-600">
              Sign in using the account you created on this browser. Your demo
              account is stored locally on this device.
            </p>
          </div>

          <p className="mt-7 text-center text-sm text-slate-600">
            New to CampusConnect?{" "}
            <Link
              href="/signup"
              className="font-bold text-violet-700 hover:text-violet-900"
            >
              Create an account
            </Link>
          </p>

          <p className="mt-8 text-center text-xs leading-5 text-slate-400">
            By continuing, you are accessing the CampusConnect student community
            prototype.
          </p>
        </div>
      </section>
    </main>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-white" />}>
      <SignInForm />
    </Suspense>
  );
}
