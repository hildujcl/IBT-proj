import { useEffect, useState } from "react";
import ClubCard from "../components/ClubCard";

function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/data/clubs.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load clubs");
        }

        return response.json();
      })
      .then((data) => {
        setClubs(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load clubs.");
        setLoading(false);
      });
  }, []);

  const filteredClubs = clubs.filter((club) => {
    const matchesSearch = club.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category === "All" || club.category === category;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <p className="message">Loading clubs...</p>;
  }

  if (error) {
    return <p className="message error">{error}</p>;
  }

  return (
    <section className="page">
      <h2>Campus Clubs</h2>

      <p>Discover clubs and communities across campus.</p>

      <div className="filters">
        <input
          type="text"
          placeholder="Search clubs..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="All">All</option>
          <option value="Technology">Technology</option>
          <option value="Academic">Academic</option>
          <option value="Arts">Arts</option>
          <option value="Business">Business</option>
        </select>
      </div>

      {filteredClubs.length === 0 ? (
        <p className="message">No clubs found.</p>
      ) : (
        <div className="grid">
          {filteredClubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Clubs;
