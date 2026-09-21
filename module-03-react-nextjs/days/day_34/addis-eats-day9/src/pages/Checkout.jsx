import { useState } from "react";
import { Link } from "react-router-dom";

import { useCartStore } from "../store/cartStore";

function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!/^09\d{8}$/.test(form.phone)) {
    errors.phone = "Enter a valid TeleBirr number.";
  }

  if (!form.area.trim()) {
    errors.area = "Delivery area is required.";
  }

  return errors;
}

export default function Checkout() {
  const items = useCartStore((state) => state.items);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "",
    notes: "",
  });

  const [touched, setTouched] = useState({});

  const [submitting, setSubmitting] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const errors = validate(form);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleBlur(event) {
    setTouched((current) => ({
      ...current,
      [event.target.name]: true,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    setTouched({
      name: true,
      phone: true,
      area: true,
    });

    if (Object.keys(errors).length) {
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
    }, 1200);
  }

  return (
    <section className="checkout-page">
      <div className="checkout-card">
        <div className="checkout-heading">
          <span className="hero-label">CHECKOUT</span>

          <h1>Complete your order</h1>

          <p>Enter your delivery information below.</p>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          <label>
            Full Name
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={touched.name && !!errors.name}
              aria-describedby={"name-error"}
              placeholder="Your full name"
            />
            {touched.name && errors.name && (
              <small id="name-error" role="alert">
                {errors.name}
              </small>
            )}
          </label>

          <label>
            TeleBirr Phone
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={touched.phone && !!errors.phone}
              aria-describedby={"phone-error"}
              placeholder="09XXXXXXXX"
            />
            {touched.phone && errors.phone && (
              <small id="phone-error" role="alert">
                {errors.phone}
              </small>
            )}
          </label>

          <label>
            Delivery Area
            <input
              name="area"
              value={form.area}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={touched.area && !!errors.area}
              aria-describedby={"area-error"}
              placeholder="Bole, Addis Ababa"
            />
            {touched.area && errors.area && (
              <small id="area-error" role="alert">
                {errors.area}
              </small>
            )}
          </label>

          <label>
            Notes
            <span>Optional</span>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Any delivery instructions?"
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="checkout-button"
          >
            {submitting ? "Processing..." : `Place Order — ${total} ETB`}
          </button>
        </form>
      </div>
    </section>
  );
}
