import {
  FaShieldAlt,
  FaTruck,
  FaHandshake,
  FaGlobe,
  FaCreditCard,
  FaHeadset,
} from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaShieldAlt className="text-4xl text-primary" />,
      title: "Secure & Trusted",
      description:
        "Bank-grade security with SSL encryption. Your data and transactions are completely protected.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <FaTruck className="text-4xl text-primary" />,
      title: "Fast Delivery",
      description:
        "Same-day delivery in major cities. Nationwide shipping with real-time tracking.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <FaHandshake className="text-4xl text-primary" />,
      title: "Local Support",
      description:
        "Support local artisans and farmers. Every purchase makes a difference in communities.",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: <FaGlobe className="text-4xl text-primary" />,
      title: "Wide Selection",
      description:
        "From handcrafted goods to farm-fresh produce. Discover unique products from across India.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: <FaCreditCard className="text-4xl text-primary" />,
      title: "Easy Payments",
      description:
        "Multiple payment options including UPI, cards, and digital wallets. Buy now, pay later available.",
      color: "from-red-500 to-red-600",
    },
    {
      icon: <FaHeadset className="text-4xl text-primary" />,
      title: "24/7 Support",
      description:
        "Round-the-clock customer support. Chat, call, or email - we're here to help anytime.",
      color: "from-teal-500 to-teal-600",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-base-100 to-base-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Why Choose e-Haat?
          </h2>
          <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
            We're not just a marketplace - we're a community that connects
            buyers with authentic, quality products while supporting local
            businesses and artisans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-base-200"
            >
              <div className="mb-6 flex justify-center">
                <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4 text-center group-hover:text-primary transition-colors">
                {feature.title}
              </h3>

              <p className="text-base-content/70 text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <a
            href="/signup"
            className="btn btn-primary btn-lg group hover:scale-105 transition-transform duration-300"
          >
            Join Our Community
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

export default Features;
