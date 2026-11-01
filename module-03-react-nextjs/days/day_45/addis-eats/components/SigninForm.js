"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SigninForm() {
  const router = useRouter();

  const [form, setForm] = useState({
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
      const response = await fetch("/api/auth/signin", {
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

      if (result.user.role === "admin") {
        router.push("/kitchen");
      } else {
        router.push("/orders");
      }

      router.refresh();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h1>Welcome back ♡</h1>

      <p className="form-description">Sign in to continue with Addis Eats.</p>

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
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
