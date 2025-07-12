import bag from "../assets/bag.svg";
import ehaat from "../assets/ehaat.svg";

export const NAVBAR_HEIGHT = 80;      // Primary nav height in px
export const SECOND_NAV_HEIGHT = 48;  // Secondary nav height in px

function Navbar({ showSecondNav, isMenuOpen, setMenuOpen }) {
  return (
    <>
      {/* Primary Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md text-black">
        <div className="flex justify-between items-center h-20 px-4 md:px-10">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-2">
            <img src={ehaat} alt="e-haat logo" className="h-10" />
          </a>

          {/* Search Bar (desktop only) */}
          <div className="hidden md:flex flex-1 justify-center">
            <input
              type="text"
              placeholder="Search products..."
              className="w-[250px] md:w-[400px] px-4 py-2 rounded-full border border-gray-300 focus:border-red-400 focus:outline-none shadow-sm text-black"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <a href="/login" className="text-sm hover:text-red-500">Login</a>
            <a
              href="/signup"
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm"
            >
              Sign Up
            </a>
            <a href="/cart">
              <img src={bag} alt="Cart" className="h-6" />
            </a>

            {/* Hamburger icon (mobile only) */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Secondary Nav (desktop only) with height animation */}
        <div
          className={`hidden md:flex justify-center items-center bg-gray-100 space-x-6 text-sm overflow-hidden transition-all duration-300 ${
            showSecondNav ? "h-12" : "h-0"
          }`}
        >
          <a href="/" className="hover:text-red-500">Home</a>
          <a href="/categories" className="hover:text-red-500">Categories</a>
          <a href="/deals" className="hover:text-red-500">Deals</a>
          <a href="/offers" className="hover:text-red-500">Offers</a>
          <a href="/about" className="hover:text-red-500">About</a>
          <a href="/contact" className="hover:text-red-500">Contact</a>
        </div>

        {/* Mobile Menu (shown when menu open) */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-md px-4 pt-2 pb-4">
            <a href="/" className="block py-2">Home</a>
            <a href="/categories" className="block py-2">Categories</a>
            <a href="/deals" className="block py-2">Deals</a>
            <a href="/offers" className="block py-2">Offers</a>
            <a href="/about" className="block py-2">About</a>
            <a href="/contact" className="block py-2">Contact</a>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
