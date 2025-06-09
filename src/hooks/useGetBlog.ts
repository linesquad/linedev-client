
import { GetBlog } from "../services/blog";
import { useQuery } from "@tanstack/react-query";

export const useGetBloggerPosts = () => {
  return useQuery({
    queryKey: ["Blogs"],
    queryFn: () => GetBlog(),
  });
};
