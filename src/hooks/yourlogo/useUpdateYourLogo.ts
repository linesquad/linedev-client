import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { updateYourLogo } from "../../services/yourlogo";
import { toast } from "react-hot-toast";

export const useUpdateYourLogo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({id, name, image}: {id: string, name: string, image: string}) => updateYourLogo(id, name, image),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["yourLogo"] });
      toast.success("Logo updated successfully");
    },
    onError: () => {
      toast.error("Failed to update logo");
    },
  });

};