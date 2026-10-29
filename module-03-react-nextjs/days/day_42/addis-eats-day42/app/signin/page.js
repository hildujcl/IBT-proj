import Link from "next/link";
import { Suspense } from "react";

function SignInForm({ searchParams }) {
  return (
    <Suspense
      fallback={<p className="signin-loading">Loading sign-in form...</p>}
    >
      <SignInFields searchParams={searchParams} />
    </Suspense>
  );
}

async function SignInFields({ searchParams }) {
  const params = await searchParams;
  const next =
    typeof params?.next === "string" &&
    params.next.startsWith("/") &&
    !params.next.startsWith("//") &&
    !params.next.includes("\\")
      ? params.next
      : "/";

  return (
    <form action="/api/signin" method="POST" className="signin-form">
      <input type="hidden" name="next" value={next} />

      <label htmlFor="email">Email address</label>
      <input
        id="email"
        type="email"
        name="email"
        placeholder="user@example.com"
        autoComplete="email"
        required
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        name="password"
        placeholder="Enter your password"
        autoComplete="current-password"
        required
      />

      <button type="submit" className="button">
        Sign In
      </button>
    </form>
  );
}

export default function SignInPage({ searchParams }) {
  return (
    <main className="content signin-page">
      <Link href="/" className="signin-home">
        ← Back to Home
      </Link>

      <section className="signin-card">
        <p className="eyebrow">WELCOME BACK</p>
        <h1>Sign in to Addis Eats</h1>
        <p className="signin-description">
          Sign in to access your orders and enjoy your favorite Ethiopian
          dishes.
        </p>

        <SignInForm searchParams={searchParams} />

        <p className="signup-prompt">
          New here? <Link href="/signup">Create an account</Link>
        </p>
      </section>
    </main>
  );
}
