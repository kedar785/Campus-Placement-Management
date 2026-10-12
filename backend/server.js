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
// 6. START SERVER
// =====================================
app.listen(PORT, () => {
  console.log(
    `Backend server running at http://localhost:${PORT}`
  );
});