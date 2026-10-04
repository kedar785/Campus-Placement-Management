import { useState } from "react";
import "./App.css";
import StudentRegister from "./pages/StudentRegister";
import StudentDashboard from "./pages/StudentDashboard";
import AvailableJobs from "./pages/AvailableJobs";
function App() {
  const [role, setRole] = useState("Student");
  const [showRegister, setShowRegister] = useState(false);
const [showDashboard, setShowDashboard] = useState(false);
const [showJobs, setShowJobs] = useState(false);
  // Registration page
  if (showRegister) {
    return (
      <StudentRegister
        onBack={() => setShowRegister(false)}
      />
    );
  }
   if (showJobs) {
  return (
    <AvailableJobs
      onBack={() => {
        setShowJobs(false);
        setShowDashboard(true);
      }}
    />
  );
}

if (showDashboard) {
  return (
    <StudentDashboard
      onViewJobs={() => {
        setShowDashboard(false);
        setShowJobs(true);
      }}
    />
  );
}
  return (
    <div className="app">
      <div className="login-container">

        <div className="left-section">
          <h1>Campus Placement</h1>
          <h2>Management System</h2>

          <p>
            Manage campus placements, job applications and student
            recruitment in one place.
          </p>

          <div className="features">
            <p>✓ Student Placement Management</p>
            <p>✓ Company & Job Management</p>
            <p>✓ Application Tracking</p>
          </div>
        </div>

        <div className="login-card">
          <h2>Welcome Back</h2>
          <p className="subtitle">Login to your account</p>

          <div className="role-buttons">
            <button
              className={role === "Student" ? "active" : ""}
              onClick={() => setRole("Student")}
            >
              Student
            </button>

            <button
              className={role === "Admin" ? "active" : ""}
              onClick={() => setRole("Admin")}
            >
              Admin
            </button>
          </div>

          <form>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
            />

           <button
  type="button"
  className="login-button"
  onClick={() => setShowDashboard(true)}
>
  Login as {role}
</button>
          </form>

          <p className="register">
            New student?{" "}
            <span
              onClick={() => setShowRegister(true)}
              style={{ cursor: "pointer" }}
            >
              Register here
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}

export default App;