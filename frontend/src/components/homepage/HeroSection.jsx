import { FaArrowRight, FaPlay } from "react-icons/fa";

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary-focus to-secondary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        <div className="mb-8">
          <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
            🚀 India's Premier Digital Marketplace
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Welcome to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">
            e-Haat
          </span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
          Your one-stop digital marketplace connecting local artisans, farmers,
          and businesses with customers nationwide. Discover authentic products,
          support local communities.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a
            href="/signup"
            className="btn btn-accent btn-lg group hover:scale-105 transition-transform duration-300"
          >
            Get Started Free
            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </a>

          <button className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary transition-all duration-300">
            <FaPlay className="mr-2" />
            Watch Demo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-3xl font-bold mb-2">10K+</div>
            <div className="text-white/80">Active Sellers</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-3xl font-bold mb-2">50K+</div>
            <div className="text-white/80">Products Listed</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-3xl font-bold mb-2">100K+</div>
            <div className="text-white/80">Happy Customers</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
