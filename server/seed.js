require("dotenv").config();
const { sequelize } = require("./src/config/db");
const { seedDatabase } = require("./src/seedData");

const runSeed = async () => {
  try {
    // Sync database
    await sequelize.sync({ alter: true });
    console.log("✅ Database synced");

    // Seed data
    await seedDatabase();

    console.log("🎉 All done!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

runSeed();
