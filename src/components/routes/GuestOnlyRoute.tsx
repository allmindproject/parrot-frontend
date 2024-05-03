import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { tempIsAuth } from "./tempIsAuth";

type GuestOnlyRouteProps = {
  children: ReactNode;
};

const GuestOnlyRoute = ({ children }: GuestOnlyRouteProps) => {
  // TODO check if authenticated using redux and local storage
  const isAuthenticated = tempIsAuth;
  return !isAuthenticated ? children : <Navigate to={"/dashboard"} />;
};

export { GuestOnlyRoute };
