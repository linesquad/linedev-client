import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBlog } from "../services/blog";
import { toast } from "react-hot-toast";
export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      title,
      content,
      author,
      tags,
      image,
      category,
      isFeatured,
      blogId,
    }: {
      
      title: string;
      content: string;
      author: string;
      tags: string[];
      image: string;
      category: string;
      isFeatured: boolean;
      blogId: number;
    }) =>
      updateBlog({
        title,
        content,
        author,
        tags,
        image,
        category,
        isFeatured,
        blogId,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Blogs"] });
    },

    onError: (error: any) => {
      toast.error(error.message || "Error updating blog");
    },
  });
};
