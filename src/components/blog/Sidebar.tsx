import { Link } from "@tanstack/react-router";

export default function Sidebar() {
  return (
    <div className="w-64 p-4 bg-[#1C1A25] text-white min-h-screen">
      <ul className="space-y-4">
        <li>
          <Link to="/blog">Main Blog</Link>
        </li>
        <li>
          <Link to="/blog/profile">Profile</Link>
        </li>
        <li>
          <Link to="/blog/month">Month</Link>
        </li>
        <li>
          <Link to="/blog/all">All Blogs</Link>
        </li>
      </ul>
    </div>
  );
}
