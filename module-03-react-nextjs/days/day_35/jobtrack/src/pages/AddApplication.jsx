import { useState } from "react";

function AddApplication() {
  const [form, setForm] = useState({
    company: "",
    position: "",
    location: "",
    date: "",
    status: "Applied",
    notes: "",
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

    console.log("Application:", form);
  }

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">NEW APPLICATION</p>

          <h1>Add Application</h1>

          <p className="page-description">
            Keep a record of a new job application.
          </p>
        </div>
      </div>

      <form className="application-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="company">Company Name</label>

          <input
            id="company"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Example: ABC Technology"
          />
        </div>

        <div className="form-group">
          <label htmlFor="position">Job Position</label>

          <input
            id="position"
            name="position"
            value={form.position}
            onChange={handleChange}
            placeholder="Example: Frontend Developer"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="location">Location</label>

            <input
              id="location"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Addis Ababa"
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Application Date</label>

            <input
              id="date"
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>

          <select
            id="status"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="Applied">Applied</option>

            <option value="Interview">Interview</option>

            <option value="Rejected">Rejected</option>

            <option value="Offer">Offer</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>

          <textarea
            id="notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Add any important notes..."
            rows="5"
          />
        </div>

        <button type="submit" className="primary-button">
          Add Application
        </button>
      </form>
    </section>
  );
}

export default AddApplication;
