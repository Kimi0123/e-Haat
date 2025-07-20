const Product = require("../models/Product");
const { Op } = require("sequelize");
const Review = require("../models/Review");

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error("Get all products error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get featured products
exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.findAll({ where: { isFeatured: true } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Search products
exports.searchProducts = async (req, res) => {
  try {
    const { q, sort, price, category } = req.query;

    // If only category is provided, search by category
    if ((!q || q.trim() === "") && category && category !== "all") {
      // Build search conditions for category only
      const searchConditions = {
        category: { [Op.iLike]: `%${category}%` },
        isActive: true,
      };
      // Add price filter
      if (price && price !== "all") {
        switch (price) {
          case "under-1000":
            searchConditions.price = { [Op.lt]: 1000 };
            break;
          case "1000-5000":
            searchConditions.price = { [Op.between]: [1000, 4999] };
            break;
          case "5000-10000":
            searchConditions.price = { [Op.between]: [5000, 9999] };
            break;
          case "over-10000":
            searchConditions.price = { [Op.gte]: 10000 };
            break;
        }
      }
      // Build order clause
      let orderClause = [];
      switch (sort) {
        case "price-low":
          orderClause.push(["price", "ASC"]);
          break;
        case "price-high":
          orderClause.push(["price", "DESC"]);
          break;
        case "rating":
          orderClause.push(["rating", "DESC"]);
          break;
        case "newest":
          orderClause.push(["createdAt", "DESC"]);
          break;
        default:
          orderClause.push(["name", "ASC"]);
          break;
      }
      const products = await Product.findAll({
        where: searchConditions,
        order: orderClause,
        limit: 50,
      });
      return res.json({ products, total: products.length });
    }

    // Existing search logic
    if (!q || q.trim() === "") {
      return res.json({ products: [] });
    }

    const searchTerm = q.trim();

    // Build search conditions
    const searchConditions = {
      [Op.or]: [
        { name: { [Op.iLike]: `%${searchTerm}%` } },
        { description: { [Op.iLike]: `%${searchTerm}%` } },
        { category: { [Op.iLike]: `%${searchTerm}%` } },
        { subcategory: { [Op.iLike]: `%${searchTerm}%` } },
        { sellerName: { [Op.iLike]: `%${searchTerm}%` } },
      ],
      isActive: true,
    };

    // Add price filter
    if (price && price !== "all") {
      switch (price) {
        case "under-1000":
          searchConditions.price = { [Op.lt]: 1000 };
          break;
        case "1000-5000":
          searchConditions.price = { [Op.between]: [1000, 4999] };
          break;
        case "5000-10000":
          searchConditions.price = { [Op.between]: [5000, 9999] };
          break;
        case "over-10000":
          searchConditions.price = { [Op.gte]: 10000 };
          break;
      }
    }

    // Add category filter
    if (category && category !== "all") {
      searchConditions.category = { [Op.iLike]: `%${category}%` };
    }

    // Build order clause
    let orderClause = [];
    switch (sort) {
      case "price-low":
        orderClause.push(["price", "ASC"]);
        break;
      case "price-high":
        orderClause.push(["price", "DESC"]);
        break;
      case "rating":
        orderClause.push(["rating", "DESC"]);
        break;
      case "newest":
        orderClause.push(["createdAt", "DESC"]);
        break;
      default:
        // Default relevance sorting (by name match first)
        orderClause.push(["name", "ASC"]);
        break;
    }

    const products = await Product.findAll({
      where: searchConditions,
      order: orderClause,
      limit: 50, // Limit results to prevent overwhelming response
    });

    res.json({
      products,
      total: products.length,
    });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Search failed", error: err.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    // Fetch reviews for this product
    const reviews = await Review.findAll({ where: { productId: product.id } });
    const productWithReviews = { ...product.toJSON(), reviews };
    res.json(productWithReviews);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all unique categories
exports.getCategories = async (req, res) => {
  try {
    const products = await Product.findAll({ attributes: ["category"] });
    const categoryCounts = {};
    products.forEach((p) => {
      if (p.category) {
        categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
      }
    });
    const categories = Object.entries(categoryCounts).map(
      ([label, productCount]) => ({ label, productCount })
    );
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};
