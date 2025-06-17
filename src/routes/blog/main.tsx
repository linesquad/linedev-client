import MainBlog from "@/components/blog/MainBlog";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/main")({
  component: () => <MainBlog />,
});
