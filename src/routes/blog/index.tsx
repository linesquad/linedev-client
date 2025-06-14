import { createFileRoute } from "@tanstack/react-router";

import MainBlog from "../../components/blog/MainBlog";
import AllBlogs from "../../components/blog/AllBlogs";
import MonthBlog from "../../components/blog/MonthBlog";
import MainWrapper from "../../components/MainWrapper";
import Profile from "../../components/blog/Profile";
export const Route = createFileRoute("/blog/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Blog />;
}

function Blog() {
  return (
    <div className="mt-[80px] p-2 bg-[#0E0C15]">
      <MainWrapper>
        <Profile />
        <MonthBlog />
        <MainBlog />
        <AllBlogs />
      </MainWrapper>
    </div>
  );
}
