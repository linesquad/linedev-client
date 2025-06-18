import { Link } from "@tanstack/react-router";
import { FaSignOutAlt, FaBars, FaTimes, FaUser } from "react-icons/fa";
import type { User } from "../../services/auth";
import { useState } from "react";
import { navLinks } from "../../lib/navRoutes";

interface HeaderProps {
  user: User | null;
  role: string | null;
  onLogout: () => void;
}

function Header({ user, role, onLogout }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  if (typeof window !== "undefined") {
    window.onscroll = () => {
      setScrolled(window.scrollY > 20);
    };
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 border-b text-gray-400 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
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
            {navLinks
              .filter((link) => link.label !== "Blog")
              .map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block relative font-code text-xl uppercase text-n-1 transition-colors hover:text-color-1 px-6 py-2 lg:font-semibold lg:text-n-1/50 lg:leading-5 lg:hover:text-n-1 xl:px-12 hover:text-white/80 hover:transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
          </div>
        </nav>

        <div
          className={`fixed top-0 left-0 w-full h-screen bg-[#0E0C15] transform transition-transform duration-300 ease-in-out lg:hidden z-40 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {navLinks
              .filter((link) => link.label !== "Blog")
              .map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 py-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            {user && role === "senior" && (
              <Link
                to="/blog"
                onClick={() => setIsMenuOpen(false)}
                className="block font-code cursor-pointer text-2xl uppercase text-n-1 transition-colors hover:text-color-1 py-3"
              >
                Blog
              </Link>
            )}
            {!user && (
              <>
                <Link
                  to="/signin"
                  className="group relative w-48 overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-pink-600 p-0.5 text-white shadow-lg transition-all duration-300 hover:from-purple-700 hover:to-pink-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="relative flex items-center justify-center gap-2 rounded-full bg-[#0E0C15] px-6 py-2.5 group-hover:bg-transparent">
                    <FaUser className="h-5 w-5" />
                    <span className="font-medium">Sign In</span>
                  </div>
                </Link>
                <Link
                  to="/signup"
                  className="group relative w-48 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-teal-500 p-0.5 text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-teal-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="relative flex items-center justify-center gap-2 rounded-full bg-[#0E0C15] px-6 py-2.5 group-hover:bg-transparent">
                    <FaUser className="h-5 w-5" />
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
                className="group relative w-48 overflow-hidden rounded-full bg-gradient-to-r from-red-500 to-orange-500 p-0.5 text-white shadow-lg transition-all duration-300 hover:from-red-600 hover:to-orange-600"
              >
                <div className="relative flex items-center justify-center gap-2 rounded-full bg-[#0E0C15] px-6 py-2.5 group-hover:bg-transparent">
                  <FaSignOutAlt className="h-5 w-5" />
                  <span className="font-medium">Sign Out</span>
                </div>
              </button>
            )}
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-end flex-1 space-x-4">
          {user && role === "senior" && (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center cursor-pointer gap-2 px-4 py-2 text-n-1 hover:text-color-1 transition"
              >
                <FaUser className="text-lg" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <Link
                    to="/blog"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Blog
                  </Link>
                </div>
              )}
            </div>
          )}
          {user ? (
            <button
              onClick={onLogout}
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-red-500 to-orange-500 p-0.5 text-white shadow-lg transition-all duration-300 hover:from-red-600 hover:to-orange-600"
            >
              <div className="relative flex items-center justify-center gap-2 rounded-full bg-[#0E0C15] px-5 py-2 group-hover:bg-transparent">
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
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-pink-600 p-0.5 text-white shadow-lg transition-all duration-300 hover:from-purple-700 hover:to-pink-700"
              >
                <div className="relative flex items-center justify-center gap-2 rounded-full bg-[#0E0C15] px-5 py-2 group-hover:bg-transparent">
                  <FaUser className="h-4 w-4" />
                  <span className="hidden xl:block font-medium text-sm">
                    Sign In
                  </span>
                </div>
              </Link>
              <Link
                to="/signup"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-teal-500 p-0.5 text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-teal-600"
              >
                <div className="relative flex items-center justify-center gap-2 rounded-full bg-[#0E0C15] px-5 py-2 group-hover:bg-transparent">
                  <FaUser className="h-4 w-4" />
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
