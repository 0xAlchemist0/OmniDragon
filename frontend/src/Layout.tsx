import { useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavigatorTab from "./components/NavigatorTab";
import TxServiceProvider from "./state/TxServiceProvider";
import useBalances from "./state/useBalances";

function Layout() {
  const { wallets } = useWallets();
  const [userInfo, setuserInfo] = useState({});
  //no matter whst hooks are at the top of the function
  const address = wallets[0]?.address;
  const res = useBalances(wallets[0]?.address);

  useEffect(() => {
    if (wallets && res) {
      const { account, provider }: any = res;
      if (wallets && res)
        setuserInfo({
          account,
          provider,
        });
      console.log("account", account);
      console.log("Provider: ", provider);
    }
  }, [address, res]);

  //fix bug here when using the provider check bugs remmebr we dont pass in the real objects we need to pass
  return (
    <>
      {wallets[0] ? (
        <TxServiceProvider userInfo={userInfo}>
          <div className="text-accent-pink">
            <NavigatorTab />
            <Outlet />
          </div>
        </TxServiceProvider>
      ) : (
        <div className="text-accent-pink">
          <NavigatorTab />
          <Outlet />
        </div>
      )}
    </>
  );
}

export default Layout;
