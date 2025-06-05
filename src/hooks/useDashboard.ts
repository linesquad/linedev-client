import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../services/dashboard";

export const useDashboard = (role: string) => {
  return useQuery({
    queryKey: ["dashboard", role],
    queryFn: () => getDashboard(role || "client"),
    enabled: !!role,
  });
};
