const BASE_URL = "http://localhost:5000/api/blogs";

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const createBlogAPI = async (blogData) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(blogData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to publish post");
  }
  return data;
};

// Reading the blog never requires login.
export const getAllBlogsAPI = async (page = 1, limit = 9) => {
  const params = new URLSearchParams({ page, limit });
  const response = await fetch(`${BASE_URL}?${params.toString()}`, {
    method: "GET",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch blog posts");
  }
  return data;
};

export const getBlogBySlugAPI = async (slug) => {
  const response = await fetch(`${BASE_URL}/${slug}`, {
    method: "GET",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch blog post");
  }
  return data;
};

export const getMyBlogsAPI = async () => {
  const response = await fetch(`${BASE_URL}/mine`, {
    method: "GET",
    headers: authHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch your posts");
  }
  return data;
};

export const updateBlogAPI = async (blogId, blogData) => {
  const response = await fetch(`${BASE_URL}/${blogId}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(blogData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update post");
  }
  return data;
};

export const deleteBlogAPI = async (blogId) => {
  const response = await fetch(`${BASE_URL}/${blogId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to delete post");
  }
  return data;
};
