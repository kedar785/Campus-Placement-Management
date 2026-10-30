const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./db");
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// =====================================
// 1. HOME ROUTE
// =====================================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Campus Placement Management Backend is running!",
  });
});

// =====================================
// 2. HEALTH CHECK
// =====================================
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend is working properly.",
  });
});

// =====================================
// 3. DATABASE CONNECTION TEST
// =====================================
app.get("/api/db-test", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT DATABASE() AS databaseName"
    );

    res.json({
      success: true,
      message: "MySQL connected successfully!",
      database: rows[0].databaseName,
    });
  } catch (error) {
    console.error("Database error:", error.message);

    res.status(500).json({
      success: false,
      message: "MySQL connection failed.",
    });
  }
});

// =====================================
// 4. STUDENT REGISTRATION

// =====================================
app.post("/api/students/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      branch,
      cgpa,
    } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required.",
      });
    }

    // Check password length
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check whether email already exists
    const [existingStudents] = await db.execute(
      "SELECT student_id FROM students WHERE email = ?",
      [normalizedEmail]
    );

    if (existingStudents.length > 0) {
      return res.status(409).json({
        success: false,
        message: "This email is already registered.",
      });
    }

    // Securely hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Save student in MySQL
    const [result] = await db.execute(
      `INSERT INTO students
       (name, email, password, phone, branch, cgpa)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        name.trim(),
        normalizedEmail,
        hashedPassword,
        phone || null,
        branch || null,
        cgpa === "" || cgpa === undefined || cgpa === null
          ? null
          : Number(cgpa),
      ]
    );

    return res.status(201).json({
      success: true,
      message: "Student registered successfully!",
      student: {
        student_id: result.insertId,
        name: name.trim(),
        email: normalizedEmail,
      },
    });
  } catch (error) {
    console.error("Registration error:", error.message);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "This email is already registered.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
    });
  }
});


// =====================================
// 5. STUDENT LOGIN
// =====================================
app.post("/api/students/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find student by email
    const [students] = await db.execute(
      `SELECT student_id, name, email, password,
              phone, branch, cgpa
       FROM students
       WHERE email = ?`,
      [normalizedEmail]
    );

    // Check whether student exists
    if (students.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const student = students[0];

    // Verify password
    const passwordMatches = await bcrypt.compare(
      password,
      student.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Login successful
    return res.status(200).json({
      success: true,
      message: "Login successful!",
      student: {
        student_id: student.student_id,
        name: student.name,
        email: student.email,
        phone: student.phone,
        branch: student.branch,
        cgpa: student.cgpa,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again.",
    });
  }
});
// =====================================
// 6. APPLY FOR A JOB
// =====================================
app.post("/api/applications", async (req, res) => {
  try {
    const { student_id, job_id } = req.body;

    // Validate required fields
    if (!student_id || !job_id) {
      return res.status(400).json({
        success: false,
        message: "Student ID and Job ID are required.",
      });
    }

    // Check whether student exists
    const [students] = await db.execute(
      "SELECT student_id FROM students WHERE student_id = ?",
      [student_id]
    );

    if (students.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    // Check whether student has already applied
    const [existingApplications] = await db.execute(
      `SELECT application_id
       FROM applications
       WHERE student_id = ? AND job_id = ?`,
      [student_id, job_id]
    );

    if (existingApplications.length > 0) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this job.",
      });
    }

    // Save application in MySQL
    const [result] = await db.execute(
      `INSERT INTO applications
       (student_id, job_id, application_status)
       VALUES (?, ?, 'Pending')`,
      [student_id, job_id]
    );

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully!",
      application: {
        application_id: result.insertId,
        student_id,
        job_id,
        application_status: "Pending",
      },
    });
  } catch (error) {
    console.error("Application error:", error.message);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this job.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to submit application.",
    });
  }
});



// =====================================
// 7. GET STUDENT APPLICATIONS
// =====================================
app.get("/api/applications/student/:studentId", async (req, res) => {
  try {
    const studentId = Number(req.params.studentId);

    if (!Number.isInteger(studentId) || studentId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid student ID is required.",
      });
    }

    const [applications] = await db.execute(
      `SELECT
         a.application_id,
         a.student_id,
         a.job_id,
         a.application_status,
         a.applied_at,
         j.job_role,
         j.package_lpa,
         j.job_location,
         c.company_name
       FROM applications a
       JOIN jobs j
         ON a.job_id = j.job_id
       JOIN companies c
         ON j.company_id = c.company_id
       WHERE a.student_id = ?
       ORDER BY a.applied_at DESC`,
      [studentId]
    );

    return res.json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("Fetch applications error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch applications.",
    });
  }
});


// =====================================
// 8. GET ALL APPLICATIONS (ADMIN)
// =====================================
app.get("/api/applications", async (req, res) => {
  try {
    const [applications] = await db.execute(
      `SELECT
         a.application_id,
         a.student_id,
         s.name AS student_name,
         s.email AS student_email,
         a.job_id,
         j.job_role,
         c.company_name,
         j.package_lpa,
         j.job_location,
         a.application_status,
         a.applied_at
       FROM applications a
       JOIN students s
         ON a.student_id = s.student_id
       JOIN jobs j
         ON a.job_id = j.job_id
       JOIN companies c
         ON j.company_id = c.company_id
       ORDER BY a.applied_at DESC`
    );

    return res.json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("Fetch all applications error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch applications.",
    });
  }
});


// =====================================
// 9. UPDATE APPLICATION STATUS (ADMIN)
// =====================================
app.put("/api/applications/:applicationId/status", async (req, res) => {
  try {
    const applicationId = Number(req.params.applicationId);
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Shortlisted",
      "Selected",
      "Rejected",
    ];

    if (!Number.isInteger(applicationId) || applicationId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid application ID is required.",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status.",
      });
    }

    const [result] = await db.execute(
      `UPDATE applications
       SET application_status = ?
       WHERE application_id = ?`,
      [status, applicationId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Application not found.",
      });
    }

    return res.json({
      success: true,
      message: "Application status updated successfully.",
    });
  } catch (error) {
    console.error("Update application status error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to update application status.",
    });
  }
});




// Create Admin account
app.post("/api/admin/register", async (req, res) => {
try {
const { name, email, password } = req.body;

```
if (!name || !email || !password) {
  return res.status(400).json({
    success: false,
    message: "Name, email and password are required.",
  });
}

const [existing] = await db.execute(
  "SELECT admin_id FROM admins WHERE email = ?",
  [email.trim()]
);

if (existing.length > 0) {
  return res.status(409).json({
    success: false,
    message: "Admin email already exists.",
  });
}

const hashedPassword = await bcrypt.hash(password, 10);

await db.execute(
  "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)",
  [name.trim(), email.trim(), hashedPassword]
);

return res.status(201).json({
  success: true,
  message: "Admin account created successfully.",
});
```

} catch (error) {
console.error("Admin registration error:", error.message);
return res.status(500).json({
success: false,
message: "Failed to create Admin account.",
});
}
});

// Admin Login
app.post("/api/admin/login", async (req, res) => {
try {
const { email, password } = req.body;

```
if (!email || !password) {
  return res.status(400).json({
    success: false,
    message: "Email and password are required.",
  });
}

const [admins] = await db.execute(
  "SELECT admin_id, name, email, password FROM admins WHERE email = ?",
  [email.trim()]
);

if (
  admins.length === 0 ||
  !(await bcrypt.compare(password, admins[0].password))
) {
  return res.status(401).json({
    success: false,
    message: "Invalid Admin email or password.",
  });
}

return res.json({
  success: true,
  message: "Admin login successful.",
  admin: {
    admin_id: admins[0].admin_id,
    name: admins[0].name,
    email: admins[0].email,
  },
});
```

} catch (error) {
console.error("Admin login error:", error.message);
return res.status(500).json({
success: false,
message: "Admin login failed.",
});
}
});

// =====================================
// 6. START SERVER
// =====================================
app.listen(PORT, () => {
  console.log(
    `Backend server running at http://localhost:${PORT}`
  );
});