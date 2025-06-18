// routes/blog/updatedBlog/$id.tsx
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import UpdateBlog from "../../../components/blog/UpdateBlog";
import { useState } from "react";

export const Route = createFileRoute("/blog/updatedBlog/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => axios.get(`/api/blogs/${id}`).then((res) => res.data),
  });
  console.log(data);
  if (isLoading) return <div className="text-white">Loading...</div>;
  if (isError) return <div className="text-red-500">Error loading blog</div>;

  return (
    <div className="flex justify-center pt-10">
      <UpdateBlog selectedBlog={data} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}
