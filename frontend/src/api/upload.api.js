const BASE_URL = "http://localhost:5000/api/upload";

export const uploadImageAPI = async (file) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${BASE_URL}/image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to upload image");
  }

  return data;
};

// Upload up to 4 images in one request.
// Returns { success, urls: string[] }
export const uploadImagesAPI = async (files) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  Array.from(files).forEach((file) => formData.append("images", file));

  const response = await fetch(`${BASE_URL}/images`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to upload images");
  }

  return data;
};