const fetch = require("node-fetch");

// Test script to verify dashboard data sync
async function testDashboardSync() {
  console.log("Testing Dashboard Data Sync...\n");

  const baseUrl = "http://localhost:5000/api";

  // Test 1: Check if server is running
  try {
    const response = await fetch(`${baseUrl}/products`);
    if (response.ok) {
      console.log("✅ Server is running and accessible");
    } else {
      console.log("❌ Server is not responding properly");
      return;
    }
  } catch (error) {
    console.log("❌ Cannot connect to server:", error.message);
    return;
  }

  // Test 2: Check orders endpoint
  try {
    const response = await fetch(`${baseUrl}/orders/my-orders`);
    console.log(`📊 Orders endpoint status: ${response.status}`);
    if (response.ok) {
      const data = await response.json();
      console.log(`   Found ${data.length} orders`);
    }
  } catch (error) {
    console.log("❌ Orders endpoint error:", error.message);
  }

  // Test 3: Check wishlist endpoint
  try {
    const response = await fetch(`${baseUrl}/wishlist`);
    console.log(`📋 Wishlist endpoint status: ${response.status}`);
    if (response.ok) {
      const data = await response.json();
      console.log(`   Found ${data.length} wishlist items`);
    }
  } catch (error) {
    console.log("❌ Wishlist endpoint error:", error.message);
  }

  // Test 4: Check products endpoint
  try {
    const response = await fetch(`${baseUrl}/products`);
    console.log(`🛍️ Products endpoint status: ${response.status}`);
    if (response.ok) {
      const data = await response.json();
      console.log(`   Found ${data.length} products`);
    }
  } catch (error) {
    console.log("❌ Products endpoint error:", error.message);
  }

  console.log("\n📝 Dashboard Sync Status:");
  console.log("1. Server connectivity: ✅");
  console.log("2. Orders API: ✅ (if status 200/401)");
  console.log("3. Wishlist API: ✅ (if status 200/401)");
  console.log("4. Products API: ✅ (if status 200)");
  console.log("\nNote: 401 status is expected if not authenticated");
  console.log("The dashboard will show real data when user is logged in");
}

testDashboardSync().catch(console.error);
