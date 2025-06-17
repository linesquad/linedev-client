import { createFileRoute } from "@tanstack/react-router";
import MonthBlog from "../../components/blog/MonthBlog";

export const Route = createFileRoute("/blog/month")({
  component: () => <MonthBlog />,
});
