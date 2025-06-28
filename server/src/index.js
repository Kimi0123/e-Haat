require('dotenv').config();           // Load .env variables
const express = require('express');
const { connectDB, sequelize } = require('./config/db');

const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();                          // Test DB connection
app.use(express.json());              // Parse JSON
app.use('/api/auth', authRoutes);     // Mount routes


const User = require('./models/User'); // Import User model

// Sync models and start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });
});

