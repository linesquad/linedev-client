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

export const getCurrentUser = async () => {
  const response = await instance.get("/api/profile/");
  return response.data.user.id;
};

export const logout = async () => {
  const response = await instance.post("/api/auth/logout");
  return response.data;
};

export type User = Awaited<ReturnType<typeof getCurrentUser>>;
