import { Outlet } from "react-router-dom";
import NavigatorTab from "./components/NavigatorTab";

function Layout() {
  return (
    <div className="text-accent-pink">
      <NavigatorTab />
      <Outlet />
    </div>
  );
}

export default Layout;
