import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { HiMenu, HiX } from "react-icons/hi";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const links = [
    { to: "/blog", label: "➕ Add Blog" },
    { to: "/blog/profile", label: "👤 Profile" },
    { to: "/blog/month", label: "📅 Month" },
    { to: "/blog/all", label: "📚 All Blogs" },
  ];

  return (
    <>
      <button
        className="md:hidden text-white p-4 z-40 fixed top-[88px] left-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-[80px] left-0 h-[calc(100vh-80px)] w-64 bg-[#1C1A25] text-white px-6 py-8 transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:h-auto md:block`}
      >
        <ul className="space-y-4">
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                onClick={() => setIsOpen(false)}
                className={`block px-5 py-3 text-center rounded-xl hover:bg-[#2E2B38] transition-all ${
                  pathname === to ? "border border-[#AD46FF]" : ""
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
