// Store tokens in memory (import from auth.js or use a shared module)
// For now, we'll recreate the map here - in production, use a shared module
const activeTokens = new Map();

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  // Check if token exists and is valid
  if (!activeTokens.has(token)) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  // Attach user ID to request
  req.user = activeTokens.get(token);
  next();
}

module.exports = authenticateJWT;
