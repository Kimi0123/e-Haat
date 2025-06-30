import {
  FaUtensils,
  FaPalette,
  FaTshirt,
  FaMobile,
  FaHome,
  FaLeaf,
} from "react-icons/fa";

function Categories() {
  const categories = [
    {
      icon: <FaUtensils className="text-4xl" />,
      name: "Groceries & Food",
      description: "Fresh produce, dairy, and pantry essentials",
      count: "2.5K+ Products",
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: <FaPalette className="text-4xl" />,
      name: "Handicrafts",
      description: "Traditional and modern artisanal products",
      count: "1.8K+ Products",
      color: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: <FaTshirt className="text-4xl" />,
      name: "Fashion & Textiles",
      description: "Traditional wear and modern fashion",
      count: "3.2K+ Products",
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: <FaMobile className="text-4xl" />,
      name: "Electronics",
      description: "Gadgets and electronic accessories",
      count: "1.5K+ Products",
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: <FaHome className="text-4xl" />,
      name: "Home & Living",
      description: "Furniture, decor, and household items",
      count: "2.1K+ Products",
      color: "from-pink-400 to-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      icon: <FaLeaf className="text-4xl" />,
      name: "Organic & Natural",
      description: "Organic products and natural remedies",
      count: "900+ Products",
      color: "from-teal-400 to-teal-600",
      bgColor: "bg-teal-50",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover authentic products from local artisans, farmers, and
            businesses across India. Each category represents a unique story and
            tradition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100 overflow-hidden cursor-pointer"
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              ></div>

              {/* Icon */}
              <div className="relative z-10 mb-6">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {category.icon}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {category.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {category.count}
                  </span>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
              ></div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="/categories"
            className="btn btn-outline btn-lg group hover:scale-105 transition-transform duration-300 border-2"
          >
            Explore All Categories
            <svg
              className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Categories;
