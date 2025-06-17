import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/UpdateBlog/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <UpdateBlogs />;
}

function UpdateBlogs() {
  return <div className="mt-[80px] p-2 bg-[#0E0C15]">
    
  </div>;
}
