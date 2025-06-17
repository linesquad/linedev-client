import { createFileRoute } from "@tanstack/react-router";
import AllBlogs from "../../components/blog/AllBlogs";

export const Route = createFileRoute("/blog/all")({
  component: () => <AllBlogs />,
});
