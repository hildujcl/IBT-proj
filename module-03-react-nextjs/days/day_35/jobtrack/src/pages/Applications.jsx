import { useEffect, useState } from "react";
import ApplicationCard from "../components/ApplicationCard";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/applications.json")
      .then((response) => response.json())
      .then((data) => {
        setApplications(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load applications:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="page">
        <h1>Applications</h1>
        <p>Loading applications...</p>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">JOB TRACKER</p>

          <h1>Applications</h1>

          <p className="page-description">
            Search and manage your job applications.
          </p>
        </div>
      </div>

      <div className="filter-bar">
        <input type="text" placeholder="Search applications..." />

        <select defaultValue="All">
          <option value="All">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
          <option value="Offer">Offer</option>
        </select>
      </div>

      <div className="applications-list">
        {applications.map((application) => (
          <ApplicationCard key={application.id} application={application} />
        ))}
      </div>
    </section>
  );
}

export default Applications;
