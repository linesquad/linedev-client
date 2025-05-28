import { Link } from "@tanstack/react-router";
import { FaSignOutAlt } from "react-icons/fa";
import type { User } from "../../services/auth";

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

function Header({ user, onLogout }: HeaderProps) {
  return (
    <div className="fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm bg-n-8/90 backdrop-blur-sm bg-[#0E0C15] text-gray-400 py-4">
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <div className="w-[12rem] xl:mr-8 flex items-center gap-2">
          <div className="w-[90px] h-[40px] rounded-full bg-n-8"></div>
          <h1 className="text-lg tracking-wide text-n-10">LineDevLTD</h1>
        </div>

        <nav className="lg:static lg:flex lg:mx-auto lg:bg-transparent">
          <div className="relative z-2 flex items-center justify-center m-auto lg:flex-row">
            <Link
              to="/home"
              className="block relative font-code text-xl uppercase text-n-1 transition-colors hover:text-color-1 px-6 py-2 lg:-mr-0.25 lg:font-semibold lg:text-n-1/50 lg:leading-5 lg:hover:text-n-1 xl:px-12"
            >
              Home
            </Link>
            <Link
              to="/profile"
              className="block relative font-code text-xl uppercase text-n-1 transition-colors hover:text-color-1 px-6 py-2 lg:-mr-0.25 lg:font-semibold lg:text-n-1/50 lg:leading-5 lg:hover:text-n-1 xl:px-12"
            >
              Profile
            </Link>
          </div>
        </nav>

        <div className="flex items-center ml-auto space-x-4">
          {user ? (
            <button onClick={onLogout} className="p-2">
              <FaSignOutAlt className="text-n-1/50 hover:text-n-1 cursor-pointer" />
            </button>
          ) : (
            <>
              <Link
                to="/signin"
                className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-white rounded-full shadow-md group"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#1d1228] group-hover:translate-x-0 ease">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                  Sign In
                </span>
                <span className="relative invisible">Sign In</span>
              </Link>
              <Link
                to="/signup"
                className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-medium text-white transition duration-300 ease-out border-2 border-white rounded-full shadow-md group"
              >
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#1d1228] group-hover:translate-x-0 ease">
                  <svg
                    className="w-6 h-6"
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
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                  Sign Up
                </span>
                <span className="relative invisible">Sign Up</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
