export default function SignIn() {
  return (
    <section className="signin-page">
      <div className="signin-card">
        <div className="signin-icon">🍲</div>

        <span className="hero-label">WELCOME BACK</span>

        <h1>Sign in to your account</h1>

        <form>
          <label>
            Email
            <input type="email" placeholder="you@example.com" />
          </label>

          <label>
            Password
            <input type="password" placeholder="••••••••" />
          </label>

          <button className="checkout-button">Sign In</button>
        </form>

        <p className="signup-text">
          Don't have an account?
          <span> Sign Up</span>
        </p>
      </div>
    </section>
  );
}
