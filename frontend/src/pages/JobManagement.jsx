import React, { useState } from "react";

function JobManagement({ onBack }) {
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
    {
      company: "Accenture",
      role: "Associate Software Engineer",
      package: "₹5.5 LPA",
      location: "Indore",
      cgpa: "6.0",
      skills: "Java, React, SQL",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    package: "",
    location: "",
    cgpa: "",
    skills: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      company: "",
      role: "",
      package: "",
      location: "",
      cgpa: "",
      skills: "",
    });

    setEditingIndex(null);
    setShowForm(false);
  };

  // Add Job
  const handleAddJob = (e) => {
    e.preventDefault();

    setJobs([...jobs, formData]);

    resetForm();
  };

  // Start Edit
  const handleEditJob = (index) => {
    setFormData(jobs[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  // Update Job
  const handleUpdateJob = (e) => {
    e.preventDefault();

    const updatedJobs = [...jobs];

    updatedJobs[editingIndex] = formData;

    setJobs(updatedJobs);

    resetForm();
  };

  // Delete Job
  const handleDeleteJob = (index) => {
    const updatedJobs = jobs.filter(
      (_, jobIndex) => jobIndex !== index
    );

    setJobs(updatedJobs);
  };

  return (
    <div className="job-management-page">

      {/* Header */}
      <div className="job-header">

        <div>
          <h1>Job Management</h1>
          <p>
            Create and manage campus placement job opportunities
          </p>
        </div>

        <button
          className="back-button"
          onClick={onBack}
        >
          ← Dashboard
        </button>

      </div>

      {/* Action Bar */}
      <div className="job-action-bar">

        <div>
          <h2>Placement Jobs</h2>
          <p>
            Total Jobs: <strong>{jobs.length}</strong>
          </p>
        </div>

        <button
          className="add-job-button"
          onClick={() => {
            setEditingIndex(null);

            setFormData({
              company: "",
              role: "",
              package: "",
              location: "",
              cgpa: "",
              skills: "",
            });

            setShowForm(true);
          }}
        >
          + Add New Job
        </button>

      </div>

      {/* Add / Edit Form */}
      {showForm && (
        <div className="job-form-card">

          <h2>
            {editingIndex !== null
              ? "Edit Job"
              : "Add New Job"}
          </h2>

          <form
            onSubmit={
              editingIndex !== null
                ? handleUpdateJob
                : handleAddJob
            }
          >

            <div className="form-grid">

              <div className="form-group">
                <label>Company Name</label>

                <input
                  type="text"
                  name="company"
                  placeholder="Example: TCS"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Job Role</label>

                <input
                  type="text"
                  name="role"
                  placeholder="Example: Software Engineer"
                  value={formData.role}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Package</label>

                <input
                  type="text"
                  name="package"
                  placeholder="Example: ₹8 LPA"
                  value={formData.package}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Location</label>

                <input
                  type="text"
                  name="location"
                  placeholder="Example: Pune"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Minimum CGPA</label>

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
              </div>

              <div className="form-group">
                <label>Required Skills</label>

                <input
                  type="text"
                  name="skills"
                  placeholder="Example: Java, SQL, DSA"
                  value={formData.skills}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="form-buttons">

              <button
                type="submit"
                className="save-job-button"
              >
                {editingIndex !== null
                  ? "Update Job"
                  : "Add Job"}
              </button>

              <button
                type="button"
                className="cancel-job-button"
                onClick={resetForm}
              >
                Cancel
              </button>

            </div>

          </form>

        </div>
      )}

      {/* Jobs List */}
      <div className="jobs-grid">

        {jobs.map((job, index) => (

          <div
            className="job-card"
            key={index}
          >

            <div className="job-card-top">

              <div className="company-logo">
                {job.company.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2>{job.company}</h2>
                <p>{job.role}</p>
              </div>

            </div>

            <div className="job-details">

              <div className="detail-item">
                <span>💰 Package</span>
                <strong>{job.package}</strong>
              </div>

              <div className="detail-item">
                <span>📍 Location</span>
                <strong>{job.location}</strong>
              </div>

              <div className="detail-item">
                <span>🎓 Minimum CGPA</span>
                <strong>{job.cgpa}</strong>
              </div>

              <div className="detail-item">
                <span>💻 Required Skills</span>
                <strong>{job.skills}</strong>
              </div>

            </div>

            {/* Buttons */}
            <div className="job-buttons">

              <button
                className="edit-button"
                onClick={() => handleEditJob(index)}
              >
                ✏️ Edit
              </button>

              <button
                className="delete-button"
                onClick={() => handleDeleteJob(index)}
              >
                🗑️ Delete
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* Empty State */}
      {jobs.length === 0 && (
        <div className="empty-jobs">
          <h2>No Jobs Available</h2>
          <p>
            Click "Add New Job" to create a placement opportunity.
          </p>
        </div>
      )}

      {/* Page CSS */}
      <style>{`

        * {
          box-sizing: border-box;
        }

        .job-management-page {
          min-height: 100vh;
          padding: 40px;
          background: #f5f7fb;
        }

        .job-header {
          max-width: 1100px;
          margin: 0 auto 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .job-header h1 {
          margin: 0;
          font-size: 30px;
          color: #111827;
        }

        .job-header p {
          margin-top: 8px;
          color: #6b7280;
        }

        .back-button {
          border: none;
          background: #111827;
          color: white;
          padding: 11px 18px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
        }

        .back-button:hover {
          background: #1f2937;
        }

        .job-action-bar {
          max-width: 1100px;
          margin: 0 auto 25px;
          background: white;
          padding: 20px 25px;
          border-radius: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
        }

        .job-action-bar h2 {
          margin: 0;
          color: #111827;
        }

        .job-action-bar p {
          margin: 6px 0 0;
          color: #6b7280;
        }

        .add-job-button {
          border: none;
          background: #2563eb;
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
        }

        .add-job-button:hover {
          background: #1d4ed8;
        }

        .job-form-card {
          max-width: 1100px;
          margin: 0 auto 30px;
          background: white;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
        }

        .job-form-card h2 {
          margin-top: 0;
          margin-bottom: 25px;
          color: #111827;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          margin-bottom: 7px;
          font-weight: 600;
          color: #374151;
          font-size: 14px;
        }

        .form-group input {
          padding: 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
        }

        .form-group input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .form-buttons {
          display: flex;
          gap: 12px;
          margin-top: 25px;
        }

        .save-job-button {
          border: none;
          background: #16a34a;
          color: white;
          padding: 11px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        }

        .save-job-button:hover {
          background: #15803d;
        }

        .cancel-job-button {
          border: none;
          background: #e5e7eb;
          color: #374151;
          padding: 11px 20px;
          border-radius: 8px;
          cursor: pointer;
        }

        .cancel-job-button:hover {
          background: #d1d5db;
        }

        .jobs-grid {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .job-card {
          background: white;
          padding: 25px;
          border-radius: 16px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
        }

        .job-card-top {
          display: flex;
          align-items: center;
          gap: 15px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }

        .company-logo {
          width: 55px;
          height: 55px;
          border-radius: 12px;
          background: #2563eb;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: bold;
        }

        .job-card h2 {
          margin: 0 0 5px;
          color: #111827;
        }

        .job-card-top p {
          margin: 0;
          color: #6b7280;
        }

        .job-details {
          padding: 20px 0;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          padding: 10px 0;
          border-bottom: 1px solid #f1f1f1;
        }

        .detail-item:last-child {
          border-bottom: none;
        }

        .detail-item span {
          color: #6b7280;
          font-size: 14px;
        }

        .detail-item strong {
          color: #111827;
          text-align: right;
          font-size: 14px;
        }

        .job-buttons {
          display: flex;
          gap: 10px;
          padding-top: 5px;
        }

        .edit-button,
        .delete-button {
          border: none;
          padding: 10px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
        }

        .edit-button {
          background: #e8f0ff;
          color: #2563eb;
        }

        .edit-button:hover {
          background: #dbe7ff;
        }

        .delete-button {
          background: #feecec;
          color: #dc2626;
        }

        .delete-button:hover {
          background: #fde0e0;
        }

        .empty-jobs {
          max-width: 1100px;
          margin: 30px auto;
          background: white;
          padding: 50px;
          text-align: center;
          border-radius: 16px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.06);
        }

        .empty-jobs h2 {
          margin-bottom: 10px;
        }

        .empty-jobs p {
          color: #6b7280;
        }

        @media (max-width: 750px) {

          .job-management-page {
            padding: 20px;
          }

          .job-header {
            align-items: flex-start;
            gap: 15px;
          }

          .job-action-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .jobs-grid {
            grid-template-columns: 1fr;
          }

        }

      `}</style>

    </div>
  );
}

export default JobManagement;