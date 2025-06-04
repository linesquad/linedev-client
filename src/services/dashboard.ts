import instance from "../lib/axios";

export const getDashboard = async (role: string) => {
  const response = await instance.get(`/api/dashboard/${role}`);
  console.log(response.data);
  return response.data;
};