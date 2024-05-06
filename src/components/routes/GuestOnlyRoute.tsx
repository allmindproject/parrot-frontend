import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/services/state/auth/authSlice";

const GuestOnlyRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  return !isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={"/dashboard"} state={{ from: location }} replace />
  );
};

export { GuestOnlyRoute };
