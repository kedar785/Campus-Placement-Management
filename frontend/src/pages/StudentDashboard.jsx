import "./StudentDashboard.css";

function StudentDashboard() {
  return (
    <div className="student-dashboard">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>Campus<span>Place</span></h2>
          <p>Placement Portal</p>
        </div>

        <nav>
          <button className="nav-item active">🏠 Dashboard</button>
          <button className="nav-item">👤 My Profile</button>
          <button className="nav-item">💼 Available Jobs</button>
          <button className="nav-item">📝 My Applications</button>
          <button className="nav-item">✅ Eligibility</button>
          <button className="nav-item">🔔 Notifications</button>
        </nav>

        <button className="logout-btn">↪ Logout</button>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">

        {/* Top Header */}
        <header className="top-header">
          <div>
            <h1>Student Dashboard</h1>
            <p>Welcome back! Manage your placement activities here.</p>
          </div>

          <div className="student-info">
            <div className="student-avatar">KB</div>
            <div>
              <strong>Kedar Bais</strong>
              <span>B.Tech CSE</span>
            </div>
          </div>
        </header>

        {/* Welcome Banner */}
        <section className="welcome-banner">
          <div>
            <h2>Welcome, Kedar 👋</h2>
            <p>
              Explore placement opportunities and track your applications.
            </p>
          </div>

          <div className="banner-icon">🎓</div>
        </section>

        {/* Statistics */}
        <section className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon">💼</div>
            <div>
              <h3>12</h3>
              <p>Available Jobs</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div>
              <h3>4</h3>
              <p>Applied Jobs</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div>
              <h3>2</h3>
              <p>Shortlisted</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div>
              <h3>1</h3>
              <p>Selected</p>
            </div>
          </div>

        </section>

        {/* Quick Actions */}
        <section className="section">
          <div className="section-heading">
            <h2>Quick Actions</h2>
            <p>Access important placement features</p>
          </div>

          <div className="action-grid">

            <div className="action-card">
              <div className="action-icon">👤</div>
              <h3>My Profile</h3>
              <p>View and update your academic and personal information.</p>
              <button>View Profile →</button>
            </div>

            <div className="action-card">
              <div className="action-icon">💼</div>
              <h3>Available Jobs</h3>
              <p>Find companies and placement opportunities.</p>
              <button>Explore Jobs →</button>
            </div>

            <div className="action-card">
              <div className="action-icon">📝</div>
              <h3>Applications</h3>
              <p>Track your applications and recruitment status.</p>
              <button>View Applications →</button>
            </div>

            <div className="action-card">
              <div className="action-icon">✅</div>
              <h3>Check Eligibility</h3>
              <p>Check whether you meet company eligibility criteria.</p>
              <button>Check Now →</button>
            </div>

          </div>
        </section>

        {/* Recent Applications */}
        <section className="section">
          <div className="section-heading">
            <h2>Recent Applications</h2>
            <p>Your latest placement applications</p>
          </div>

          <div className="application-table">

            <div className="table-header">
              <span>Company</span>
              <span>Role</span>
              <span>Date</span>
              <span>Status</span>
            </div>

            <div className="table-row">
              <span>Tech Solutions</span>
              <span>Software Developer</span>
              <span>02 Oct 2026</span>
              <span className="status applied">Applied</span>
            </div>

            <div className="table-row">
              <span>Infosys</span>
              <span>System Engineer</span>
              <span>28 Sep 2026</span>
              <span className="status shortlisted">Shortlisted</span>
            </div>

            <div className="table-row">
              <span>TCS</span>
              <span>Graduate Engineer</span>
              <span>25 Sep 2026</span>
              <span className="status selected">Selected</span>
            </div>

          </div>
        </section>

      </main>

    </div>
  );
}

export default StudentDashboard;