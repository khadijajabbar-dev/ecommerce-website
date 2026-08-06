import { Navigate, useLocation } from "react-router-dom";

const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (!payload.exp) return false;
    return Date.now() >= payload.exp * 1000;
  } catch {
    return true;
  }
};

const ProtectedRoute = ({ children, role }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    const redirect = `${location.pathname}${location.search || ""}`;
    return <Navigate to={`/login?redirect=${encodeURIComponent(redirect)}`} replace />;
  }

  if (isTokenExpired(token)) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    const redirect = `${location.pathname}${location.search || ""}`;
    return <Navigate to={`/login?redirect=${encodeURIComponent(redirect)}`} replace />;
  }

  if (!userRole) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  if (userRole !== role) {
    if (userRole === "seller") return <Navigate to="/seller-dashboard" replace />;
    if (userRole === "buyer") return <Navigate to="/" replace />;
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
