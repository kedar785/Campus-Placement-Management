import { useState } from "react";

function JobManagement() {
  const [jobs, setJobs] = useState([
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
  ]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    package: "",
    location: "",
    cgpa: "",
    skills: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddJob = (e) => {
    e.preventDefault();

    setJobs([
      ...jobs,
      formData,
    ]);

    setFormData({
      company: "",
      role: "",
      package: "",
      location: "",
      cgpa: "",
      skills: "",
    });

    setShowForm(false);
  };

  return (
    <div style={{ padding: "40px" }}>

      <h1>Job Management</h1>

      <p>
        Manage campus placement job opportunities
      </p>

      <button onClick={() => setShowForm(true)}>
        + Add Job
      </button>

      {showForm && (
        <div style={{ marginTop: "30px" }}>

          <h2>Add New Job</h2>

          <form onSubmit={handleAddJob}>

            <label>Company Name</label>
            <br />
            <input
              type="text"
              name="company"
              placeholder="Enter company name"
              value={formData.company}
              onChange={handleChange}
              required
            />

            <br /><br />

            <label>Job Role</label>
            <br />
            <input
              type="text"
              name="role"
              placeholder="Enter job role"
              value={formData.role}
              onChange={handleChange}
              required
            />

            <br /><br />

            <label>Package</label>
            <br />
            <input
              type="text"
              name="package"
              placeholder="Example: ₹8 LPA"
              value={formData.package}
              onChange={handleChange}
              required
            />

            <br /><br />

            <label>Location</label>
            <br />
            <input
              type="text"
              name="location"
              placeholder="Enter location"
              value={formData.location}
              onChange={handleChange}
              required
            />

            <br /><br />

            <label>Minimum CGPA</label>
            <br />
            <input
              type="number"
              name="cgpa"
              placeholder="Example: 6.5"
              step="0.1"
              min="0"
              max="10"
              value={formData.cgpa}
              onChange={handleChange}
              required
            />

            <br /><br />

            <label>Required Skills</label>
            <br />
            <input
              type="text"
              name="skills"
              placeholder="Example: Java, SQL, DSA"
              value={formData.skills}
              onChange={handleChange}
              required
            />

            <br /><br />

            <button type="submit">
              Add Job
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>

          </form>

        </div>
      )}

      <hr />

      <h2>Available Jobs</h2>

      {jobs.map((job, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            marginTop: "15px",
            borderRadius: "10px",
          }}
        >
          <h2>{job.company}</h2>

          <p>
            <strong>Role:</strong> {job.role}
          </p>

          <p>
            <strong>Package:</strong> {job.package}
          </p>

          <p>
            <strong>Location:</strong> {job.location}
          </p>

          <p>
            <strong>Minimum CGPA:</strong> {job.cgpa}
          </p>

          <p>
            <strong>Skills:</strong> {job.skills}
          </p>
        </div>
      ))}

    </div>
  );
}

export default JobManagement;