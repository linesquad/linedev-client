import instance from "../lib/axios";

export const signIn = async (email: string,password: string) => {
  try {
    const response = await instance.post("/api/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (name: string, email: string, password: string) => {
  try {
    const response = await instance.post("/api/auth/register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async (): Promise<{id: string, name: string}> => {
  const response = await instance.get("/api/profile/");
  if(!response.data.user) {
    throw new Error("User not found");
  }
  return {id: response.data.user.id, name: response.data.user.name};
};

export const getUserRole = async () => {
  const response = await instance.get("/api/profile/");
  return response.data.user.role;
};

export const logout = async () => {
  const response = await instance.post("/api/auth/logout");
  return response.data;
};


export const refreshToken = async () => {
  const response = await instance.post("/api/auth/refresh-token");
  console.log(response.data);
  return response.data;
};

export type User = Awaited<ReturnType<typeof getCurrentUser>>;
