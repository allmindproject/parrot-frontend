import { Outlet } from "react-router-dom";
import { LayoutFooter, LayoutHeader } from ".";
import { Separator } from "../ui";

function Layout() {
  return (
    <div>
      <LayoutHeader />
      <Separator />
      <div className="p-4">
        <Outlet /> {/* Nested routes render here */}
      </div>
      <Separator />
      <LayoutFooter />
    </div>
  );
}
export { Layout };
