import Logo from "../assets/logo.png";

function Navbar() {
  return (
    <>
      <nav className="navbar bg-base-100 shadow-lg">
        <div className="navbar-start">
          <a href="/" className="btn btn-ghost">
            <img src={Logo} alt="Logo" className="h-20 w-30" />
          </a>
        </div>
        <div className="navbar-center group">
          <input
            type="text"
            placeholder="Search..."
            className="w-[200px] sm:w-[200px] group-hover:w-[400px] focus:w-[400px] transition-all duration-300 ease-in-out px-4 py-2 rounded-full border border-gray-300 focus:border-blue-500 focus:outline-none shadow-sm focus:shadow-md"
          />
        </div>
        <div className="navbar-end">
          <a href="/login" className="btn btn-outline">
            Login
          </a>
          <a href="/signup" className="btn btn-primary ml-2">
            Sign Up
          </a>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
