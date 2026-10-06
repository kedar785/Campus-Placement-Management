import "./Eligibility.css";

function Eligibility({ onBack }) {
  const companies = [
    {
      company: "TCS",
      role: "Graduate Engineer Trainee",
      requiredCgpa: 6.5,
      skills: ["Java", "SQL", "DSA"],
    },
    {
      company: "Infosys",
      role: "System Engineer",
      requiredCgpa: 6.0,
      skills: ["Java", "Python", "SQL"],
    },
    {
      company: "Accenture",
      role: "Associate Software Engineer",
      requiredCgpa: 6.0,
      skills: ["Java", "React", "SQL"],
    },
    {
      company: "Wipro",
      role: "Project Engineer",
      requiredCgpa: 6.0,
      skills: ["Java", "C++", "SQL"],
    },
  ];

  const studentCgpa = 7.5;

  return (
    <div className="eligibility-page">
      <div className="eligibility-header">
        <div>
          <h1>Eligibility Checker</h1>
          <p>Check your eligibility for campus placement opportunities</p>
        </div>

        <button className="back-button" onClick={onBack}>
          ← Dashboard
        </button>
      </div>

      <div className="student-cgpa">
        <h2>Your CGPA</h2>
        <div className="cgpa-value">{studentCgpa}</div>
        <p>Based on your current academic record</p>
      </div>

      <div className="eligibility-grid">
        {companies.map((company, index) => {
          const isEligible = studentCgpa >= company.requiredCgpa;

          return (
            <div className="eligibility-card" key={index}>
              <div className="company-logo">
                {company.company.charAt(0)}
              </div>

              <h2>{company.company}</h2>
              <h3>{company.role}</h3>

              <div className="eligibility-details">
                <p>
                  🎓 <strong>Required CGPA:</strong>{" "}
                  {company.requiredCgpa}
                </p>

                <p>
                  💻 <strong>Skills:</strong>{" "}
                  {company.skills.join(", ")}
                </p>
              </div>

              <div
                className={
                  isEligible
                    ? "eligibility-result eligible"
                    : "eligibility-result not-eligible"
                }
              >
                {isEligible
                  ? "✓ You are Eligible"
                  : "✕ Not Eligible"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Eligibility;