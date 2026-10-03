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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Student Registration Data:", formData);

    alert("Registration form submitted!");
  };

  return (
    <div className="register-page">
      <div className="register-card">

        <h1>Student Registration</h1>
        <p>Create your placement account</p>

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
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
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

          <button type="submit">
            Create Account
          </button>

          <button type="button" onClick={onBack}>
            Back to Login
          </button>

        </form>

      </div>
    </div>
  );
}

export default StudentRegister;