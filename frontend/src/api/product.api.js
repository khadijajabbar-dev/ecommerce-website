

const BASE_URL = "http://localhost:5000/api/products";

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const createProductAPI = async (productData) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(productData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to add product");
  }
  return data;
};

// Browsing products never requires login, so this only sends an
// Authorization header when one actually exists.
export const getAllProductsAPI = async (page = 1, limit = 9, category = "", search = "") => {
  const params = new URLSearchParams({ page, limit });
  if (category && category !== "all") params.set("category", category);
  if (search && search.trim()) params.set("search", search.trim());

  const response = await fetch(`${BASE_URL}?${params.toString()}`, {
    method: "GET",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch products");
  }
  return data;
};

// A small spread of products (a few per category) for the public home page.
export const getFeaturedProductsAPI = async () => {
  const response = await fetch(`${BASE_URL}/featured`, {
    method: "GET",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch featured products");
  }
  return data;
};

export const getMyProductsAPI = async () => {
  const response = await fetch(`${BASE_URL}/get-products`, {
    method: "GET",
    headers: authHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch products");
  }
  return data;
};

export const getProductByIdAPI = async (productId) => {
  const response = await fetch(`${BASE_URL}/${productId}`, {
    method: "GET",
    headers: authHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch product");
  }
  return data;
};

export const updateProductAPI = async (productId, productData) => {
  const response = await fetch(`${BASE_URL}/${productId}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(productData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update product");
  }
  return data;
};

export const deleteProductAPI = async (productId) => {
  const response = await fetch(`${BASE_URL}/${productId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to delete product");
  }
  return data;
};

// ---- Trash / recycle bin ----

export const getTrashProductsAPI = async () => {
  const response = await fetch(`${BASE_URL}/seller/trash`, {
    method: "GET",
    headers: authHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch trashed products");
  }
  return data;
};

export const restoreProductAPI = async (productId) => {
  const response = await fetch(`${BASE_URL}/seller/trash/${productId}/restore`, {
    method: "PATCH",
    headers: authHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to restore product");
  }
  return data;
};

export const permanentDeleteProductAPI = async (productId) => {
  const response = await fetch(`${BASE_URL}/seller/trash/${productId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to permanently delete product");
  }
  return data;
};