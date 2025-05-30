import { Link } from "@tanstack/react-router";
import {
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUser,
  FaArrowRight,
} from "react-icons/fa";
import type { User } from "../../services/auth";
import { useState, useEffect } from "react";

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

function Header({ user, onLogout }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 border-b border-gray-900 bg-[#0E0C15]/60 backdrop-blur-sm text-gray-400 transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}
    >
      <div className="flex items-center justify-between px-4 sm:px-5 lg:px-7.5 xl:px-10 max-lg:py-2">
        <div className="flex items-center gap-2 flex-1">
          <img src="/lineMainLogo.png" alt="LineDevLTD" className="w-10 h-10" />
          <Link to="/">
            <h1 className="text-base sm:text-lg tracking-wide text-n-10">
              LineDevLTD
            </h1>
          </Link>
        </div>

        <button
          className="lg:hidden text-white text-2xl z-50 absolute right-4"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav className="hidden lg:flex flex-1 justify-center">
          <div className="flex items-center justify-center">
            <Link
              to="/"
              className="block relative font-code text-xl uppercase text-n-1 transition-colors hover:text-color-1 px-6 py-2 lg:font-semibold lg:text-n-1/50 lg:leading-5 lg:hover:text-n-1 xl:px-12 hover:text-white/80 hover:transition-all duration-300"
            >
              Home
            </Link>
            <Link
              to="/profile"
              className="block relative font-code text-xl uppercase text-n-1 transition-colors hover:text-color-1 px-6 py-2 lg:font-semibold lg:text-n-1/50 lg:leading-5 lg:hover:text-n-1 xl:px-12 hover:text-white/80 hover:transition-all duration-300"
            >
              Profile
            </Link>
            <Link
              to="/profile"
              className="block relative font-code text-xl uppercase text-n-1 transition-colors hover:text-color-1 px-6 py-2 lg:font-semibold lg:text-n-1/50 lg:leading-5 lg:hover:text-n-1 xl:px-12 hover:text-white/80 hover:transition-all duration-300"
            >
              Profile
            </Link>
            <Link
              to="/profile"
              className="block relative font-code text-xl uppercase text-n-1 transition-colors hover:text-color-1 px-6 py-2 lg:font-semibold lg:text-n-1/50 lg:leading-5 lg:hover:text-n-1 xl:px-12 hover:text-white/80 hover:transition-all duration-300"
            >
              Profile
            </Link>
          </div>
        </nav>

        <div
          className={`fixed top-0 left-0 w-full h-screen bg-[#0E0C15] transform transition-transform duration-300 ease-in-out lg:hidden z-40 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <Link
              to="/"
              className="block font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 py-3"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/profile"
              className="block font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 py-3"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
            {!user && (
              <>
                <Link
                  to="/signin"
                  className="group relative w-48 overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-pink-600 p-0.5 text-white shadow-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-700 hover:to-pink-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="relative flex items-center justify-center gap-2 rounded-full bg-[#0E0C15] px-6 py-2.5 transition-all duration-300 group-hover:bg-transparent">
                    <FaUser className="h-5 w-5" />
                    <span className="font-medium ">Sign In</span>
                  </div>
                </Link>
                <Link
                  to="/signup"
                  className="group relative w-48 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-teal-500 p-0.5 text-white shadow-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-700 hover:to-teal-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="relative flex items-center justify-center gap-2 rounded-full bg-[#0E0C15] px-6 py-2.5 transition-all duration-300 group-hover:bg-transparent">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                    <span className="font-medium">Sign Up</span>
                  </div>
                </Link>
              </>
            )}
            {user && (
              <button
                onClick={() => {
                  onLogout();
                  setIsMenuOpen(false);
                }}
                className="group relative w-48 overflow-hidden rounded-full bg-gradient-to-r from-red-500 to-orange-500 p-0.5 text-white shadow-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-600"
              >
                <div className="relative flex items-center justify-center gap-2 rounded-full bg-[#0E0C15] px-6 py-2.5 transition-all duration-300 group-hover:bg-transparent">
                  <FaSignOutAlt className="h-5 w-5" />
                  <span className="font-medium">Sign Out</span>
                </div>
              </button>
            )}
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-end flex-1 space-x-4">
          {user ? (
            <button
              onClick={onLogout}
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-red-500 to-orange-500 p-0.5 text-white shadow-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-600"
            >
              <div className="relative flex items-center justify-center gap-2 rounded-full bg-[#0E0C15] px-5 py-2 transition-all duration-300 group-hover:bg-transparent">
                <FaSignOutAlt className="h-4 w-4" />
                <span className="hidden xl:block font-medium text-sm">
                  Sign Out
                </span>
              </div>
            </button>
          ) : (
            <>
              <Link
                to="/signin"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-pink-600 p-0.5 text-white shadow-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-700 hover:to-pink-700"
              >
                <div className="relative flex items-center justify-center gap-2 rounded-full bg-[#0E0C15] px-5 py-2 transition-all duration-300 group-hover:bg-transparent">
                  <FaUser className="h-4 w-4" />
                  <span className="hidden xl:block font-medium text-sm">
                    Sign In
                  </span>
                </div>
              </Link>
              <Link
                to="/signup"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-teal-500 p-0.5 text-white shadow-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-700 hover:to-teal-600"
              >
                <div className="relative flex items-center justify-center gap-2 rounded-full bg-[#0E0C15] px-5 py-2 transition-all duration-300 group-hover:bg-transparent">
                  <FaArrowRight className="h-4 w-4" />
                  <span className="hidden xl:block font-medium text-sm">
                    Sign Up
                  </span>
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
