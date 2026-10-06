function MyApplications({ applications, onBack }) {
  return (
    <div className="jobs-page">

      <div className="jobs-header">
        <div>
          <h1>My Applications</h1>
          <p>Track your campus placement applications</p>
        </div>

        <button
          className="back-button"
          onClick={onBack}
        >
          ← Dashboard
        </button>
      </div>

      {applications.length === 0 ? (
        <div className="no-applications">
          <h2>No Applications Yet</h2>
          <p>
            You have not applied for any placement opportunity yet.
          </p>
        </div>
      ) : (
        <div className="jobs-grid">

          {applications.map((job, index) => (
            <div className="job-card" key={index}>

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

              <button
                className="apply-button"
                disabled
              >
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