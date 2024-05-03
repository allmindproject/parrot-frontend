import { Outlet } from "react-router-dom";

function Layout() {
  // TODO navbar and footer
  return (
    <div>
      <header>Header Content</header>
      <main>
        <Outlet /> {/* Nested routes render here */}
      </main>
      <footer>Footer Content</footer>
    </div>
  );
}
export { Layout };
