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
import { Role, Theme } from "./types";
import { setTheme } from "./services/state/theme/themeSlice";
import { useAppDispatch } from "./hooks";
import { setCredentials } from "./services/state/auth/authSlice";
import { AdminDashboard } from "./pages/admin";
import { DoctorDashboard } from "./pages/doctor";
import { LabAssistantDashboard } from "./pages/labAssistant";
import { LabSupervisorDashboard } from "./pages/labSupervisor";
import { PatientDashboard } from "./pages/patient";
import {
  ReceptionistAllVisits,
  ReceptionistDashboard,
} from "./pages/receptionist";
import { UnauthorizedPage } from "./pages/UnauthorizedPage";
import { UserDashboard } from "./pages/user";

const router = createBrowserRouter([
  // error page
  {
    path: "*",
    element: <NotFoundPage />,
  },
  //pages with layout
  {
    path: "/",
    element: <Layout />,
    children: [
      // public pages - unrestricted access
      {
        index: true,
        element: <HomePage />, // TODO kiedys usunac
      },
      {
        path: "dashboard",
        element: <DashboardPage />, // TODO przeniesc do restricted
      },
      {
        path: "unauthorized",
        element: <UnauthorizedPage />,
      },
      // private pages - restricted access
      {
        element: <PrivateRoute allowedRoles={[Role.Admin]} />,
        children: [
          // only admin
          {
            path: "admin",
            element: <AdminDashboard />,
          },
        ],
      },
      {
        element: <PrivateRoute allowedRoles={[Role.Admin, Role.Doctor]} />,
        children: [
          // only admin and doctor
          {
            path: "doctor",
            element: <DoctorDashboard />,
          },
        ],
      },
      {
        element: (
          <PrivateRoute allowedRoles={[Role.Admin, Role.LabAssistant]} />
        ),
        children: [
          // only admin and labAssistant
          {
            path: "labAssistant",
            element: <LabAssistantDashboard />,
          },
        ],
      },
      {
        element: (
          <PrivateRoute allowedRoles={[Role.Admin, Role.LabSupervisor]} />
        ),
        children: [
          // only admin and labSupervisor
          {
            path: "labSupervisor",
            element: <LabSupervisorDashboard />,
          },
        ],
      },
      {
        element: <PrivateRoute allowedRoles={[Role.Admin, Role.Patient]} />,
        children: [
          // only admin and patient - TODO chyba niepotrzebne
          {
            path: "patient",
            element: <PatientDashboard />,
          },
        ],
      },
      {
        element: (
          <PrivateRoute allowedRoles={[Role.Admin, Role.Receptionist]} />
        ),
        children: [
          // only admin and receptionist
          {
            path: "receptionist",
            element: <ReceptionistDashboard />,
          },
          {
            path: "receptionist/all-visits",
            element: <ReceptionistAllVisits />,
          },
        ],
      },
      {
        element: (
          <PrivateRoute allowedRoles={[Role.Admin, Role.Receptionist]} />
        ),
        children: [
          // only admin and user
          {
            path: "user",
            element: <UserDashboard />,
          },
        ],
      },
    ],
  },
  // pages without layout
  {
    element: <GuestOnlyRoute />,
    children: [
      // only not-logged-in users
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

const App: React.FC = () => {
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
