import { createFileRoute } from "@tanstack/react-router";

import MainBlog from "../../components/blog/MainBlog";
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
    <MainBlog />
    //   </MainWrapper>
    // </BorderWrapper>
  );
}
