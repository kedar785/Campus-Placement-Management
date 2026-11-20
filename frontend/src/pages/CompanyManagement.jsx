import { useEffect, useState } from "react";
import "./CompanyManagement.css";

const API_URL = "http://localhost:5000/api/companies";

function CompanyManagement({ onBack }) {
  const [companies, setCompanies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const emptyForm = {
    name: "",
    location: "",
    website: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  // Fetch companies from MySQL
  const fetchCompanies = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Companies load nahi ho payi.");
      }

      setCompanies(data.companies || []);
    } catch (err) {
      setError(err.message || "Server se connection nahi ho paya.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add or Update Company
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Company save nahi hui.");
      }

      setFormData(emptyForm);
      setEditingId(null);
      setShowForm(false);

      await fetchCompanies();
    } catch (err) {
      setError(err.message || "Company save karte samay error aaya.");
    }
  };

  // Start Edit
  const handleEditCompany = (company) => {
    setFormData({
      name: company.company_name,
      location: company.location || "",
      website: company.website || "",
    });

    setEditingId(company.company_id);
    setShowForm(true);
    setError("");
  };

  // Delete Company
  const handleDeleteCompany = async (companyId) => {
    const confirmDelete = window.confirm(
      "Kya aap is company ko delete karna chahte hain?"
    );

    if (!confirmDelete) return;

    setError("");

    try {
      const response = await fetch(`${API_URL}/${companyId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Company delete nahi hui.");
      }

      await fetchCompanies();
    } catch (err) {
      setError(err.message || "Company delete karte samay error aaya.");
    }
  };

  const openAddForm = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setError("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyForm);
    setError("");
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
          onClick={openAddForm}
        >
          + Add Company
        </button>
      </div>

      {error && (
        <p style={{ color: "red", margin: "15px 0" }}>
          {error}
        </p>
      )}

      {showForm && (
        <div className="company-form-card">

          <h2>
            {editingId ? "Edit Company" : "Add New Company"}
          </h2>

          <form onSubmit={handleSubmit}>

            <label>Company Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter company name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Location</label>
            <input
              type="text"
              name="location"
              placeholder="Enter company location"
              value={formData.location}
              onChange={handleChange}
              required
            />

            <label>Website</label>
            <input
              type="url"
              name="website"
              placeholder="https://www.example.com"
              value={formData.website}
              onChange={handleChange}
            />

            <div className="form-buttons">

              <button
                type="submit"
                className="save-company-button"
              >
                {editingId ? "Update Company" : "Add Company"}
              </button>

              <button
                type="button"
                className="cancel-company-button"
                onClick={closeForm}
              >
                Cancel
              </button>

            </div>

          </form>
        </div>
      )}

      <div className="company-grid">

        {loading ? (
          <p>Loading companies...</p>
        ) : companies.length === 0 ? (
          <p>No companies found. Add your first company.</p>
        ) : (
          companies.map((company) => (
            <div
              className="company-card"
              key={company.company_id}
            >

              <div className="company-logo">
                {company.company_name.charAt(0).toUpperCase()}
              </div>

              <h2>{company.company_name}</h2>

              <div className="company-details">

                <p>
                  📍 <strong>Location:</strong> {company.location}
                </p>

                <p>
                  🌐 <strong>Website:</strong>{" "}
                  {company.website || "Not provided"}
                </p>

              </div>

              <div className="company-buttons">

                <button
                  onClick={() => handleEditCompany(company)}
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDeleteCompany(company.company_id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default CompanyManagement;