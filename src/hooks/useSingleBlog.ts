import { useQuery } from "@tanstack/react-query";
import { GetSingleBlog } from "@/services/blog";

export const useSingleBlog = (id: number | undefined) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => GetSingleBlog(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};
