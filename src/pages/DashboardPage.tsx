import { Button, Card } from "@/components/ui";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  logOut,
  selectCurrentToken,
  selectCurrentUser,
} from "@/services/state/auth/authSlice";
import { Link } from "react-router-dom";

// TODO różne dashboardy dla różnych roli
const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectCurrentToken);

  return (
    <Card>
      <p>Dashboard</p>
      <p>Token: {token}</p>
      <p>Email: {user?.email}</p>
      <p>firstName: {user?.firstName}</p>
      <p>lastName: {user?.lastName}</p>
      <p>role: {user?.role}</p>
      <Link to="/login">
        <Button variant="secondary">Login</Button>
      </Link>
      <Button onClick={() => dispatch(logOut())}>logout</Button>
    </Card>
  );
};
export { DashboardPage };
