import instance from "../lib/axios";

export const createBlog = async ({
  title,
  content,
  author,
  tags,
  image,
  category,
  isFeatured,
}: {
  title: string;
  content: string;
  author: string;
  tags: string[];
  image: string;
  category: string;
  isFeatured: boolean;
}) => {
  const response = await instance.post("/api/blogs", {
    title,
    author,
    content,
    tags,
    image,
    category,
    isFeatured,
  });

  if (!response) {
    throw new Error("Failed to create blog");
  }

  return response.data;
};

export const GetBlog = async () => {
  const response = await instance.get("/api/blogs");
  if (!response) {
    throw new Error("failed to create blog");
  }

  return response.data;
};

export const getProfile = async () => {
  const response = await instance.get("/api/profile");
  console.log("PROFILE RESPONSE:", response.data);
  if (!response) {
    throw new Error("failed profile");
  }

  return response.data;
};
