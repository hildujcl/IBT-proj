import { useRef, useState } from "react";
import { useCartStore } from "../store/cartStore";

function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!/^(09\d{8}|\+2519\d{8})$/.test(form.phone)) {
    errors.phone = "Enter a valid TeleBirr phone number.";
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
  const [requestError, setRequestError] = useState("");

  const firstErrorRef = useRef(null);

  const errors = validate(form);

  const total = items.reduce((sum, item) => sum + Number(item.price), 0);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));

    setRequestError("");
  }

  function handleBlur(e) {
    const { name } = e.target;

    setTouched((previousTouched) => ({
      ...previousTouched,
      [name]: true,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const currentErrors = validate(form);

    setTouched({
      name: true,
      phone: true,
      area: true,
      notes: true,
    });

    if (Object.keys(currentErrors).length > 0) {
      const firstError = Object.keys(currentErrors)[0];

      document.getElementById(firstError)?.focus();

      return;
    }

    if (submitting) {
      return;
    }

    setSubmitting(true);
    setRequestError("");

    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 1500);
      });

      alert("Order placed successfully!");
    } catch (error) {
      setRequestError(
        "Checkout failed. Please check your connection and try again.",
      );

      firstErrorRef.current?.focus();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="checkout-page">
      <h1>Addis Eats Checkout</h1>

      <p className="checkout-total">
        Your total: <strong>{total} ETB</strong>
      </p>

      {requestError && (
        <div className="request-error" role="alert">
          {requestError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Name */}
        <div className="form-group">
          <label htmlFor="name">Full Name</label>

          <input
            ref={errors.name && touched.name ? firstErrorRef : null}
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touched.name && errors.name ? "true" : "false"}
            aria-describedby={
              touched.name && errors.name ? "name-error" : undefined
            }
          />

          {touched.name && errors.name && (
            <p id="name-error" className="error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="form-group">
          <label htmlFor="phone">TeleBirr Phone Number</label>

          <input
            ref={
              errors.phone && touched.phone && !errors.name
                ? firstErrorRef
                : null
            }
            id="phone"
            name="phone"
            type="tel"
            placeholder="09XXXXXXXX"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touched.phone && errors.phone ? "true" : "false"}
            aria-describedby={
              touched.phone && errors.phone ? "phone-error" : undefined
            }
          />

          {touched.phone && errors.phone && (
            <p id="phone-error" className="error" role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Area */}
        <div className="form-group">
          <label htmlFor="area">Delivery Area</label>

          <input
            ref={
              errors.area && touched.area && !errors.name && !errors.phone
                ? firstErrorRef
                : null
            }
            id="area"
            name="area"
            type="text"
            placeholder="Bole"
            value={form.area}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touched.area && errors.area ? "true" : "false"}
            aria-describedby={
              touched.area && errors.area ? "area-error" : undefined
            }
          />

          {touched.area && errors.area && (
            <p id="area-error" className="error" role="alert">
              {errors.area}
            </p>
          )}
        </div>

        {/* Notes */}
        <div className="form-group">
          <label htmlFor="notes">
            Notes <span>(optional)</span>
          </label>

          <textarea
            id="notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        {/* Submit */}
        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : `Place Order — ${total} ETB`}
        </button>
      </form>
    </main>
  );
}
