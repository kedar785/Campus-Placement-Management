
import { useEffect, useState } from "react";

function MyApplications({ applications = [], onBack, currentStudent }) {
  const [myApplications, setMyApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadApplications() {
      if (!currentStudent?.student_id) {
        setError("Please log in again.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/applications/student/${currentStudent.student_id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load applications.");
        }

        const formatted = (data.applications || []).map((app) => {
          const job = applications.find(
            (item) => Number(item.id) === Number(app.job_id)
          );

          return {
            id: app.application_id,
            company: app.company_name || job?.company || `Job ID ${app.job_id}`,
            role: app.job_role || job?.role || "Placement Opportunity",
            package: app.package_lpa != null
              ? `₹${app.package_lpa} LPA`
              : job?.package || "Not available",
            location: app.job_location || job?.location || "Not available",
            appliedDate: app.applied_at
              ? new Date(app.applied_at).toLocaleDateString("en-IN")
              : "Not available",
            status: app.application_status || "Pending",
          };
        });

        setMyApplications(formatted);
      } catch (err) {
        console.error(err);
        setError("Applications load nahi hui. Backend check karein.");
      } finally {
        setLoading(false);
      }
    }

    loadApplications();
  }, [currentStudent, applications]);

  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <div>
          <h1>My Applications</h1>
          <p>Track your campus placement applications</p>
        </div>

        <button className="back-button" onClick={onBack}>
          ← Dashboard
        </button>
      </div>

      {loading ? (
        <div className="no-applications">
          <h2>Loading applications...</h2>
        </div>
      ) : error ? (
        <div className="no-applications">
          <h2>Unable to Load Applications</h2>
          <p>{error}</p>
        </div>
      ) : myApplications.length === 0 ? (
        <div className="no-applications">
          <h2>No Applications Yet</h2>
          <p>You have not applied for any placement opportunity yet.</p>
        </div>
      ) : (
        <div className="jobs-grid">
          {myApplications.map((job) => (
            <div className="job-card" key={job.id}>
              <div className="company-logo">
                {job.company.charAt(0)}
              </div>

              <h2>{job.company}</h2>
              <h3>{job.role}</h3>

              <div className="job-details">
                <p>💰 <strong>Package:</strong> {job.package}</p>
                <p>📍 <strong>Location:</strong> {job.location}</p>
                <p>📅 <strong>Applied:</strong> {job.appliedDate}</p>
                <p>📌 <strong>Status:</strong> {job.status}</p>
              </div>

              <button className="apply-button" disabled>
                ✓ Applied
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyApplications;

