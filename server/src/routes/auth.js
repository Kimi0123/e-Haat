const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const authenticateJWT = require("../middleware/auth");
const jwt = require("jsonwebtoken");

const router = express.Router();

// In-memory token blacklist for access tokens
const blacklistedTokens = new Set();

function generateToken(user) {
  // Set token to expire in 1 hour
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

function generateRefreshToken(user) {
  // Set refresh token to expire in 7 days
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function generateAdminToken(user) {
  // Set admin token to expire in 2 hours
  return jwt.sign({ id: user.id, isAdmin: true }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
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

    // Generate access and refresh tokens
    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({
      message: "Login successful",
      token,
      refreshToken,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        name:
          (user.firstName ? user.firstName + " " : "") + (user.lastName || ""),
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------- ADMIN LOGIN -----------------------

router.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Admin not found" });
    }

    // Check if user is admin
    if (!user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Access denied. Admin privileges required." });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid admin credentials" });
    }

    // Generate admin token
    const adminToken = generateAdminToken(user);

    res.json({
      message: "Admin login successful",
      token: adminToken,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (err) {
    console.error("Admin Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------- CREATE ADMIN USER -----------------------

router.post("/create-admin", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const adminUser = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      isAdmin: true,
    });

    res.status(201).json({
      message: "Admin user created successfully",
      user: {
        id: adminUser.id,
        firstName: adminUser.firstName,
        lastName: adminUser.lastName,
        email: adminUser.email,
        isAdmin: adminUser.isAdmin,
      },
    });
  } catch (err) {
    console.error("Create Admin Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------- REFRESH TOKEN ENDPOINT -----------------------

router.post("/refresh", (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const newToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token: newToken });
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token" });
  }
});

// ----------------------- PROTECTED ROUTE -----------------------

router.get("/profile", authenticateJWT, async (req, res) => {
  try {
    // req.user contains the user ID from token
    const user = await User.findByPk(req.userId, {
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
    blacklistedTokens.add(token); // Blacklist the access token
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Export the blacklist for use in middleware
router.blacklistedTokens = blacklistedTokens;

module.exports = router;
