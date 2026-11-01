"use client";

export default function Error({ error, reset }) {
  return (
    <div className="container empty-state">
      <h1>Something went wrong</h1>

      <p>We could not load this page. Please try again.</p>

      <button className="button" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
