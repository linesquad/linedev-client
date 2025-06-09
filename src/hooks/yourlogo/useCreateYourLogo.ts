import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createYourLogo } from "../../services/yourlogo";
import toast from "react-hot-toast";

export const useCreateYourLogo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createYourLogo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["yourlogo"] });
      toast.success("Logo created successfully");
    },
    onError: () => {
      toast.error("Failed to create logo");
    },
  });
};