import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/homepage/HeroSection";
import Features from "../components/homepage/Features";
import Categories from "../components/homepage/Categories";
import HowItWorks from "../components/homepage/HowItWorks";
import Testimonials from "../components/homepage/Testimonials";

export default function Homepage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <Features />
      <Categories />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
}
