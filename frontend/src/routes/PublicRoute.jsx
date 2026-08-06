import { Navigate } from "react-router-dom";

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (!payload.exp) return false;
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
};

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token && isTokenExpired(token)) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return children;
  }

  if (token && (role === "seller" || role === "buyer")) {
    return role === "seller" ? (
      <Navigate to="/seller-dashboard" replace />
    ) : (
      <Navigate to="/" replace />
    );
  }

  if (token && role !== "seller" && role !== "buyer") {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  return children;
};

export default PublicRoute;
