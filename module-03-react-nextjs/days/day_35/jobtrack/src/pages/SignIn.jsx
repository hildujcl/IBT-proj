import { useState } from "react";

function SignIn() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log("Login:", form);
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">💼</div>

          <h1>Welcome Back</h1>

          <p>Sign in to continue to JobTrack.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="primary-button full-width">
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
}

export default SignIn;
