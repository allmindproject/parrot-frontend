import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const GuestOnlyRoute = () => {
  // TODO check if authenticated using redux and local storage
  // const isAuthenticated = useSelector(selectIsLoggedIn);

  const location = useLocation();

  return <Outlet />;
  // return !isAuthenticated ? (
  //   <Outlet />
  // ) : (
  //   <>
  //     {console.log(
  //       "<Navigate to={/dashboard} state={{ from: location }} replace />"
  //     )}
  //     <Navigate to={"/dashboard"} state={{ from: location }} replace />
  //   </>
  // );
};

export { GuestOnlyRoute };
