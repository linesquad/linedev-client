import { useMutation } from "@tanstack/react-query";
import { createPricing } from "../../services/pricing";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export const useCreatePricing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => createPricing(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pricing"] });
      toast.success("Pricing created successfully");
    },
    onError: () => {
      toast.error("Failed to create pricing");
    },
  });
};