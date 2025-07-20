const express = require("express");
const router = express.Router();
const authenticateAdmin = require("../middleware/adminAuth");
const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");
const { sequelize } = require("../config/db");
const { Op } = require("sequelize");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../../uploads/products");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
});

// Error handling middleware for multer
const handleUpload = (req, res, next) => {
  upload.array("images", 5)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          message: "File too large. Maximum size is 5MB per image.",
        });
      }
      return res.status(400).json({
        message: "Upload error: " + err.message,
      });
    } else if (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
    next();
  });
};

// Apply admin authentication to all routes
router.use(authenticateAdmin);

// ----------------------- ADMIN DASHBOARD -----------------------

router.get("/dashboard", async (req, res) => {
  try {
    const { timeframe = "week" } = req.query;

    // Calculate date range based on timeframe
    const now = new Date();
    let startDate;

    switch (timeframe) {
      case "week":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "quarter":
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case "year":
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }

    // Get basic stats
    const totalUsers = await User.count();
    const totalOrders = await Order.count();
    const totalProducts = await Product.count();

    // Calculate total revenue
    const orders = await Order.findAll({
      where: {
        orderStatus: {
          [Op.notIn]: ["cancelled"],
        },
      },
      attributes: ["totalAmount"],
    });

    const totalRevenue = orders.reduce(
      (sum, order) => sum + parseFloat(order.totalAmount || 0),
      0
    );

    // Get recent orders with user info
    const recentOrders = await Order.findAll({
      limit: 10,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          as: "User",
          attributes: ["firstName", "lastName", "email"],
        },
      ],
    });

    // Get recent users
    const recentUsers = await User.findAll({
      limit: 10,
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["password"] },
    });

    // Get order status breakdown
    const orderStatusCounts = await Order.findAll({
      attributes: [
        "orderStatus",
        [sequelize.fn("COUNT", sequelize.col("id")), "count"],
      ],
      group: ["orderStatus"],
    });

    const orderStatus = {
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0,
    };

    orderStatusCounts.forEach((item) => {
      if (orderStatus.hasOwnProperty(item.orderStatus)) {
        orderStatus[item.orderStatus] = parseInt(item.dataValues.count);
      }
    });

    // Get top products (by order count)
    const topProducts = await Product.findAll({
      limit: 5,
      order: [["reviewCount", "DESC"]],
      attributes: ["id", "name", "price", "rating", "reviewCount", "stock"],
    });

    // Get timeframe-specific stats
    const timeframeOrders = await Order.count({
      where: {
        createdAt: {
          [Op.gte]: startDate,
        },
      },
    });

    const timeframeRevenue = await Order.findAll({
      where: {
        createdAt: {
          [Op.gte]: startDate,
        },
        orderStatus: {
          [Op.notIn]: ["cancelled"],
        },
      },
      attributes: ["totalAmount"],
    });

    const timeframeRevenueTotal = timeframeRevenue.reduce(
      (sum, order) => sum + parseFloat(order.totalAmount || 0),
      0
    );

    res.json({
      message: "Admin dashboard data retrieved successfully",
      stats: {
        totalUsers,
        totalOrders,
        totalProducts,
        totalRevenue: parseFloat(totalRevenue.toFixed(2)),
        timeframeOrders,
        timeframeRevenue: parseFloat(timeframeRevenueTotal.toFixed(2)),
      },
      recentOrders: recentOrders.map((order) => ({
        id: order.id,
        status: order.orderStatus,
        totalAmount: order.totalAmount,
        createdAt: order.createdAt,
        user: order.User,
      })),
      recentUsers,
      topProducts: topProducts.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        rating: product.rating,
        reviewCount: product.reviewCount,
        stock: product.stock,
      })),
      orderStatus,
      timeframe,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------- GET ALL USERS -----------------------

