import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <article className="event-card">
      <h3>{event.title}</h3>

      <p>
        <strong>Date:</strong> {event.date}
      </p>

      <p>
        <strong>Location:</strong> {event.location}
      </p>

      <p>{event.description}</p>

      <Link to={`/events/${event.id}`} className="btn">
        View Details
      </Link>
    </article>
  );
}

export default EventCard;
