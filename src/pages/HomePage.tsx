import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { Link } from "react-router-dom";
// TODO niepotrzebne wywalić
// narazie tylko zeby pokazac jak dziala rbac
const HomePage: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold">Links</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Link to="/login">
          <Button variant="secondary">Login</Button>
        </Link>
        <Link to="/dashboard">
          <Button variant="secondary">dashboard</Button>
        </Link>
        <Link to="/admin">
          <Button variant="secondary">admin</Button>
        </Link>
        <Link to="/doctor">
          <Button variant="secondary">doctor</Button>
        </Link>
        <Link to="/lab-assistant">
          <Button variant="secondary">labAssistant</Button>
        </Link>
        <Link to="/lab-supervisor">
          <Button variant="secondary">labSupervisor</Button>
        </Link>
        <Link to="/patient">
          <Button variant="secondary">patient</Button>
        </Link>
        <Link to="/receptionist">
          <Button variant="secondary">receptionist</Button>
        </Link>
        <p className=" text-sm">Docelowo nie bedzie tej strony</p>
      </CardContent>
    </Card>
  );
};
export { HomePage };
