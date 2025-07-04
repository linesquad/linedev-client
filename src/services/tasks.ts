import instance from "../lib/axios";
import type { Project } from "../routes/_authenticated/(task)/projects";

export const getTasks = async () => {
  try {
    const response = await instance.get("/api/tasks");
    if (!response.data.tasks) {
      throw new Error("Tasks not found");
    }
    return response.data.tasks;
  } catch (error) {
    throw error;
  }
};

export const getProjects = async () => {
  try {
    const response = await instance.get("/api/projects");
    if (!response.data.projects) {
      throw new Error("Projects not found");
    }
    return response.data.projects;
  } catch (error) {
    throw error;
  }
};

export const createProject = async (project: Project | FormData) => {
  try {
    const response = await instance.post("/api/projects", project);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