router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["createdAt", "DESC"]],
    });

    res.json({
      message: "Users retrieved successfully",
      users,
    });
  } catch (error) {
    console.error("Get Users Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------- GET USER BY ID -----------------------

router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User retrieved successfully",
      user,
    });
  } catch (error) {
    console.error("Get User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------- UPDATE USER -----------------------

router.put("/users/:id", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, isAdmin } = req.body;

    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.isAdmin = isAdmin !== undefined ? isAdmin : user.isAdmin;

    await user.save();

    res.json({
      message: "User updated successfully",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error("Update User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------- DELETE USER -----------------------

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent deleting self
    if (user.id === req.userId) {
      return res
        .status(400)
        .json({ message: "Cannot delete your own account" });
    }

    await user.destroy();

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete User Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------- GET ALL ORDERS -----------------------

router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          as: "User",
          attributes: ["firstName", "lastName", "email"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({
      message: "Orders retrieved successfully",
      orders,
    });
  } catch (error) {
    console.error("Get Orders Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------- UPDATE ORDER STATUS -----------------------

router.put("/orders/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = status;
    await order.save();

    res.json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update Order Status Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------- GET ALL PRODUCTS -----------------------

router.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json({
      message: "Products retrieved successfully",
      products,
    });
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------- GET PRODUCT BY ID -----------------------

router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product retrieved successfully",
      product,
    });
  } catch (error) {
    console.error("Get Product Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------- UPDATE PRODUCT STATUS -----------------------

router.put("/products/:id/status", async (req, res) => {
  try {
    const { isActive } = req.body;

    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.isActive = isActive;
    await product.save();

    res.json({
      message: "Product status updated successfully",
      product,
    });
  } catch (error) {
    console.error("Update Product Status Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------- UPDATE PRODUCT -----------------------

router.put("/products/:id", handleUpload, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      originalPrice,
      category,
      subcategory,
      stock,
      brand,
      sellerName,
      location,
      isActive,
      isFeatured,
      tags,
      specifications,
      existingImages,
    } = req.body;

    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Handle new image uploads
    let newImageUrls = [];
    if (req.files && req.files.length > 0) {
      newImageUrls = req.files.map(
        (file) => `/uploads/products/${file.filename}`
      );
    }

    // Handle existing images
    let existingImageUrls = [];
    if (existingImages) {
      try {
        existingImageUrls = Array.isArray(existingImages)
          ? existingImages
          : JSON.parse(existingImages);
      } catch (e) {
        console.warn("Invalid existing images format:", e);
      }
    }

    // Combine existing and new images
    const allImages = [...existingImageUrls, ...newImageUrls];

    // Parse tags if provided
    let parsedTags = product.tags || [];
    if (tags) {
      try {
        parsedTags = Array.isArray(tags) ? tags : JSON.parse(tags);
      } catch (e) {
        parsedTags = tags.split(",").map((tag) => tag.trim());
      }
    }

    // Parse specifications if provided
    let parsedSpecifications = product.specifications || {};
    if (specifications) {
      try {
        parsedSpecifications =
          typeof specifications === "string"
            ? JSON.parse(specifications)
            : specifications;
      } catch (e) {
        console.warn("Invalid specifications format:", e);
      }
    }

    // Update product fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price ? parseFloat(price) : product.price;
    product.originalPrice = originalPrice
      ? parseFloat(originalPrice)
      : product.originalPrice;
    product.category = category || product.category;
    product.subcategory = subcategory || product.subcategory;
    product.stock = stock !== undefined ? parseInt(stock) : product.stock;
    product.brand = brand || product.brand;
    product.sellerName = sellerName || product.sellerName;
    product.location = location || product.location;
    product.images = allImages.length > 0 ? allImages : product.images;
    product.isActive =
      isActive !== undefined
        ? isActive === "true" || isActive === true
        : product.isActive;
    product.isFeatured =
      isFeatured !== undefined
        ? isFeatured === "true" || isFeatured === true
        : product.isFeatured;
    product.tags = parsedTags;
    product.specifications = parsedSpecifications;

    await product.save();

    res.json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------- DELETE PRODUCT -----------------------

router.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete image files from uploads folder
    if (product.images && product.images.length > 0) {
      const fs = require("fs");
      const path = require("path");

      product.images.forEach((imageUrl) => {
        if (imageUrl && imageUrl.startsWith("/uploads/products/")) {
          const imagePath = path.join(__dirname, "..", "..", imageUrl);
          try {
            if (fs.existsSync(imagePath)) {
              fs.unlinkSync(imagePath);
              console.log(`Deleted image: ${imagePath}`);
            }
          } catch (error) {
            console.error(`Error deleting image ${imagePath}:`, error);
          }
        }
      });
    }

    await product.destroy();

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ----------------------- CREATE PRODUCT -----------------------

router.post("/products", handleUpload, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      originalPrice,
      category,
      subcategory,
      stock,
      brand,
      sellerName,
      location,
      isActive,
      isFeatured,
      tags,
      specifications,
    } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category || stock === undefined) {
      return res.status(400).json({
        message:
          "Missing required fields: name, description, price, category, stock",
      });
    }

    // Handle image uploads
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      console.log(`Uploading ${req.files.length} images`);
      imageUrls = req.files.map((file) => {
        const imageUrl = `/uploads/products/${file.filename}`;
        console.log(`Image uploaded: ${imageUrl}`);
        return imageUrl;
      });
    } else {
      console.log("No images uploaded");
    }

    // Parse tags if provided
    let parsedTags = [];
    if (tags) {
      try {
        parsedTags = Array.isArray(tags) ? tags : JSON.parse(tags);
      } catch (e) {
        parsedTags = tags.split(",").map((tag) => tag.trim());
      }
    }

    // Parse specifications if provided
    let parsedSpecifications = {};
    if (specifications) {
      try {
        parsedSpecifications =
          typeof specifications === "string"
            ? JSON.parse(specifications)
            : specifications;
      } catch (e) {
        console.warn("Invalid specifications format:", e);
      }
    }

    // Create the product
    const product = await Product.create({
      name,
      description,
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : null,
      category,
      subcategory: subcategory || null,
      stock: parseInt(stock),
      brand: brand || null,
      sellerName: sellerName || null,
      location: location || null,
      images: imageUrls,
      isActive: isActive === "true" || isActive === true,
      isFeatured: isFeatured === "true" || isFeatured === true,
      tags: parsedTags,
      specifications: parsedSpecifications,
      rating: 0,
      reviewCount: 0,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
