import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteYourLogo } from "../../services/yourlogo";
import { toast } from "react-hot-toast";


export const useDeleteYourLogo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteYourLogo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["yourlogo"] });
      toast.success("Logo deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};