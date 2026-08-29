import { useState } from "react";
import PropTypes from "prop-types";

function DeliveryForm({ total }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "",
  });

  const phoneRegex = /^(09\d{8}|\+2519\d{8})$/;

  const isPhoneValid = phoneRegex.test(form.phone);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    alert(
      `Order confirmed!\nName: ${form.name}\nPhone: ${form.phone}\nArea: ${form.area}\nTotal: ${total} ETB`,
    );
  };

  return (
    <form className="delivery-form" onSubmit={handleSubmit}>
      <h2>TeleBirr Delivery</h2>

      <input
        type="text"
        name="name"
        placeholder="Your name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        type="tel"
        name="phone"
        placeholder="09XXXXXXXX or +2519XXXXXXXX"
        value={form.phone}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="area"
        placeholder="Delivery area"
        value={form.area}
        onChange={handleChange}
        required
      />

      {form.phone && !isPhoneValid && (
        <p className="error">Please enter a valid TeleBirr number.</p>
      )}

      <button
        type="submit"
        disabled={!isPhoneValid || !form.name || !form.area}
      >
        Pay with TeleBirr
      </button>
    </form>
  );
}

DeliveryForm.propTypes = {
  total: PropTypes.number.isRequired,
};

export default DeliveryForm;
