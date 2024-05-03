import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { tempIsAuth } from "./tempIsAuth";

type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  // TODO check if authenticated using redux and local storage
  const isAuthenticated = tempIsAuth;
  return isAuthenticated ? children : <Navigate to={"/login"} />;
};

export { PrivateRoute };
