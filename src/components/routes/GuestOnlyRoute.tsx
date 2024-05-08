import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectIsAuthenticated } from "@/services/state/auth/authSlice";
import { useAppSelector } from "@/hooks";

const GuestOnlyRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  return !isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={"/dashboard"} state={{ from: location }} replace />
  );
};

export { GuestOnlyRoute };
