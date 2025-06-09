import { useMutation } from "@tanstack/react-query";
import { deletePricing } from "../../services/pricing";
import { useQueryClient } from "@tanstack/react-query";

export const useDeletePricing = () => {
  const queryClient = useQueryClient();
    return useMutation({
    mutationFn: (id: string) => deletePricing(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pricing"] });
    },
  });
};  