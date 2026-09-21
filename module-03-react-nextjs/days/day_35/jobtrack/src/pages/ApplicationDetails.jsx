import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import StatusBadge from "../components/StatusBadge";

function ApplicationDetails() {
  const { id } = useParams();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/applications.json")
      .then((response) => response.json())
      .then((data) => {
        const foundApplication = data.find((item) => item.id === Number(id));

        setApplication(foundApplication);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <section className="page">
        <p>Loading application...</p>
      </section>
    );
  }

  if (!application) {
    return (
      <section className="page">
        <h1>Application Not Found</h1>

        <Link to="/applications">Back to Applications</Link>
      </section>
    );
  }

  return (
    <section className="page">
      <Link to="/applications" className="back-link">
        ← Back to Applications
      </Link>

      <div className="details-card">
        <div className="details-header">
          <div>
            <p className="eyebrow">APPLICATION DETAILS</p>

            <h1>{application.position}</h1>

            <p className="company">{application.company}</p>
          </div>

          <StatusBadge status={application.status} />
        </div>

        <div className="details-grid">
          <div>
            <strong>Location</strong>
            <p>{application.location}</p>
          </div>

          <div>
            <strong>Application Date</strong>
            <p>{application.date}</p>
          </div>
        </div>

        <div className="notes">
          <strong>Notes</strong>

          <p>{application.notes}</p>
        </div>
      </div>
    </section>
  );
}

export default ApplicationDetails;
