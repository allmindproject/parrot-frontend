import { Outlet } from "react-router-dom";
import { LayoutHeader } from ".";
import { Separator } from "../ui";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <LayoutHeader />
      <Separator />
      <div className="p-4 overflow-y-hidden">
        <Outlet /> {/* Nested routes are rendered here */}
      </div>
      {/* <Separator /> */}
      {/* <LayoutFooter /> */}
    </div>
  );
};

export { Layout };
