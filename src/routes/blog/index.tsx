import { createFileRoute } from "@tanstack/react-router";

import MainBlog from "../../components/blog/MainBlog";
import AllBlogs from "../../components/blog/AllBlogs";
import MonthBlog from "../../components/blog/MonthBlog";
export const Route = createFileRoute("/blog/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Blog />;
}

function Blog() {
  return (
    <div className="mt-[100px] bg-[#181327] ">
      <MainBlog />
      <MonthBlog />
      <AllBlogs />
    </div>
  );
}
