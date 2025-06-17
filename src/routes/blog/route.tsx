import { createFileRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import Sidebar from "../../components/blog/Sidebar";

export const Route = createFileRoute("/blog")({
  component: BlogLayout,
});

function BlogLayout() {
  return (
    <div className="flex min-h-screen bg-[#0E0C15] mt-[80px]">
      <Sidebar />
      <main className="flex-1 p-4 text-white">
        <Outlet />
      </main>
    </div>
  );
}
export default BlogLayout;
