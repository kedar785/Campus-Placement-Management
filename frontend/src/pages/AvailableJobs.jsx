import { useState } from "react";

function AvailableJobs({ jobs = [], onBack, onApply }) {
  const [appliedJobs, setAppliedJobs] = useState([]);

  const handleApply = (job) => {
    const jobKey = `${job.company}-${job.role}`;

    if (!appliedJobs.includes(jobKey)) {
      setAppliedJobs((previous) => [...previous, jobKey]);

      if (onApply) {
        onApply(job);
      }
    }
  };

  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <div>
          <h1>Available Jobs</h1>
          <p>Explore current campus placement opportunities</p>
        </div>

        <button className="back-button" onClick={onBack}>
          ← Dashboard
        </button>
      </div>

      <div className="jobs-grid">
        {jobs.length === 0 ? (
          <div className="no-applications">
            <h2>No Jobs Available</h2>
            <p>Currently there are no placement opportunities.</p>
          </div>
        ) : (
          jobs.map((job) => {
            const jobKey = `${job.company}-${job.role}`;
            const isApplied = appliedJobs.includes(jobKey);

            return (
              <div className="job-card" key={job.id ?? jobKey}>
                <div className="company-logo">
                  {job.company?.charAt(0) ?? "J"}
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
                    🎓 <strong>Minimum CGPA:</strong> {job.cgpa}
                  </p>
                  <p>
                    💻 <strong>Skills:</strong> {job.skills}
                  </p>
                </div>

                <button
                  className="apply-button"
                  onClick={() => handleApply(job)}
                  disabled={isApplied}
                >
                  {isApplied ? "✓ Applied" : "Apply Now →"}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default AvailableJobs;