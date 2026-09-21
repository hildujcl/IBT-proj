import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">WELCOME BACK</p>

          <h1>Your Job Dashboard</h1>

          <p className="page-description">
            Keep track of your job applications in one place.
          </p>
        </div>

        <Link to="/add-application" className="primary-button">
          + Add Application
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span>📋</span>
          <h2>12</h2>
          <p>Total Applications</p>
        </div>

        <div className="stat-card">
          <span>📨</span>
          <h2>6</h2>
          <p>Applied</p>
        </div>

        <div className="stat-card">
          <span>🎯</span>
          <h2>3</h2>
          <p>Interviews</p>
        </div>

        <div className="stat-card">
          <span>🎉</span>
          <h2>1</h2>
          <p>Offers</p>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Recent Applications</h2>

        <p>Your latest job applications will appear here.</p>
      </div>
    </section>
  );
}

export default Dashboard;
