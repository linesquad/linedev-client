import { useQuery } from "@tanstack/react-query";
import { getBlogsPaginated } from "../services/blog";

export const usePaginatedBlogs = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["Blogs", page, limit],
    queryFn: () => getBlogsPaginated(page, limit),
    staleTime: 1000 * 60 * 5,
  });
};
