const fs = require("fs");
const path = require("path");

// Test script to verify image upload functionality
console.log("Testing image upload functionality...");

// Check if uploads directory exists
const uploadsDir = path.join(__dirname, "server", "uploads", "products");
if (fs.existsSync(uploadsDir)) {
  console.log("✅ Uploads directory exists:", uploadsDir);

  // List files in uploads directory
  const files = fs.readdirSync(uploadsDir);
  console.log("📁 Files in uploads directory:", files.length);
  files.forEach((file) => {
    console.log(`  - ${file}`);
  });
} else {
  console.log("❌ Uploads directory does not exist:", uploadsDir);
}

// Check if server is configured to serve static files
const serverIndexPath = path.join(__dirname, "server", "src", "index.js");
if (fs.existsSync(serverIndexPath)) {
  const serverContent = fs.readFileSync(serverIndexPath, "utf8");
  if (serverContent.includes("/uploads")) {
    console.log("✅ Server is configured to serve uploads directory");
  } else {
    console.log("❌ Server is not configured to serve uploads directory");
  }
} else {
  console.log("❌ Server index.js not found");
}

// Check if admin routes have proper image upload handling
const adminRoutesPath = path.join(
  __dirname,
  "server",
  "src",
  "routes",
  "admin.js"
);
if (fs.existsSync(adminRoutesPath)) {
  const adminContent = fs.readFileSync(adminRoutesPath, "utf8");
  if (
    adminContent.includes("upload.array") ||
    adminContent.includes("handleUpload")
  ) {
    console.log("✅ Admin routes have image upload handling");
  } else {
    console.log("❌ Admin routes missing image upload handling");
  }
} else {
  console.log("❌ Admin routes file not found");
}

console.log("\nTo test the complete functionality:");
console.log("1. Start the server: cd server && npm start");
console.log("2. Start the frontend: cd frontend && npm run dev");
console.log("3. Go to admin panel and try uploading a product with images");
console.log("4. Check the browser console for any image loading errors");
