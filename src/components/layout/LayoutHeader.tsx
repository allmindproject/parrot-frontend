import { ClinicLogo, ThemeToggle } from "..";

const LayoutHeader = () => {
  return (
    <div className="flex justify-between items-center p-4">
      <ClinicLogo height={40} />
      <ThemeToggle />
    </div>
  );
};
export { LayoutHeader };
