import { Button, Card } from "@/components/ui";
import {
  logOut,
  selectCurrentToken,
  selectCurrentUser,
} from "@/services/state/auth/authSlice";
import { AppDispatch } from "@/services/state/store";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// TODO różne dashboardy dla różnych roli
const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

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
