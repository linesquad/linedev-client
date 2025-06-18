
import { createFileRoute } from "@tanstack/react-router";
import { GetSingleBlog } from "../../services/blog";

import SingleBlog from "./../../components/blog/SingleBlog";


export const Route = createFileRoute("/blog/$id")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const blog = await GetSingleBlog(params.id);
    return { blog };
  },
});

function RouteComponent() {
  const { blog } = Route.useLoaderData();

  return <SingleBlog blog={blog} />;
}
