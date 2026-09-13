import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="hero">
      <h2>Welcome to CampusConnect</h2>

      <p>
        Your student community portal for clubs, events, announcements, and
        campus resources.
      </p>

      <div className="quick-links">
        <Link to="/clubs">Explore Clubs</Link>
        <Link to="/events">Upcoming Events</Link>
        <Link to="/resources">Student Resources</Link>
      </div>
    </section>
  );
}

  
 
export default Home;
