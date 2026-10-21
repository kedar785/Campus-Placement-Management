import { useEffect, useState } from "react";

function MyApplications({ applications = [], onBack, currentStudent }) {
  const [dbApplications, setDbApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchApplications() {
      if (!currentStudent?.student_id) {
        setError("Please login again to view your applications.");
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
          throw new Error(data.message || "Failed to fetch applications.");
        }

        const formattedApplications = (data.applications || []).map(
          (application) => {
            const existingJob = applications.find(
              (job) => Number(job.id) === Number(application.job_id)
            );

            return {
              ...existingJob,
              applicationId: application.application_id,
              company: existingJob?.company || `Job ID ${application.job_id}`,
              role: existingJob?.role || "Placement Opportunity",
              package: existingJob?.package || "Not available",
              location: existingJob?.location || "Not available",
              appliedDate: application.applied_at
                ? new Date(application.applied_at).toLocaleDateString("en-IN")
                : "Not available",
              status: application.application_status || "Pending",
            };
          }
        );

        setDbApplications(formattedApplications);
      } catch (err) {
        console.error("Fetch applications error:", err);
        setError("Applications load nahi ho paayi. Backend check karein.");
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
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
          <h2>Loading Applications...</h2>
          <p>Please wait.</p>
        </div>
      ) : error ? (
        <div className="no-applications">
          <h2>Unable to Load Applications</h2>
          <p>{error}</p>
        </div>
      ) : dbApplications.length === 0 ? (
        <div className="no-applications">
          <h2>No Applications Yet</h2>
          <p>
            You have not applied for any placement opportunity yet.
          </p>
        </div>
      ) : (
        <div className="jobs-grid">
          {dbApplications.map((job) => (
            <div className="job-card" key={job.applicationId}>
              <div className="company-logo">
                {job.company.charAt(0)}
              </div>

              <h2>{job.company}</h2>
              <h3>{job.role}</h3>

              <div className="job-details">
                <p>
                  💰 <strong>Package:</strong> {job.package}
                </p>

                <p>
                  📍 <strong>Location:</strong> {job.location}
                </p>

                <p>
                  📅 <strong>Applied:</strong> {job.appliedDate}
                </p>

                <p>
                  📌 <strong>Status:</strong> {job.status}
                </p>
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