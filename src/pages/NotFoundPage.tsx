import { Button } from "@/components/ui";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  //TODO
  return (
    <div>
      <div>404 not found</div>
      <Link to="/">
        <Button>Home</Button>
      </Link>
    </div>
  );
};

export { NotFoundPage };
