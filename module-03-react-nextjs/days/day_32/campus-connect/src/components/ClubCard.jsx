import { Link } from "react-router-dom";

function ClubCard({ club }) {
  return (
    <article className="card">
      <img src={club.image} alt={club.name} />

      <div className="card-content">
        <span>{club.category}</span>

        <h3>{club.name}</h3>

        <p>{club.description}</p>

        <p>
          <strong>Members:</strong> {club.members}
        </p>

        <Link to={`/clubs/${club.id}`}>View Club</Link>
      </div>
    </article>
  );
}

export default ClubCard;
