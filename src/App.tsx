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
  return <RouterProvider router={router} />;
};

export { App };
