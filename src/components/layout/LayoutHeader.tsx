import { logOut } from "@/services/state/auth/authSlice";
import { ClinicLogo, ThemeToggle } from "..";
import { Button } from "../ui";
import { useAppDispatch } from "@/hooks";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LayoutHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = (): void => {
    dispatch(logOut());
    navigate("/login"); // TODO replace false trzeba dac ale ten button nie moze byc na page'ach ktore są publiczne
    toast.success(`Hehe`, {
      description: `wylogowany`,
    });
  };
  return (
    <div className="flex justify-between items-center p-4">
      <Link to={"/dashboard"}>
        <ClinicLogo height={40} />
      </Link>
      <div className="flex gap-4">
        <Button onClick={handleLogout}>logout</Button>
        <ThemeToggle />
      </div>
    </div>
  );
};
export { LayoutHeader };
