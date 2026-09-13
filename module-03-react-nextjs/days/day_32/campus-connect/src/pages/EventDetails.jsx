import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function ClubDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/data/clubs.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load club");
        }

        return response.json();
      })
      .then((data) => {
        const selectedClub = data.find((item) => item.id === id);

        if (!selectedClub) {
          throw new Error("Club not found");
        }

        setClub(selectedClub);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="message">Loading club...</p>;
  }

  if (error) {
    return (
      <section className="page">
        <p className="message error">{error}</p>
        <Link to="/clubs">Back to Clubs</Link>
      </section>
    );
  }

  return (
    <section className="page details">
      <button onClick={() => navigate(-1)}>← Go Back</button>

      <img src={club.image} alt={club.name} />

      <h2>{club.name}</h2>

      <p>{club.description}</p>

      <h3>Category</h3>
      <p>{club.category}</p>

      <h3>Meeting Information</h3>
      <p>{club.meeting}</p>

      <h3>Members</h3>
      <p>{club.members} students</p>

      <Link to="/clubs">View All Clubs</Link>
    </section>
  );
}

export default ClubDetails;
