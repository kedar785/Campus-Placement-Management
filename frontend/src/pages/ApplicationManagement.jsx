import { useState } from "react";

function ApplicationManagement({ applications = [], onBack, onUpdateStatus }) {
  const [search, setSearch] = useState("");


  const filteredApplications = applications.filter((application) => {
    const searchText = search.toLowerCase();

    return (
      (application.studentName || "Student")
        .toLowerCase()
        .includes(searchText) ||
      (application.company || "")
        .toLowerCase()
        .includes(searchText) ||
      (application.role || "")
        .toLowerCase()
        .includes(searchText)
    );
  });

  const getStatusClass = (status) => {
    switch (status) {
      case "Selected":
        return "selected";
      case "Shortlisted":
        return "shortlisted";
      case "Rejected":
        return "rejected";
      default:
        return "pending";
    }
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#f4f7fb",
      padding: "30px",
      fontFamily: "Arial, sans-serif",
      color: "#1e293b",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "15px",
      marginBottom: "25px",
    },
    subtitle: {
      color: "#64748b",
      marginTop: "8px",
    },
    backButton: {
      background: "#334155",
      color: "white",
      border: "none",
      padding: "12px 18px",
      borderRadius: "8px",
      cursor: "pointer",
    },
    stats: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: "18px",
      marginBottom: "25px",
    },
    statCard: {
      background: "white",
      padding: "22px",
      borderRadius: "12px",
      boxShadow: "0 3px 12px rgba(0,0,0,0.05)",
    },
    search: {
      width: "100%",
      maxWidth: "400px",
      padding: "13px",
      border: "1px solid #cbd5e1",
      borderRadius: "8px",
      marginBottom: "20px",
      boxSizing: "border-box",
    },
    tableCard: {
      background: "white",
      borderRadius: "12px",
      padding: "20px",
      overflowX: "auto",
      boxShadow: "0 3px 12px rgba(0,0,0,0.05)",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: "850px",
    },
    cell: {
      textAlign: "left",
      padding: "15px 12px",
      borderBottom: "1px solid #e2e8f0",
    },
    select: {
      padding: "9px",
      border: "1px solid #cbd5e1",
      borderRadius: "7px",
      background: "white",
    },
    empty: {
      textAlign: "center",
      padding: "35px",
      color: "#64748b",
    },
  };

  const total = applications.length;
  const selected = applications.filter((a) => a.status === "Selected").length;
  const shortlisted = applications.filter((a) => a.status === "Shortlisted").length;
  const pending = applications.filter(
    (a) => !a.status || a.status === "Pending"
  ).length;

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div>
          <h1>Application Management</h1>
          <p style={styles.subtitle}>
            View student applications and update placement status.
          </p>
        </div>

        <button style={styles.backButton} onClick={onBack}>
          ← Admin Dashboard
        </button>
      </header>

      <section style={styles.stats}>
        <div style={styles.statCard}>
          <h2>{total}</h2>
          <p>Total Applications</p>
        </div>

        <div style={styles.statCard}>
          <h2>{pending}</h2>
          <p>Pending</p>
        </div>

        <div style={styles.statCard}>
          <h2>{shortlisted}</h2>
          <p>Shortlisted</p>
        </div>

        <div style={styles.statCard}>
          <h2>{selected}</h2>
          <p>Selected</p>
        </div>
      </section>

      <input
        style={styles.search}
        type="text"
        placeholder="Search student, company or job role..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <section style={styles.tableCard}>
        <h2 style={{ marginTop: 0 }}>Student Applications</h2>

        {filteredApplications.length === 0 ? (
          <div style={styles.empty}>
            <h3>No applications found</h3>
            <p>
              Applications will appear here when students apply for jobs.
            </p>
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                {[
                  "Student",
                  "Company",
                  "Job Role",
                  "Package",
                  "Applied Date",
                  "Status",
                ].map((heading) => (
                  <th key={heading} style={styles.cell}>
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredApplications.map((application, index) => (
                <tr key={application.id || index}>
                  <td style={styles.cell}>
                    {application.studentName || "Student"}
                  </td>

                  <td style={styles.cell}>
                    <strong>{application.company}</strong>
                  </td>

                  <td style={styles.cell}>{application.role}</td>

                  <td style={styles.cell}>{application.package}</td>

                  <td style={styles.cell}>
                    {application.appliedDate || "—"}
                  </td>

                  <td style={styles.cell}>
                    <select
                      style={styles.select}
                      className={getStatusClass(application.status)}
                      value={application.status || "Pending"}
                      onChange={(e) => {
                        if (onUpdateStatus) {
                          onUpdateStatus(
                            application,
                            e.target.value
                          );
                        }
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Selected">Selected</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default ApplicationManagement;