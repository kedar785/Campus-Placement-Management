import "./AdminDashboard.css";

function AdminDashboard({
  onBack,
  onViewCompanies,
  onViewJobs,
  onViewStudents,
  onViewApplications,
}) {
  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <h2>
            Campus<span>Place</span>
          </h2>
          <p>Admin Portal</p>
        </div>

        <nav>
          <button className="admin-nav active">
            📊 Dashboard
          </button>

          <button className="admin-nav" onClick={onViewCompanies}>
            🏢 Companies
          </button>

          <button className="admin-nav" onClick={onViewJobs}>
            💼 Jobs
          </button>

          <button className="admin-nav" onClick={onViewStudents}>
            👨‍🎓 Students
          </button>

          <button className="admin-nav" onClick={onViewApplications}>
            📝 Applications
          </button>

          <button
            className="admin-nav"
            onClick={() => alert("Reports module will be added next.")}
          >
            📈 Reports
          </button>
        </nav>

        <button className="admin-logout" onClick={onBack}>
          ↪ Logout
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage campus placement activities</p>
          </div>

          <div className="admin-profile">
            <div className="admin-avatar">A</div>
            <div>
              <strong>Placement Admin</strong>
              <span>Administrator</span>
            </div>
          </div>
        </header>

        <section className="admin-welcome">
          <h2>Welcome, Admin 👋</h2>
          <p>
            Manage students, companies, jobs and placement applications.
          </p>
        </section>

        <section className="admin-stats">
          <div className="admin-stat-card">
            <h3>120</h3>
            <p>Total Students</p>
          </div>

          <div className="admin-stat-card">
            <h3>18</h3>
            <p>Companies</p>
          </div>

          <div className="admin-stat-card">
            <h3>32</h3>
            <p>Active Jobs</p>
          </div>

          <div className="admin-stat-card">
            <h3>85</h3>
            <p>Applications</p>
          </div>
        </section>

        <section className="admin-section">
          <h2>Quick Management</h2>

          <div className="admin-actions">
            <div className="admin-action-card">
              <h3>🏢 Company Management</h3>
              <p>Add and manage recruiting companies.</p>
              <button onClick={onViewCompanies}>
                Manage Companies →
              </button>
            </div>

            <div className="admin-action-card">
              <h3>💼 Job Management</h3>
              <p>Create and manage placement opportunities.</p>
              <button onClick={onViewJobs}>
                Manage Jobs →
              </button>
            </div>

            <div className="admin-action-card">
              <h3>👨‍🎓 Student Management</h3>
              <p>View registered students and their details.</p>
              <button onClick={onViewStudents}>
                View Students →
              </button>
            </div>

            <div className="admin-action-card">
              <h3>📝 Applications</h3>
              <p>Review applications and update student status.</p>
              <button onClick={onViewApplications}>
                View Applications →
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;