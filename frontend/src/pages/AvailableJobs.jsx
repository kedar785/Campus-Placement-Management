import { useState } from "react";

function AvailableJobs({ jobs, onBack, onApply }) {
  const [appliedJobs, setAppliedJobs] = useState([]);

  const handleApply = (job) => {
    const jobKey = `${job.company}-${job.role}`;

    if (!appliedJobs.includes(jobKey)) {
      setAppliedJobs([
        ...appliedJobs,
        jobKey,
      ]);

      onApply(job);
    }
  };

  return (
    <div className="jobs-page">

      {/* Header */}
      <div className="jobs-header">

        <div>
          <h1>Available Jobs</h1>

          <p>
            Explore current campus placement opportunities
          </p>
        </div>

        <button
          className="back-button"
          onClick={onBack}
        >
          ← Dashboard
        </button>

      </div>

      {/* Jobs */}
      <div className="jobs-grid">

        {jobs.length === 0 ? (
          <div className="no-applications">
            <h2>No Jobs Available</h2>

            <p>
              Currently there are no placement opportunities.
            </p>
          </div>
        ) : (

          jobs.map((job, index) => {

            const jobKey = `${job.company}-${job.role}`;

            const isApplied =
              appliedJobs.includes(jobKey);

            return (
              <div
                className="job-card"
                key={index}
              >

                {/* Company Logo */}
                <div className="company-logo">
                  {job.company.charAt(0)}
                </div>

                {/* Company */}
                <h2>{job.company}</h2>

                {/* Role */}
                <h3>{job.role}</h3>

                {/* Details */}
                <div className="job-details">

                  <p>
                    💰 <strong>Package:</strong>{" "}
                    {job.package}
                  </p>

                  <p>
                    📍 <strong>Location:</strong>{" "}
                    {job.location}
                  </p>

                  <p>
                    🎓 <strong>Minimum CGPA:</strong>{" "}
                    {job.cgpa}
                  </p>

                  <p>
                    💻 <strong>Skills:</strong>{" "}
                    {job.skills}
                  </p>

                </div>

                {/* Apply Button */}
                <button
                  className="apply-button"
                  onClick={() => handleApply(job)}
                  disabled={isApplied}
                >
                  {isApplied
                    ? "✓ Applied"
                    : "Apply Now →"}
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