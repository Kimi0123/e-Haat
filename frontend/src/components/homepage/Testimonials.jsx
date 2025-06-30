import { FaStar, FaQuoteLeft } from "react-icons/fa";

function Testimonials() {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Home Chef",
      location: "Mumbai, Maharashtra",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      review:
        "e-Haat has transformed my home-based catering business. I can now reach customers across the city and showcase my traditional recipes. The platform is so user-friendly!",
      category: "Food & Catering",
    },
    {
      name: "Rahul Kumar",
      role: "Artisan",
      location: "Jaipur, Rajasthan",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      review:
        "As a traditional handicraft artisan, e-Haat has given me a platform to showcase my work to customers nationwide. The support team is amazing and payments are always on time.",
      category: "Handicrafts",
    },
    {
      name: "Meera Patel",
      role: "Customer",
      location: "Bangalore, Karnataka",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      review:
        "I love shopping on e-Haat! The quality of products is exceptional and I feel good knowing I'm supporting local businesses. Delivery is always prompt and packaging is eco-friendly.",
      category: "Regular Customer",
    },
    {
      name: "Amit Singh",
      role: "Farmer",
      location: "Punjab",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      review:
        "e-Haat has revolutionized how I sell my produce. I can now reach customers directly without middlemen, ensuring better prices for both me and my customers.",
      category: "Agriculture",
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            What Our Community Says
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from real people. Discover how e-Haat is making a
            difference in the lives of sellers and customers across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 group"
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <FaQuoteLeft className="text-4xl text-primary/20 group-hover:text-primary/30 transition-colors" />
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex mr-3">
                  {renderStars(testimonial.rating)}
                </div>
                <span className="text-sm text-gray-500">5.0</span>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "{testimonial.review}"
              </p>

              {/* Author Info */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-primary/20">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-gray-500">
                    {testimonial.location}
                  </p>
                </div>
                <div className="ml-auto">
                  <span className="inline-block bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium">
                    {testimonial.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <div className="text-gray-600">Verified Reviews</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/testimonials"
            className="btn btn-outline btn-lg group hover:scale-105 transition-transform duration-300 border-2"
          >
            Read More Reviews
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

export default Testimonials;
