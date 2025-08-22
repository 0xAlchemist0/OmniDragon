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
    if (wallets[0] && res) {
      const { account, provider, chainConfig }: any = res;
      setuserInfo({ account, provider, chainConfig });
    }
  }, [address, res]);

  //fix bug here when using the provider check bugs remmebr we dont pass in the real objects we need to pass
  return (
    <>
      <TxServiceProvider userInfo={userInfo}>
        <div className="text-accent-pink">
          <NavigatorTab />
          <Outlet />
        </div>
      </TxServiceProvider>
    </>
  );
}

export default Layout;
