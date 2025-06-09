import { createFileRoute } from "@tanstack/react-router";

import MainBlog from "../../components/blog/MainBlog";
import AllBlogs from "../../components/blog/AllBlogs";
export const Route = createFileRoute("/blog/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Blog />;
}

function Blog() {
  return (
    // <BorderWrapper>
    //   <MainWrapper>
    <div>
      <MainBlog />
      <AllBlogs />
    </div>

    //   </MainWrapper>
    // </BorderWrapper>
  );
}
