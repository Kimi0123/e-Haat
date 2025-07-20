const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticateAdmin = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if token has admin privileges
    if (!decoded.isAdmin) {
      return res
        .status(403)
        .json({ message: "Access denied. Admin privileges required." });
    }

    // Get user from database
    const user = await User.findByPk(decoded.id);
    if (!user || !user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Access denied. Admin privileges required." });
    }

    // Add user info to request
    req.userId = user.id;
    req.user = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    next();
  } catch (error) {
    console.error("Admin Auth Error:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token." });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired." });
    }
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = authenticateAdmin;
