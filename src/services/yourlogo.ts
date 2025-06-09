import instance from "../lib/axios";

export const getYourLogo = async () => {
  const response = await instance.get("/api/yourlogo");
  return response.data;
};

export const createYourLogo = async (data: {
  name: string;
  image: string;
}) => {
  const response = await instance.post("/api/yourlogo", data);
  return response.data;
};

export const updateYourLogo = async (id: string, name: string, image: string) => {
  const response = await instance.put(`/api/yourlogo/${id}`, {name, image });
  console.log(response.data);
  return response.data;
};

export const deleteYourLogo = async (id: string) => {
  const response = await instance.delete(`/api/yourlogo/${id}`);
  return response.data;
};