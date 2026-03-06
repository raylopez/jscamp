import { Navigate } from "react-router";
import { useAuthStore } from "../store/AuthStore.jsx";

export const ProctectedRoute = ({ children, redirectTo = "/login" }) => {
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn) return <Navigate to={redirectTo} replace />;

  return children;
};
