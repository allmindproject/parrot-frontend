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
    path: "/",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    errorElement: <NotFoundPage />,
    children: [
      //TODO tutaj inne strony dla kazdej roli
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
  {
    path: "/login",
    element: (
      <GuestOnlyRoute>
        <LoginPage />
      </GuestOnlyRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <GuestOnlyRoute>
        <RegisterPage />
      </GuestOnlyRoute>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export { App };
