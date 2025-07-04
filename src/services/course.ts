import instance from "../lib/axios";
export const createCourse = async ({
  title,
  description,
  duration,
  level,
  price,
  tags,
}: {
  title: string;
  description: string;
  duration: string;
  level: string[];
  tags: string;
  price: number;
}) => {
  const response = await instance.post("/api/courses", {
    title,
    description,
    duration,
    tags,
    level,
    price,
  });

  if (!response) {
    throw new Error("Failed to create blog");
  }

  return response.data;
};
