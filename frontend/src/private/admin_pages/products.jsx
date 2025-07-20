import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaBox,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaEye,
  FaTag,
  FaDollarSign,
  FaStar,
  FaImage,
  FaDownload,
  FaPrint,
  FaUpload,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { useNotification } from "../../NotificationContext";
import AdminNavbar from "../../components/AdminNavbar";
import { formatCurrency } from "../../utils/currency";

const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const { showNotification } = useNotification();
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, categoryFilter, statusFilter]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const adminToken = localStorage.getItem("adminToken");

      const response = await fetch("http://localhost:5000/api/admin/products", {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
      } else {
        showNotification(
          "error",
          "Failed to fetch products",
          "Please try again later."
        );
      }
    } catch (error) {
      console.error("Products fetch error:", error);
      showNotification("error", "Connection Error", "Unable to load products.");
    } finally {
      setIsLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    // Filter by category
    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((product) => {
        if (statusFilter === "active") return product.isActive;
        if (statusFilter === "inactive") return !product.isActive;
        if (statusFilter === "outOfStock") return product.stock === 0;
        return true;
      });
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.brand &&
            product.brand.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredProducts(filtered);
  };

  const updateProductStatus = async (productId, newStatus) => {
    try {
      const adminToken = localStorage.getItem("adminToken");

      const response = await fetch(
        `http://localhost:5000/api/admin/products/${productId}/status`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isActive: newStatus }),
        }
      );

      if (response.ok) {
        showNotification(
          "success",
          "Product Updated",
          `Product status updated successfully`
        );
        fetchProducts(); // Refresh products
      } else {
        showNotification(
          "error",
          "Update Failed",
          "Failed to update product status."
        );
      }
    } catch (error) {
      console.error("Update product error:", error);
      showNotification(
        "error",
        "Connection Error",
        "Unable to update product."
      );
    }
  };

  const deleteProduct = async (productId, productName) => {
    // Set the product to be deleted for confirmation
    setDeleteConfirm({ id: productId, name: productName });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;

    try {
      const adminToken = localStorage.getItem("adminToken");

      const response = await fetch(
        `http://localhost:5000/api/admin/products/${deleteConfirm.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${adminToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        showNotification(
          "success",
          "Product Deleted",
          `${deleteConfirm.name} has been deleted successfully`
        );
        fetchProducts(); // Refresh products
      } else {
        showNotification("error", "Delete Failed", "Failed to delete product.");
      }
    } catch (error) {
      console.error("Delete product error:", error);
      showNotification(
        "error",
        "Connection Error",
        "Unable to delete product."
      );
    } finally {
      setDeleteConfirm(null); // Clear confirmation
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NP", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (isActive, stock) => {
    if (!isActive) return "bg-red-100 text-red-800";
    if (stock === 0) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  const getStatusText = (isActive, stock) => {
    if (!isActive) return "Inactive";
    if (stock === 0) return "Out of Stock";
    return "Active";
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />

      {/* Header */}
      <div
        className="bg-white shadow-sm border-b"
        style={{ marginTop: "80px" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Product Management
              </h1>
              <p className="text-gray-600">
                Manage all products in the e-Haat catalog
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/admin/products/add")}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FaPlus className="mr-2" />
                Add Product
              </button>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <FaDownload className="mr-2" />
                Export
              </button>
              <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                <FaPrint className="mr-2" />
                Print
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <motion.div
          className="bg-white rounded-lg shadow-sm border p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Products
              </label>
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, description, or brand..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black bg-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Filter
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black bg-white"
              >
                <option value="all" className="text-black">
                  All Categories
                </option>
                <option value="electronics" className="text-black">
                  Electronics
                </option>
                <option value="clothing" className="text-black">
                  Clothing
                </option>
                <option value="home" className="text-black">
                  Home & Garden
                </option>
                <option value="beauty" className="text-black">
                  Beauty & Health
                </option>
                <option value="sports" className="text-black">
                  Sports & Outdoors
                </option>
                <option value="books" className="text-black">
                  Books & Media
                </option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status Filter
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black bg-white"
              >
                <option value="all" className="text-black">
                  All Status
                </option>
                <option value="active" className="text-black">
                  Active
                </option>
                <option value="inactive" className="text-black">
                  Inactive
                </option>
                <option value="outOfStock" className="text-black">
                  Out of Stock
                </option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("all");
                  setStatusFilter("all");
                }}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </motion.div>

        {/* Products Table */}
        <motion.div
          className="bg-white rounded-lg shadow-sm border overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">
              Products ({filteredProducts.length})
            </h2>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <img
                              className="h-12 w-12 rounded-lg object-cover"
                              src={
                                product.images && product.images.length > 0
                                  ? `http://localhost:5000${product.images[0]}`
                                  : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='12' fill='%236b7280'%3ENo Image%3C/text%3E%3C/svg%3E"
                              }
                              alt={product.name}
                              onError={(e) => {
                                e.target.src =
                                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='12' fill='%236b7280'%3ENo Image%3C/text%3E%3C/svg%3E";
                              }}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {product.brand || "N/A"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 capitalize">
                          {product.category}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(product.price)}
                        </div>
                        {product.originalPrice &&
                          product.originalPrice > product.price && (
                            <div className="text-sm text-gray-500 line-through">
                              {formatCurrency(product.originalPrice)}
                            </div>
                          )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {product.stock}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            product.isActive,
                            product.stock
                          )}`}
                        >
                          {getStatusText(product.isActive, product.stock)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openProductModal(product)}
                            className="text-blue-600 hover:text-blue-900"
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          <button
                            onClick={() =>
                              navigate(`/admin/products/edit/${product.id}`)
                            }
                            className="text-green-600 hover:text-green-900"
                            title="Edit Product"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() =>
                              deleteProduct(product.id, product.name)
                            }
                            className="text-red-600 hover:text-red-900"
                            title="Delete Product"
                          >
                            <FaTrash />
                          </button>
                          <select
                            value={product.isActive ? "active" : "inactive"}
                            onChange={(e) =>
                              updateProductStatus(
                                product.id,
                                e.target.value === "active"
                              )
                            }
                            className="text-sm border border-gray-300 rounded px-2 py-1 text-black bg-white"
                          >
                            <option value="active" className="text-black">
                              Active
                            </option>
                            <option value="inactive" className="text-black">
                              Inactive
                            </option>
                          </select>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <FaBox className="text-gray-400 text-4xl mx-auto mb-4" />
              <p className="text-gray-500">No products found</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Product Details Modal */}
      {showProductModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-black">
                  Product Details - {selectedProduct.name}
                </h3>
                <button
                  onClick={() => setShowProductModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Product Images */}
              {selectedProduct.images && selectedProduct.images.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium text-black mb-3">
                    Product Images
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {selectedProduct.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={`http://localhost:5000${image}`}
                          alt={`${selectedProduct.name} - Image ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-black mb-2">
                    Product Information
                  </h4>
                  <div className="space-y-2 text-sm text-black">
                    <p>
                      <span className="font-medium text-black">Name:</span>{" "}
                      <span className="text-black">{selectedProduct.name}</span>
                    </p>
                    <p>
                      <span className="font-medium text-black">Brand:</span>{" "}
                      <span className="text-black">
                        {selectedProduct.brand || "N/A"}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium text-black">Category:</span>{" "}
                      <span className="text-black">
                        {selectedProduct.category}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium text-black">Price:</span>{" "}
                      <span className="text-black">
                        {formatCurrency(selectedProduct.price)}
                      </span>
                    </p>
                    {selectedProduct.originalPrice && (
                      <p>
                        <span className="font-medium text-black">
                          Original Price:
                        </span>{" "}
                        <span className="text-black">
                          {formatCurrency(selectedProduct.originalPrice)}
                        </span>
                      </p>
                    )}
                    <p>
                      <span className="font-medium text-black">Stock:</span>{" "}
                      <span className="text-black">
                        {selectedProduct.stock} units
                      </span>
                    </p>
                    <p>
                      <span className="font-medium text-black">SKU:</span>{" "}
                      <span className="text-black">
                        {selectedProduct.sku || "N/A"}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-black mb-2">
                    Product Status
                  </h4>
                  <div className="space-y-2 text-sm text-black">
                    <p>
                      <span className="font-medium text-black">Status:</span>
                      <span
                        className={`ml-1 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          selectedProduct.isActive,
                          selectedProduct.stock
                        )}`}
                      >
                        {getStatusText(
                          selectedProduct.isActive,
                          selectedProduct.stock
                        )}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium text-black">Rating:</span>{" "}
                      <span className="text-black">
                        {selectedProduct.rating || "No ratings"}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium text-black">Created:</span>{" "}
                      <span className="text-black">
                        {formatDate(selectedProduct.createdAt)}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium text-black">
                        Last Updated:
                      </span>{" "}
                      <span className="text-black">
                        {formatDate(selectedProduct.updatedAt)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {selectedProduct.description && (
                <div className="mt-6">
                  <h4 className="font-medium text-black mb-2">Description</h4>
                  <div className="text-sm text-black">
                    {selectedProduct.description}
                  </div>
                </div>
              )}

              {selectedProduct.features &&
                selectedProduct.features.length > 0 && (
                  <div className="mt-6">
                    <h4 className="font-medium text-black mb-2">Features</h4>
                    <ul className="text-sm text-black space-y-1">
                      {selectedProduct.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <FaCheckCircle className="text-green-500 mr-2 text-xs" />
                          <span className="text-black">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>

            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <FaTrash className="text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-black">
                    Confirm Deletion
                  </h3>
                  <p className="text-sm text-gray-600">
                    This action cannot be undone
                  </p>
                </div>
              </div>

              <p className="text-gray-700 mb-6">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-black">
                  "{deleteConfirm.name}"
                </span>
                ? This will permanently remove the product and all its images.
              </p>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete Product
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
