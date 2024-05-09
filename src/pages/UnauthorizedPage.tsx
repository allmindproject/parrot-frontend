import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui";
import { useAppSelector } from "@/hooks";
import { selectCurrentUser } from "@/services/state/auth/authSlice";

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectCurrentUser);
  const message = user
    ? `${user.firstName} ${user.lastName}, you are not authorized to go there.`
    : `You are not authorized to go there.`;
  return (
    <div>
      <h1>{message}</h1>
      <Button onClick={() => navigate(-1)}>Go back</Button>
    </div>
  );
};

export { UnauthorizedPage };
