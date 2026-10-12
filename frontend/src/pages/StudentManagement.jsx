import React, { useState } from "react";

function StudentManagement({ onBack }) {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      phone: "9876543210",
      course: "B.Tech CSE",
      cgpa: "8.2",
      year: "3rd Year",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Verma",
      email: "priya@example.com",
      phone: "9876543211",
      course: "B.Tech CSE",
      cgpa: "8.7",
      year: "3rd Year",
      status: "Active",
    },
    {
      id: 3,
      name: "Aman Patel",
      email: "aman@example.com",
      phone: "9876543212",
      course: "B.Tech IT",
      cgpa: "7.6",
      year: "3rd Year",
      status: "Active",
    },
    {
      id: 4,
      name: "Neha Singh",
      email: "neha@example.com",
      phone: "9876543213",
      course: "B.Tech CSE",
      cgpa: "9.0",
      year: "4th Year",
      status: "Active",
    },
  ]);

  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase();

    return (
      student.name.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText) ||
      student.course.toLowerCase().includes(searchText)
    );
  });

  const handleDelete = (id) => {
    setStudents(
      students.filter((student) => student.id !== id)
    );

    if (selectedStudent?.id === id) {
      setSelectedStudent(null);
    }
  };

  return (
    <div className="student-management-page">

      {/* Header */}
      <div className="student-management-header">

        <div>
          <h1>Student Management</h1>
          <p>
            View and manage registered students
          </p>
        </div>

        <button
          className="student-back-button"
          onClick={onBack}
        >
          ← Dashboard
        </button>

      </div>

      {/* Stats */}
      <div className="student-stats">

        <div className="student-stat-card">
          <h2>{students.length}</h2>
          <p>Total Students</p>
        </div>

        <div className="student-stat-card">
          <h2>
            {
              students.filter(
                (student) => student.status === "Active"
              ).length
            }
          </h2>
          <p>Active Students</p>
        </div>

        <div className="student-stat-card">
          <h2>
            {students.filter(
              (student) => Number(student.cgpa) >= 7
            ).length}
          </h2>
          <p>CGPA 7+ Students</p>
        </div>

      </div>

      {/* Search */}
      <div className="student-search-card">

        <input
          type="text"
          placeholder="🔎 Search by name, email or course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* Student Table */}
      <div className="student-table-card">

        <div className="table-title">
          <div>
            <h2>Registered Students</h2>
            <p>
              Showing {filteredStudents.length} student(s)
            </p>
          </div>
        </div>

        <div className="table-wrapper">

          <table>

            <thead>
              <tr>
                <th>Student</th>
                <th>Email</th>
                <th>Course</th>
                <th>CGPA</th>
                <th>Year</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredStudents.map((student) => (

                <tr key={student.id}>

                  <td>
                    <div className="student-name-cell">

                      <div className="student-avatar">
                        {student.name.charAt(0)}
                      </div>

                      <strong>{student.name}</strong>

                    </div>
                  </td>

                  <td>{student.email}</td>

                  <td>{student.course}</td>

                  <td>
                    <strong>{student.cgpa}</strong>
                  </td>

                  <td>{student.year}</td>

                  <td>
                    <span className="student-status">
                      {student.status}
                    </span>
                  </td>

                  <td>

                    <div className="student-actions">

                      <button
                        className="view-student-button"
                        onClick={() =>
                          setSelectedStudent(student)
                        }
                      >
                        View
                      </button>

                      <button
                        className="delete-student-button"
                        onClick={() =>
                          handleDelete(student.id)
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {filteredStudents.length === 0 && (
          <div className="no-students">
            <h3>No Students Found</h3>
            <p>
              Try searching with a different name, email or course.
            </p>
          </div>
        )}

      </div>

      {/* Student Details Modal */}
      {selectedStudent && (

        <div className="student-modal-overlay">

          <div className="student-modal">

            <div className="student-modal-header">

              <div>
                <h2>Student Details</h2>
                <p>Complete student information</p>
              </div>

              <button
                onClick={() => setSelectedStudent(null)}
              >
                ✕
              </button>

            </div>

            <div className="student-profile-summary">

              <div className="large-student-avatar">
                {selectedStudent.name.charAt(0)}
              </div>

              <div>
                <h2>{selectedStudent.name}</h2>
                <p>{selectedStudent.course}</p>
              </div>

            </div>

            <div className="student-detail-grid">

              <div>
                <label>Email</label>
                <strong>{selectedStudent.email}</strong>
              </div>

              <div>
                <label>Phone</label>
                <strong>{selectedStudent.phone}</strong>
              </div>

              <div>
                <label>Course</label>
                <strong>{selectedStudent.course}</strong>
              </div>

              <div>
                <label>CGPA</label>
                <strong>{selectedStudent.cgpa}</strong>
              </div>

              <div>
                <label>Current Year</label>
                <strong>{selectedStudent.year}</strong>
              </div>

              <div>
                <label>Status</label>
                <strong>{selectedStudent.status}</strong>
              </div>

            </div>

            <button
              className="close-modal-button"
              onClick={() => setSelectedStudent(null)}
            >
              Close
            </button>

          </div>

        </div>

      )}

      {/* CSS */}
      <style>{`

        .student-management-page {
          min-height: 100vh;
          padding: 40px;
          background: #f5f7fb;
        }

        .student-management-header {
          max-width: 1150px;
          margin: 0 auto 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .student-management-header h1 {
          margin: 0;
          font-size: 30px;
          color: #111827;
        }

        .student-management-header p {
          margin-top: 8px;
          color: #6b7280;
        }

        .student-back-button {
          border: none;
          background: #111827;
          color: white;
          padding: 11px 18px;
          border-radius: 8px;
          cursor: pointer;
        }

        .student-stats {
          max-width: 1150px;
          margin: 0 auto 25px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .student-stat-card {
          background: white;
          padding: 22px;
          border-radius: 14px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.06);
        }

        .student-stat-card h2 {
          margin: 0;
          font-size: 30px;
          color: #2563eb;
        }

        .student-stat-card p {
          margin: 7px 0 0;
          color: #6b7280;
        }

        .student-search-card {
          max-width: 1150px;
          margin: 0 auto 20px;
          background: white;
          padding: 20px;
          border-radius: 14px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.06);
        }

        .student-search-card input {
          width: 100%;
          padding: 13px 15px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
        }

        .student-search-card input:focus {
          border-color: #2563eb;
        }

        .student-table-card {
          max-width: 1150px;
          margin: auto;
          background: white;
          border-radius: 14px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.06);
          overflow: hidden;
        }

        .table-title {
          padding: 22px 25px;
          border-bottom: 1px solid #eee;
        }

        .table-title h2 {
          margin: 0;
        }

        .table-title p {
          margin: 6px 0 0;
          color: #6b7280;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th,
        td {
          padding: 16px 18px;
          text-align: left;
          border-bottom: 1px solid #eee;
          white-space: nowrap;
        }

        th {
          background: #f8fafc;
          color: #374151;
          font-size: 13px;
        }

        td {
          color: #4b5563;
          font-size: 14px;
        }

        .student-name-cell {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .student-avatar,
        .large-student-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          background: #2563eb;
          color: white;
          font-weight: bold;
          border-radius: 50%;
        }

        .student-avatar {
          width: 38px;
          height: 38px;
        }

        .student-status {
          background: #e8f7ee;
          color: #15803d;
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .student-actions {
          display: flex;
          gap: 8px;
        }

        .view-student-button,
        .delete-student-button {
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
        }

        .view-student-button {
          background: #e8f0ff;
          color: #2563eb;
        }

        .delete-student-button {
          background: #feecec;
          color: #dc2626;
        }

        .no-students {
          padding: 50px;
          text-align: center;
        }

        .no-students p {
          color: #6b7280;
        }

        .student-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 1000;
        }

        .student-modal {
          width: 100%;
          max-width: 650px;
          background: white;
          border-radius: 16px;
          padding: 30px;
        }

        .student-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 25px;
        }

        .student-modal-header h2 {
          margin: 0;
        }

        .student-modal-header p {
          color: #6b7280;
        }

        .student-modal-header button {
          border: none;
          background: #f3f4f6;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          cursor: pointer;
        }

        .student-profile-summary {
          display: flex;
          align-items: center;
          gap: 15px;
          padding-bottom: 25px;
          border-bottom: 1px solid #eee;
        }

        .large-student-avatar {
          width: 65px;
          height: 65px;
          font-size: 25px;
        }

        .student-profile-summary h2 {
          margin: 0 0 5px;
        }

        .student-profile-summary p {
          margin: 0;
          color: #6b7280;
        }

        .student-detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-top: 25px;
        }

        .student-detail-grid div {
          background: #f8fafc;
          padding: 15px;
          border-radius: 8px;
        }

        .student-detail-grid label {
          display: block;
          color: #6b7280;
          font-size: 12px;
          margin-bottom: 6px;
        }

        .student-detail-grid strong {
          color: #111827;
          font-size: 14px;
        }

        .close-modal-button {
          width: 100%;
          border: none;
          background: #2563eb;
          color: white;
          padding: 12px;
          border-radius: 8px;
          margin-top: 25px;
          cursor: pointer;
        }

        @media (max-width: 700px) {

          .student-management-page {
            padding: 20px;
          }

          .student-management-header {
            align-items: flex-start;
            gap: 15px;
          }

          .student-stats {
            grid-template-columns: 1fr;
          }

          .student-detail-grid {
            grid-template-columns: 1fr;
          }

        }

      `}</style>

    </div>
  );
}

export default StudentManagement;