import Link from "next/link";

export const metadata = {
  title: "Create Account | Addis Eats",
  description:
    "Create your Addis Eats account to explore Ethiopian dishes and manage your orders.",
};

export default function SignUpPage() {
  return (
    <main className="signup-page">
      <Link href="/" className="signup-back">
        ← Back to Home
      </Link>

      <section className="signup-card">
        <div className="signup-brand">
          <span className="signup-icon">🍲</span>
          <span>Addis Eats</span>
        </div>

        <p className="eyebrow">JOIN OUR TABLE</p>
        <h1>Create your account</h1>
        <p className="signup-description">
          Discover Ethiopian favorites and make ordering your next delicious
          meal simple.
        </p>

        <form action="/api/signup" method="POST" className="signup-form">
          <div className="signup-field">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              autoComplete="name"
              required
            />
          </div>

          <div className="signup-field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="signup-field">
            <label htmlFor="phone">Phone number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="09XXXXXXXX"
              autoComplete="tel"
              pattern="(09[0-9]{8}|\+2519[0-9]{8})"
              title="Enter a number like 0912345678 or +251912345678"
              required
            />
          </div>

          <div className="signup-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              autoComplete="new-password"
              minLength={8}
              required
            />
            <small>Use at least 8 characters.</small>
          </div>

          <button type="submit" className="signup-submit">
            Create Account <span aria-hidden="true">→</span>
          </button>
        </form>

        <p className="signup-login">
          Already have an account? <Link href="/signin">Sign in</Link>
        </p>

        <p className="signup-note">
          Your next favorite Ethiopian meal is waiting.
        </p>
      </section>
    </main>
  );
}
