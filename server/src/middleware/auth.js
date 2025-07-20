const jwt = require("jsonwebtoken");
const authRouter = require("../routes/auth");

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  // Check if token is blacklisted
  if (authRouter.blacklistedTokens && authRouter.blacklistedTokens.has(token)) {
    return res
      .status(401)
      .json({ message: "Token is blacklisted. Please login again." });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Attach user ID to request (for compatibility)
  req.userId = decoded.id;
  req.user = decoded.id;
  next();
}

module.exports = authenticateJWT;
