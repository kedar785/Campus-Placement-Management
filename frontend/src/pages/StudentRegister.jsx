import { useState } from "react";

function StudentRegister({ onBack }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    college: "",
    course: "B.Tech CSE",
    cgpa: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/students/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            password: formData.password,
            phone: formData.phone.trim(),
            branch: formData.course,
            cgpa: Number(formData.cgpa),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      setMessage("Registration successful! Your account has been created.");
      setMessageType("success");

      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        college: "",
        course: "B.Tech CSE",
        cgpa: "",
      });
    } catch (error) {
      setMessage(
        error.message === "Failed to fetch"
          ? "Backend se connection nahi ho pa raha. Please check that the backend is running."
          : error.message
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h1>Student Registration</h1>
        <p>Create your placement account</p>

        {message && (
          <div
            role="status"
            style={{
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "6px",
              color: messageType === "success" ? "green" : "red",
              backgroundColor:
                messageType === "success" ? "#e8f7e8" : "#fdeaea",
            }}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create password (minimum 8 characters)"
            value={formData.password}
            onChange={handleChange}
            minLength={8}
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label>College</label>
          <input
            type="text"
            name="college"
            placeholder="Enter college name"
            value={formData.college}
            onChange={handleChange}
            required
          />

          <label>Course</label>
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
          >
            <option value="B.Tech CSE">B.Tech CSE</option>
            <option value="B.Tech IT">B.Tech IT</option>
            <option value="B.Tech ECE">B.Tech ECE</option>
            <option value="B.Tech ME">B.Tech ME</option>
          </select>

          <label>CGPA</label>
          <input
            type="number"
            name="cgpa"
            placeholder="Enter CGPA"
            step="0.01"
            min="0"
            max="10"
            value={formData.cgpa}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <button type="button" onClick={onBack} disabled={loading}>
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default StudentRegister;