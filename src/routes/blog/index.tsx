import { createFileRoute } from "@tanstack/react-router";
import MainBlog from "../../components/blog/MainBlog";

export const Route = createFileRoute("/blog/")({
  component: () => <MainBlog />,
});
