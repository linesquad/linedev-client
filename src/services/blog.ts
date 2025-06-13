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

export const deleteBlog = async (blogId: number) => {
  const response = await instance.delete(`/api/blogs/${blogId}`);

  if (!response) {
    throw new Error("Failed to delete blog");
  }

  return response.data;
};

export const updateBlog = async ({
  blogId,
  title,
  content,
  author,
  tags,
  image,
  category,
  isFeatured,
}: {
  blogId: number;
  title: string;
  content: string;
  author: string;
  tags: string[];
  image: string;
  category: string;
  isFeatured: boolean;
}) => {
  const response = await instance.put(`/api/blogs/${blogId}`, {
    title,
    author,
    content,
    tags,
    image,
    category,
    isFeatured,
  });

  if (!response) {
    throw new Error("Failed to update blog");
  }

  return response.data;
};

export const getBlogsPaginated = async (
  page: number = 1,
  limit: number = 10
) => {
  const response = await instance.get("/api/blogs", {
    params: {
      page,
      limit,
    },
  });

  if (!response || !response.data) {
    throw new Error("Failed to fetch paginated blogs");
  }

  return response.data;
};
