import "./StudentProfile.css";

function StudentProfile({ onBack, student }) {
  return (
    <div className="profile-page">
      <div className="profile-header">
        <div>
          <h1>My Profile</h1>
          <p>View and manage your student information</p>
        </div>

        <button className="back-button" onClick={onBack}>
          ← Dashboard
        </button>
      </div>

      <div className="profile-card">
        <div className="profile-top">
          <div className="profile-avatar">KB</div>

          <div>
           <h2>{student?.name || "Student"}</h2>
            <p>B.Tech CSE</p>
            <span>Student</span>
          </div>
        </div>

        <div className="profile-section">
          <h3>Personal Information</h3>

          <div className="profile-grid">
            <div>
              <label>Full Name</label>
              <p>Kedar Bais</p>
            </div>

            <div>
              <label>Email</label>
             <p>{student?.email || "Not provided"}</p>
            </div>

            <div>
              <label>Phone Number</label>
              <p>{student?.phone || "Not provided"}</p>
            </div>

            <div>
              <label>College</label>
              <p>Global College, Jabalpur</p>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <h3>Academic Information</h3>

          <div className="profile-grid">
            <div>
              <label>Course</label>
              <p>B.Tech CSE</p>
            </div>

            <div>
              <label>Current Year</label>
              <p>3rd Year</p>
            </div>

            <div>
              <label>CGPA</label>
             <p>{student?.cgpa ?? "Not provided"}</p>
            </div>

            <div>
              <label>Graduation Year</label>
              <p>2028</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;