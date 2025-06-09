import instance from "../lib/axios";

export const getPricing = async () => {
  const response = await instance.get("/api/pricing");
  return response.data;
};

export const createPricing = async (data: any) => {
  const response = await instance.post("/api/pricing", data);
  return response.data;
};

export const updatePricing = async (id: string, data: any) => {
  const response = await instance.put(`/api/pricing/${id}`, data);
  return response.data;
};

export const deletePricing = async (id: string) => {
  const response = await instance.delete(`/api/pricing/${id}`);
  return response.data;
};
