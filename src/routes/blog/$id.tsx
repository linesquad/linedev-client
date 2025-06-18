// import { createFileRoute } from "@tanstack/react-router";
// import { useSingleBlog } from "../../hooks/useSingleBlog";

// export const Route = createFileRoute("/blog/$id")({
//   component: RouteComponent,
// });

// function RouteComponent() {
//   const { id } = Route.useParams();
//   const numericId = id ? Number(id) : undefined;

//   const { data, isLoading, error } = useSingleBlog(numericId);

//   if (isLoading) return <div>Loading...</div>;

//   if (error)
//     return (
//       <div>Error: {(error as Error).message || "Failed to load blog"}</div>
//     );

//   if (!data) return <div>No blog found</div>;

//   return (
//     <div>
//       <h1>{data.title}</h1>
//       <p>{data.content}</p>
//     </div>
//   );
// }

import { createFileRoute } from "@tanstack/react-router";
import { GetSingleBlog } from "../../services/blog";

import SingleBlog from "./../../components/blog/SingleBlog";

// Define the Blog type explicitly
type Blog = {
  title: string;
  content: string;
  author: string; // შენ გინდა author იყოს string, თუ author ობიექტია, დაარედაქტირე შესაბამისად
  tags: string[];
  image: string;
  category: string;
  isFeatured: boolean;
};

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
