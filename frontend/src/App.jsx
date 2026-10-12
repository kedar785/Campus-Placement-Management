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
import StudentManagement from "./pages/StudentManagement";
import ApplicationManagement from "./pages/ApplicationManagement";

function App() {
  const [role, setRole] = useState("Student");

  // Login form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [currentStudent, setCurrentStudent] = useState(null);

  // Student pages
  const [showRegister, setShowRegister] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showJobs, setShowJobs] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showEligibility, setShowEligibility] = useState(false);

  // Admin pages
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [showCompanies, setShowCompanies] = useState(false);
  const [showJobsManagement, setShowJobsManagement] = useState(false);
  const [showStudentsManagement, setShowStudentsManagement] = useState(false);
  const [showAdminApplications, setShowAdminApplications] = useState(false);

  // Job data
  const [jobs, setJobs] = useState([
    {
      id: 1,
      company: "TCS",
      role: "Graduate Engineer Trainee",
      package: "₹7 LPA",
      location: "Pune",
      cgpa: "6.5",
      skills: "Java, SQL, DSA",
    },
    {
      id: 2,
      company: "Infosys",
      role: "System Engineer",
      package: "₹6.5 LPA",
      location: "Bengaluru",
      cgpa: "6.0",
      skills: "Java, Python, SQL",
    },
  ]);

  // Application data
  const [applications, setApplications] = useState([]);

  // Student Login API
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoginMessage("");

    if (role === "Admin") {
      setLoginMessage(
        "Admin login is not connected to a database yet."
      );
      return;
    }

    if (!email.trim() || !password) {
      setLoginMessage("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/students/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setLoginMessage(data.message || "Login failed.");
        return;
      }

      setCurrentStudent(data.student);
      setShowDashboard(true);
      setEmail("");
      setPassword("");
      setLoginMessage("");
    } catch (error) {
      setLoginMessage(
        "Backend se connection nahi ho pa raha. Check karo ki backend chal raha hai."
      );
    } finally {
      setLoading(false);
    }
  };

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

  // Company management
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

  // Job management
  if (showJobsManagement) {
    return (
      <JobManagement
        jobs={jobs}
        setJobs={setJobs}
        onBack={() => {
          setShowJobsManagement(false);
          setShowAdminDashboard(true);
        }}
      />
    );
  }

  // Student management
  if (showStudentsManagement) {
    return (
      <StudentManagement
        onBack={() => {
          setShowStudentsManagement(false);
          setShowAdminDashboard(true);
        }}
      />
    );
  }

  // Admin application management
  if (showAdminApplications) {
    return (
      <ApplicationManagement
        applications={applications}
        onBack={() => {
          setShowAdminApplications(false);
          setShowAdminDashboard(true);
        }}
        onUpdateStatus={(application, newStatus) => {
          setApplications((previousApplications) =>
            previousApplications.map((item) =>
              item === application
                ? { ...item, status: newStatus }
                : item
            )
          );
        }}
      />
    );
  }

  // Admin dashboard
  if (showAdminDashboard) {
    return (
      <AdminDashboard
        onBack={() => setShowAdminDashboard(false)}
        onViewCompanies={() => {
          setShowAdminDashboard(false);
          setShowCompanies(true);
        }}
        onViewJobs={() => {
          setShowAdminDashboard(false);
          setShowJobsManagement(true);
        }}
        onViewStudents={() => {
          setShowAdminDashboard(false);
          setShowStudentsManagement(true);
        }}
        onViewApplications={() => {
          setShowAdminDashboard(false);
          setShowAdminApplications(true);
        }}
      />
    );
  }

  // Student profile
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

  // Student applications
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

  // Available jobs
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
              (application) =>
                application.company === job.company &&
                application.role === job.role
            );

            if (alreadyApplied) {
              return previousApplications;
            }

            return [
              ...previousApplications,
              {
                ...job,
                id: Date.now(),
                studentName: currentStudent?.name || "Student",
                studentId: currentStudent?.student_id,
                appliedDate: new Date().toLocaleDateString("en-IN"),
                status: "Pending",
              },
            ];
          });
        }}
      />
    );
  }

  // Student dashboard
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
            Manage campus placements, job applications and
            student recruitment in one place.
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
              type="button"
              className={role === "Student" ? "active" : ""}
              onClick={() => {
                setRole("Student");
                setLoginMessage("");
              }}
            >
              Student
            </button>

            <button
              type="button"
              className={role === "Admin" ? "active" : ""}
              onClick={() => {
                setRole("Admin");
                setLoginMessage("");
              }}
            >
              Admin
            </button>
          </div>

          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />

            {loginMessage && (
              <p
                role="alert"
                style={{
                  color: "#dc2626",
                  fontSize: "14px",
                  marginTop: "10px",
                }}
              >
                {loginMessage}
              </p>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? "Logging in..." : `Login as ${role}`}
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