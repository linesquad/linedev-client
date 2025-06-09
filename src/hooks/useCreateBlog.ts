import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createBlog } from "../services/blog";

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      title,
      content,
      author,
      tags,
      image,
      category,
      isFeatured,
    }: {
      title: string;
      content: string;
      author: string;
      tags: string[];
      image: string;
      category: string;
      isFeatured: boolean;
    }) =>
      createBlog({
        title,
        content,
        author,
        tags,
        image,
        category,
        isFeatured,
      }),
    onSuccess: () => {
      toast.success("Blog created successfully!");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error: any) => {
      toast.error("Failed to create blog: " + error.message);
    },
  });

  return mutation;
};
