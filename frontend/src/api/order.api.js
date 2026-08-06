


const BASE_URL = "http://localhost:5000/api/orders";

const authHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const buyNowAPI = async (orderData) => {
  const response = await fetch(`${BASE_URL}/buy-now`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(orderData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to place order");
  return data;
};

export const checkoutCartAPI = async (checkoutData) => {
  const response = await fetch(`${BASE_URL}/checkout`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(checkoutData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to checkout");
  return data;
};

export const getSellerOrdersAPI = async () => {
  const response = await fetch(`${BASE_URL}/seller-orders`, {
    method: "GET",
    headers: authHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch orders");
  return data;
};

export const getBuyerOrdersAPI = async () => {
  const response = await fetch(`${BASE_URL}/my-orders`, {
    method: "GET",
    headers: authHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch orders");
  return data;
};

// Public — no auth needed, the token in the URL is the auth
export const confirmOrderAPI = async (token) => {
  const response = await fetch(`${BASE_URL}/confirm/${token}`, {
    method: "GET",
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to confirm order");
  return data;
};

export const dispatchOrderAPI = async (orderId) => {
  const response = await fetch(`${BASE_URL}/${orderId}/dispatch`, {
    method: "PATCH",
    headers: authHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to dispatch order");
  return data;
};

export const deliverOrderAPI = async (orderId) => {
  const response = await fetch(`${BASE_URL}/${orderId}/deliver`, {
    method: "PATCH",
    headers: authHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to mark order as delivered");
  return data;
};

export const getOrderByIdAPI = async (orderId) => {
  const response = await fetch(`${BASE_URL}/${orderId}`, {
    method: "GET",
    headers: authHeaders(),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch order");
  return data;
};