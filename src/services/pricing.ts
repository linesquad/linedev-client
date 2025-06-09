import instance from "../lib/axios";

export const getPricing = async () => {
  const response = await instance.get("/api/pricing");
  return response.data;
};