import {
  FaUserPlus,
  FaSearch,
  FaShoppingCart,
  FaTruck,
  FaStar,
} from "react-icons/fa";

function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: <FaUserPlus className="text-3xl" />,
      title: "Create Account",
      description:
        "Sign up in seconds with your email or phone number. Complete your profile to get personalized recommendations.",
      color: "from-blue-500 to-blue-600",
    },
    {
      number: "02",
      icon: <FaSearch className="text-3xl" />,
      title: "Browse & Discover",
      description:
        "Explore thousands of products from local sellers. Use filters and search to find exactly what you need.",
      color: "from-green-500 to-green-600",
    },
    {
      number: "03",
      icon: <FaShoppingCart className="text-3xl" />,
      title: "Add to Cart & Checkout",
      description:
        "Add items to your cart and proceed to secure checkout. Multiple payment options available.",
      color: "from-purple-500 to-purple-600",
    },
    {
      number: "04",
      icon: <FaTruck className="text-3xl" />,
      title: "Fast Delivery",
      description:
        "Get your order delivered to your doorstep. Track your package in real-time with our delivery partners.",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            How e-Haat Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting started with e-Haat is simple and straightforward. Follow
            these easy steps to start shopping from local businesses.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-secondary/20 transform -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 text-center group">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                      {step.number}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="mb-6 mt-4">
                    <div
                      className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <FaStar className="text-3xl text-yellow-500 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">
                Ready to Get Started?
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Join thousands of customers who are already enjoying the benefits
              of shopping local on e-Haat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/signup"
                className="btn btn-primary btn-lg group hover:scale-105 transition-transform duration-300"
              >
                Start Shopping Now
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
              <a
                href="/about"
                className="btn btn-outline btn-lg group hover:scale-105 transition-transform duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
