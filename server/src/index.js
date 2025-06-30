require("dotenv").config(); // Load .env variables
const express = require("express");
const { connectDB, sequelize } = require("./config/db");
const cors = require("cors");

// Import routes
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB(); // Test DB connection
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON

// Mount routes
app.use("/api/auth", authRoutes);


// Sync models and start server
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
    console.log(`🌐 API Base URL: http://localhost:${PORT}/api`);
  });
});
