import { useState, useEffect } from "react";
import Navbar, { NAVBAR_HEIGHT, SECOND_NAV_HEIGHT } from "../components/Navbar";
import Banner from "../components/Hero";
import Footer from "../components/Footer";

export default function Homepage() {
  const [showSecondNav, setShowSecondNav] = useState(true);
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setShowSecondNav(false);
      } else {
        setShowSecondNav(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Total navbar height depends on second nav visibility
  const totalNavbarHeight = NAVBAR_HEIGHT + (showSecondNav ? SECOND_NAV_HEIGHT : 0);

  return (
    <>
      <Navbar
        showSecondNav={showSecondNav}
        isMenuOpen={isMenuOpen}
        setMenuOpen={setMenuOpen}
      />

      {/* Add padding top to main so content is not hidden behind fixed navbar */}
      <main style={{ paddingTop: totalNavbarHeight }}>
        <Banner />
        {/* Add more sections/components here */}
      </main>

      <Footer />
    </>
  );
}
