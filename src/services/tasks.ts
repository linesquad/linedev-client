import instance from "../lib/axios";

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
