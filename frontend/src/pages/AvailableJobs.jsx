import { useState } from "react";

function AvailableJobs({ onBack, onApply }) {
  const [appliedJobs, setAppliedJobs] = useState([]);

  const jobs = [
    {
      company: "TCS",
      role: "Graduate Engineer Trainee",
      package: "₹7 LPA",
      location: "Pune",
      cgpa: "6.5",
      skills: "Java, SQL, DSA",
    },
    {
      company: "Infosys",
      role: "System Engineer",
      package: "₹6.5 LPA",
      location: "Bengaluru",
      cgpa: "6.0",
      skills: "Java, Python, SQL",
    },
    {
      company: "Accenture",
      role: "Associate Software Engineer",
      package: "₹5.5 LPA",
      location: "Indore",
      cgpa: "6.0",
      skills: "Java, React, SQL",
    },
    {
      company: "Wipro",
      role: "Project Engineer",
      package: "₹4.5 LPA",
      location: "Hyderabad",
      cgpa: "6.0",
      skills: "Java, C++, SQL",
    },
  ];

 const handleApply = (job) => {
  if (!appliedJobs.includes(job.company)) {
    setAppliedJobs([...appliedJobs, job.company]);

    onApply(job);
  }
};
  return (
    <div className="jobs-page">

      <div className="jobs-header">
        <div>
          <h1>Available Jobs</h1>
          <p>Explore current campus placement opportunities</p>
        </div>

        <button
          className="back-button"
          onClick={onBack}
        >
          ← Dashboard
        </button>
      </div>

      <div className="jobs-grid">

        {jobs.map((job, index) => {

          const isApplied = appliedJobs.includes(job.company);

          return (
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
        })}

      </div>

    </div>
  );
}

export default AvailableJobs;