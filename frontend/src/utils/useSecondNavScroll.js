import { useState, useEffect } from "react";

// Custom hook to control secondary navbar visibility on scroll
export default function useSecondNavScroll() {
  const [showSecondNav, setShowSecondNav] = useState(true);

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

  return showSecondNav;
}
