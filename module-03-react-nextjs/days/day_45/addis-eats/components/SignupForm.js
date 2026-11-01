"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      router.push("/orders");
      router.refresh();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h1>Create your account ♡</h1>

      <p className="form-description">
        Join Addis Eats and enjoy your favorite dishes.
      </p>

      <div className="form-group">
        <label htmlFor="name">Full name</label>

        <input
          id="name"
          name="name"
          className="form-input"
          value={form.name}
          onChange={handleChange}
          required
          minLength={2}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email address</label>

        <input
          id="email"
          name="email"
          type="email"
          className="form-input"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>

        <input
          id="password"
          name="password"
          type="password"
          className="form-input"
          value={form.password}
          onChange={handleChange}
          required
          minLength={8}
        />
      </div>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="button"
        style={{ width: "100%" }}
        disabled={loading}
      >
        {loading ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
