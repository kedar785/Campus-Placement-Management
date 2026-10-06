import { useState } from "react";
import "./App.css";
import StudentRegister from "./pages/StudentRegister";
import StudentDashboard from "./pages/StudentDashboard";
import AvailableJobs from "./pages/AvailableJobs";
import MyApplications from "./pages/MyApplications";
import StudentProfile from "./pages/StudentProfile";
import Eligibility from "./pages/Eligibility";
import AdminDashboard from "./pages/AdminDashboard";
import CompanyManagement from "./pages/CompanyManagement";
import JobManagement from "./pages/JobManagement";


function App() {
  const [role, setRole] = useState("Student");
  const [showRegister, setShowRegister] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showJobs, setShowJobs] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [applications, setApplications] = useState([]);
  const [showEligibility, setShowEligibility] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
const [showCompanies, setShowCompanies] = useState(false);
const [showJobsManagement, setShowJobsManagement] = useState(false);




  // Registration page
  if (showRegister) {
    return (
      <StudentRegister
        onBack={() => setShowRegister(false)}
      />
    );
  }
  // Eligibility page
if (showEligibility) {
  return (
    <Eligibility
      onBack={() => {
        setShowEligibility(false);
        setShowDashboard(true);
      }}
    />
  );
}
// Company Management
if (showCompanies) {
  return (
    <CompanyManagement
      onBack={() => {
        setShowCompanies(false);
        setShowAdminDashboard(true);
      }}
    />
  );
}
if (showJobsManagement) {
  return (
    <JobManagement
      onBack={() => {
        setShowJobsManagement(false);
        setShowAdminDashboard(true);
      }}
    />
  );
}
// Admin Dashboard
if (showAdminDashboard) {
  return (
    <AdminDashboard
      onBack={() => {
        setShowAdminDashboard(false);
      }}
      onViewCompanies={() => {
        setShowAdminDashboard(false);
        setShowCompanies(true);
      }}
      onViewJobs={() => {
        setShowAdminDashboard(false);
        setShowJobsManagement(true);
      }}
    />
  );
}
// Student Profile page
if (showProfile) {
  return (
    <StudentProfile
      onBack={() => {
        setShowProfile(false);
        setShowDashboard(true);
      }}
    />
  );
}
  // My Applications page
  if (showApplications) {
    return (
      <MyApplications
        applications={applications}
        onBack={() => {
          setShowApplications(false);
          setShowDashboard(true);
        }}
      />
    );
  }

  // Available Jobs page
  if (showJobs) {
    return (
      <AvailableJobs
        onBack={() => {
          setShowJobs(false);
          setShowDashboard(true);
        }}
        onApply={(job) => {
          setApplications((previousApplications) => {
            const alreadyApplied = previousApplications.some(
              (application) => application.company === job.company
            );

            if (alreadyApplied) {
              return previousApplications;
            }

            return [
              ...previousApplications,
              {
                ...job,
                appliedDate: new Date().toLocaleDateString("en-IN"),
                status: "Applied",
              },
            ];
          });
        }}
      />
    );
  }

  // Student Dashboard
  if (showDashboard) {
    return (
     <StudentDashboard
  onViewProfile={() => {
    setShowDashboard(false);
    setShowProfile(true);
  }}
  onViewEligibility={() => {
  setShowDashboard(false);
  setShowEligibility(true);
}}
  onViewJobs={() => {
          setShowDashboard(false);
          setShowJobs(true);
        }}
        onViewApplications={() => {
          setShowDashboard(false);
          setShowApplications(true);
        }}
      />
    );
  }

  // Login page
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
            onClick={() => {
  if (role === "Admin") {
    setShowAdminDashboard(true);
  } else {
    setShowDashboard(true);
  }
}}
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