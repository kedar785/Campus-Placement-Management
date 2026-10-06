import { useState } from "react";
import "./CompanyManagement.css";

function CompanyManagement({ onBack }) {
  const [companies, setCompanies] = useState([
    {
      name: "TCS",
      role: "Graduate Engineer Trainee",
      package: "₹7 LPA",
      location: "Pune",
      cgpa: "6.5",
    },
    {
      name: "Infosys",
      role: "System Engineer",
      package: "₹6.5 LPA",
      location: "Bengaluru",
      cgpa: "6.0",
    },
    {
      name: "Accenture",
      role: "Associate Software Engineer",
      package: "₹5.5 LPA",
      location: "Indore",
      cgpa: "6.0",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    package: "",
    location: "",
    cgpa: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add Company
  const handleAddCompany = (e) => {
    e.preventDefault();

    setCompanies([...companies, formData]);

    setFormData({
      name: "",
      role: "",
      package: "",
      location: "",
      cgpa: "",
    });

    setShowForm(false);
  };

  // Start Edit
  const handleEditCompany = (index) => {
    setFormData(companies[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  // Update Company
  const handleUpdateCompany = (e) => {
    e.preventDefault();

    const updatedCompanies = [...companies];

    updatedCompanies[editingIndex] = formData;

    setCompanies(updatedCompanies);

    setFormData({
      name: "",
      role: "",
      package: "",
      location: "",
      cgpa: "",
    });

    setEditingIndex(null);
    setShowForm(false);
  };

  // Delete Company
  const handleDeleteCompany = (index) => {
    const updatedCompanies = companies.filter(
      (_, companyIndex) => companyIndex !== index
    );

    setCompanies(updatedCompanies);
  };

  return (
    <div className="company-page">

      <div className="company-header">
        <div>
          <h1>Company Management</h1>
          <p>Manage recruiting companies and placement opportunities</p>
        </div>

        <button className="back-button" onClick={onBack}>
          ← Dashboard
        </button>
      </div>

      <div className="company-actions">
        <button
          className="add-company-button"
          onClick={() => {
            setEditingIndex(null);
            setFormData({
              name: "",
              role: "",
              package: "",
              location: "",
              cgpa: "",
            });
            setShowForm(true);
          }}
        >
          + Add Company
        </button>
      </div>

      {showForm && (
        <div className="company-form-card">

          <h2>
            {editingIndex !== null
              ? "Edit Company"
              : "Add New Company"}
          </h2>

          <form
            onSubmit={
              editingIndex !== null
                ? handleUpdateCompany
                : handleAddCompany
            }
          >

            <label>Company Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter company name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Job Role</label>
            <input
              type="text"
              name="role"
              placeholder="Enter job role"
              value={formData.role}
              onChange={handleChange}
              required
            />

            <label>Package</label>
            <input
              type="text"
              name="package"
              placeholder="Example: ₹8 LPA"
              value={formData.package}
              onChange={handleChange}
              required
            />

            <label>Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter job location"
              value={formData.location}
              onChange={handleChange}
              required
            />

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

            <div className="form-buttons">

              <button
                type="submit"
                className="save-company-button"
              >
                {editingIndex !== null
                  ? "Update Company"
                  : "Add Company"}
              </button>

              <button
                type="button"
                className="cancel-company-button"
                onClick={() => {
                  setShowForm(false);
                  setEditingIndex(null);
                }}
              >
                Cancel
              </button>

            </div>

          </form>
        </div>
      )}

      <div className="company-grid">

        {companies.map((company, index) => (
          <div className="company-card" key={index}>

            <div className="company-logo">
              {company.name.charAt(0)}
            </div>

            <h2>{company.name}</h2>

            <h3>{company.role}</h3>

            <div className="company-details">

              <p>
                💰 <strong>Package:</strong> {company.package}
              </p>

              <p>
                📍 <strong>Location:</strong> {company.location}
              </p>

              <p>
                🎓 <strong>Minimum CGPA:</strong> {company.cgpa}
              </p>

            </div>

            <div className="company-buttons">

              <button
                onClick={() => handleEditCompany(index)}
              >
                Edit
              </button>

              <button
                onClick={() => handleDeleteCompany(index)}
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default CompanyManagement;