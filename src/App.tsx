import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  DashboardPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  RegisterPage,
} from "./pages";
import { Layout } from "./components/layout";
import { GuestOnlyRoute, PrivateRoute } from "./components/routes";
import { Theme } from "./types";
import { setTheme } from "./services/state/theme/themeSlice";
import { useAppDispatch } from "./hooks";
import { setCredentials } from "./services/state/auth/authSlice";

// TODO wymyslic jak renderować componenty w zależności od roli
// TODO czy jeden "/dashboard" dla wszystkich roli jest ok?

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      //TODO tutaj inne strony dla kazdej roli
      {
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: "/about",
            element: <div>about page</div>,
          },
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
        ],
      },
    ],
  },
  {
    element: <GuestOnlyRoute />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);

const App = () => {
  const dispatch = useAppDispatch();
  const theme = (localStorage.getItem("theme") as Theme) || "system";
  const token = localStorage.getItem("token") || null;

  dispatch(setTheme({ theme: theme }));
  if (token) {
    dispatch(setCredentials({ token: token }));
  }

  return <RouterProvider router={router} />;
};

export { App };
