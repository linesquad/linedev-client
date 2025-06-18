// src/routes/UpdateBlog/$id.tsx
import { createFileRoute } from "@tanstack/react-router";
import UpdateBlog from "../../components/blog/UpdateBlog";
import { useQuery } from "@tanstack/react-query";
import { GetBlog } from "./../../services/blog";

export const Route = createFileRoute("/UpdateBlog")({
  component: UpdatePage,
});

function UpdatePage() {
  const { id } = Route.useParams();

  const {
    data: blogs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: GetBlog,
  });

  if (isLoading) return <p className="text-white">Loading...</p>;
  if (error || !blogs)
    return <p className="text-red-500">Failed to load blogs.</p>;

  const selectedBlog = blogs.find((b: any) => b._id === id);

  if (!selectedBlog) return <p className="text-red-500">Blog not found.</p>;

  return (
    <div className="mt-[80px] p-4 text-white">
      <UpdateBlog selectedBlog={selectedBlog} setIsModalOpen={() => {}} />
    </div>
  );
}
