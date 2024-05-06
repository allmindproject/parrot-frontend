import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "@/services/state/auth/authSlice";

const PrivateRoute = () => {
  // TODO check if authenticated using redux and local storage
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  console.log(`Token: ${token}`)
  return <Outlet />
  // return token ? (
  //   <Outlet />
  // ) : (
  //   <>
  //     {console.log(
  //       "<Navigate to={/login} state={{ from: location }} replace />"
  //     )}
  //     <Navigate to={"/login"} state={{ from: location }} replace />
  //   </>
  // );
};

export { PrivateRoute };
