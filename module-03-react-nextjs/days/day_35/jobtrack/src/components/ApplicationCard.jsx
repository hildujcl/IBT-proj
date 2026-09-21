import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

function ApplicationCard({ application }) {
  return (
    <article className="application-card">
      <div className="application-info">
        <h3>{application.position}</h3>

        <p className="company">{application.company}</p>

        <p className="location">📍 {application.location}</p>
      </div>

      <div className="application-status">
        <StatusBadge status={application.status} />

        <Link to={`/applications/${application.id}`} className="view-button">
          View Details
        </Link>
      </div>
    </article>
  );
}

export default ApplicationCard;
