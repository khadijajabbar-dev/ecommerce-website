const BASE_URL = "http://localhost:5000/api/flash-sales";

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const createFlashSaleAPI = async (saleData) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(saleData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to create flash sale");
  }
  return data;
};

export const getActiveFlashSalesAPI = async () => {
  const response = await fetch(BASE_URL, {
    method: "GET",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch flash sales");
  }
  return data;
};

export const getMyFlashSalesAPI = async () => {
  const response = await fetch(`${BASE_URL}/mine`, {
    method: "GET",
    headers: authHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch your flash sales");
  }
  return data;
};

export const updateFlashSaleAPI = async (saleId, saleData) => {
  const response = await fetch(`${BASE_URL}/${saleId}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(saleData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update flash sale");
  }
  return data;
};

export const deleteFlashSaleAPI = async (saleId) => {
  const response = await fetch(`${BASE_URL}/${saleId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to delete flash sale");
  }
  return data;
};
