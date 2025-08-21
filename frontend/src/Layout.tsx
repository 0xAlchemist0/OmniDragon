import { Outlet } from "react-router-dom";
import NavigatorTab from "./components/NavigatorTab";
import TxServiceProvider from "./state/TxServiceProvider";

function Layout() {
  //fix bug here when using the provider check bugs remmebr we dont pass in the real objects we need to pass
  return (
    <TxServiceProvider userInfo={{ account: "0x123", chainId: "146" }}>
      <div className="text-accent-pink">
        <NavigatorTab />
        <Outlet />
      </div>
    </TxServiceProvider>
  );
}

export default Layout;
