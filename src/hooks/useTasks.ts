import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProjects, getTasks } from "../services/tasks";
import { useMutation } from "@tanstack/react-query";
import { createProject } from "../services/tasks";
import type { Project } from "../routes/_authenticated/(task)/projects";

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

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    mutationFn: (project: Project | FormData) => createProject(project),
  });

  return {
    createProject: mutate,
    isPending,
    error,
  };
};
