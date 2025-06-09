import { useMutation } from "@tanstack/react-query";
import { updatePricing } from "../../services/pricing";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export const useUpdatePricing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => updatePricing(data._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pricing"] });
      toast.success("Pricing updated successfully");
    },
    onError: () => {
      toast.error("Failed to update pricing");
    },
  });
};    