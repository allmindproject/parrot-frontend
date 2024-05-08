import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectIsAuthenticated } from "@/services/state/auth/authSlice";
import { toast } from "sonner";
import { useAppSelector } from "@/hooks";

const PrivateRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export { PrivateRoute };
