import  { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import useAuth from "../useAuth";
export const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();


  const getLinkClass = (path) => {
    const baseClass = "hover:text-blue-800 dark:hover:text-blue-400";
    const activeClass = "text-blue-700 dark:text-blue-500";
    const inactiveClass = "text-gray-900 dark:text-white";
    
    return location.pathname === path
      ? `${baseClass} ${activeClass}`
      : `${baseClass} ${inactiveClass}`;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
    <div className="container mx-auto px-4 flex items-center justify-between h-20">
      <div className="flex items-center space-x-8">
        <div className="flex items-center">
          <img src={logo} className="h-16 mr-3" alt="CiptaKerja Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Cipta Kerja
          </span>
        </div>

        <ul className="hidden md:flex space-x-8 font-medium">
          <li>
            <Link to="/" className={getLinkClass("/")}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className={getLinkClass("/about")}>
              About
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex items-center">
        {user ? (
          <>
            <Link to="/dashboard" className="hidden md:inline-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-2">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="hidden md:inline-block text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hidden md:inline-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-2">
              Login
            </Link>
            <Link to="/register" className="hidden md:inline-block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              Register
            </Link>
          </>
        )}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 ml-2"
          aria-controls="navbar-sticky"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
    </div>
    
    <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
      <ul className="flex flex-col items-center py-4 space-y-4 font-medium w-full px-4">
        <li className="w-full text-center">
          <Link
            to="/"
            className={`${getLinkClass("/")} block py-2`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
        </li>
        <li className="w-full text-center">
          <Link
            to="/about"
            className={`${getLinkClass("/about")} block py-2`}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
        </li>
        {user ? (
          <>
            <li className="w-full">
              <Link
                to="/dashboard"
                className="w-full block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            </li>
            <li className="w-full">
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-700"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="w-full">
              <Link
                to="/login"
                className="w-full block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="/register"
                className="w-full block text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>  
  </nav>
  );
};