import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Banner from "../components/Hero";

export default function Homepage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Banner />
      
      <Footer />
    </div>
  );
}
