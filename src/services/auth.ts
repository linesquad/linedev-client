import instance from "../lib/axios";

export const signIn = async (email: string,password: string) => {
  try {
    const response = await instance.post("/api/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error, "Sign in failed");
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
    console.error(error, "Sign up failed");
    throw error;
  }
};

export const getCurrentUser = async () => {
  const response = await instance.get("/api/profile/");
  console.log("response", response.data);
  return response.data.user.id;
};

export type User = Awaited<ReturnType<typeof getCurrentUser>>;
