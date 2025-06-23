import { useQuery } from "@tanstack/react-query";
import { getProjects, getTasks } from "../services/tasks";

export const useTasks = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(),
  });

  return {
    tasks: data,
    isLoading,
    error,
  };
};

export const useProjects = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjects(),
  });

  return {
    projects: data,
    isLoading,
    error,
  };
};
