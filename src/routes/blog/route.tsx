import { createFileRoute } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import Sidebar from "../../components/blog/Sidebar"; // ← შენი sidebar
import "../../index.css"; // თუ გინდა tailwind იმუშავოს

export const Route = createFileRoute("/blog")({
  component: BlogLayout,
});

function BlogLayout() {
  return (
    <div className="flex min-h-screen bg-[#0E0C15] mt-[80px]">
      <Sidebar />
      <main className=" p-4 ml-0  text-white  w-full">
        <Outlet />
      </main>
    </div>
  );
}
