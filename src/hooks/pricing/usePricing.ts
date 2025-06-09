import { useQuery } from "@tanstack/react-query"
import { getPricing } from "../../services/pricing"

export const usePricing = () => {
  return useQuery({
    queryKey: ["pricing"],
    queryFn: getPricing,
  })
}