import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBlog } from "../services/blog";

export const useDeleteBlogUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (blogId: number) => deleteBlog(blogId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Blogs"] });
    },

    onError: (error) => {
      console.error("Error deleting user post:", error);
    },
  });
};
