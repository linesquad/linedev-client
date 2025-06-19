import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/auth";

interface User {
  id: string;
  name: string;
}

export const useUser = () => {
  const { data, isLoading, error } = useQuery<User>({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(),
  });

  console.log(data);

  return {
    user: data,
    isLoading,
    error,
  };
};