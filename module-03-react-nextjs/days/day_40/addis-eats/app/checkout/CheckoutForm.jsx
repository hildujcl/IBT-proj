"use client";

import { useActionState } from "react";
import { placeOrder } from "../actions";

const initialState = {
  success: false,
  errors: {},
};

export default function CheckoutForm() {
  const [state, formAction, isPending] = useActionState(
    placeOrder,
    initialState,
  );

  if (state.success) {
    return (
      <div className="flex min-h-[500px] items-center justify-center rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-4xl text-emerald-700">
            ✓
          </div>

          <h2 className="mt-6 text-3xl font-extrabold text-emerald-950">
            Order Placed Successfully!
          </h2>

          <p className="mx-auto mt-3 max-w-md text-slate-500">
            Thank you for your order. We will contact you soon.
          </p>

          <a
            href="/"
            className="mt-7 inline-block rounded-lg bg-yellow-400 px-7 py-3 font-bold text-emerald-950 hover:bg-yellow-300"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <h2 className="text-lg font-bold text-emerald-950">
        Customer Information
      </h2>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Name *
          </label>

          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your full name"
            aria-describedby="name-error"
            className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 ${
              state.errors?.name ? "border-red-400" : "border-slate-200"
            }`}
          />

          {state.errors?.name && (
            <p id="name-error" className="mt-2 text-sm text-red-600">
              {state.errors.name}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Phone *
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="09xxxxxxxx"
            aria-describedby="phone-error"
            className={`w-full rounded-lg border px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 ${
              state.errors?.phone ? "border-red-400" : "border-slate-200"
            }`}
          />

          {state.errors?.phone && (
            <p id="phone-error" className="mt-2 text-sm text-red-600">
              {state.errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* Total */}
      <div className="mt-8 flex items-center justify-between rounded-xl bg-emerald-50 p-4">
        <span className="font-semibold text-slate-600">Order Total</span>

        <span className="text-xl font-extrabold text-emerald-700">350 ETB</span>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-5 w-full rounded-lg bg-emerald-700 px-5 py-3.5 font-bold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Placing Order..." : "Place Order"}
      </button>
    </form>
  );
}
