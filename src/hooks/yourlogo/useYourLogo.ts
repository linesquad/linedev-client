import { useQuery } from "@tanstack/react-query";
import { getYourLogo } from "../../services/yourlogo";

export const useYourLogo = () => {
  return useQuery({
    queryKey: ["yourlogo"],
    queryFn: getYourLogo,
  });
};
