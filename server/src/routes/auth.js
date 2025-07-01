const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const authenticateJWT = require("../middleware/auth");

const router = express.Router();

// Store tokens in memory (in production, use Redis or database)
const activeTokens = new Map(); // token -> userId

// Generate 6-digit numeric token
function generateNumericToken() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// ----------------------- SIGNUP -----------------------

router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------- LOGIN -----------------------

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate 6-digit numeric token
    const token = generateNumericToken();

    // Store token with user ID
    activeTokens.set(token, user.id);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------- PROTECTED ROUTE -----------------------

router.get("/profile", authenticateJWT, async (req, res) => {
  try {
    // req.user contains the user ID from token
    const user = await User.findByPk(req.user, {
      attributes: { exclude: ["password"] }, // Don't send password
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile accessed successfully",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.error("Profile Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------- LOGOUT -----------------------

router.post("/logout", authenticateJWT, async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    activeTokens.delete(token);
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
