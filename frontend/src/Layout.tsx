import { useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavigatorTab from "./components/NavigatorTab";
import TxServiceProvider from "./state/TxServiceProvider";
import useBalances from "./state/useBalances";

function Layout() {
  const { wallets } = useWallets();
  const [userInfo, setuserInfo] = useState({});

  useEffect(() => {
    if (wallets) {
      const res = useBalances(wallets[0].address);
      const { account, provider }: any = res;
      if (res)
        setuserInfo({
          account,
          provider,
        });
    }
  }, [wallets]);

  //fix bug here when using the provider check bugs remmebr we dont pass in the real objects we need to pass
  return (
    <TxServiceProvider userInfo={userInfo}>
      <div className="text-accent-pink">
        <NavigatorTab />
        <Outlet />
      </div>
    </TxServiceProvider>
  );
}

export default Layout;
