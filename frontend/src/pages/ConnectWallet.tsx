import { usePrivy } from "@privy-io/react-auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//redirects when wallet is connected
function ConnectWallet({ route }: any) {
  const { user, ready, authenticated, login }: any = usePrivy();
  const navigate: any = useNavigate();
  console.log("Route right now: ", route);
  useEffect(() => {
    if (ready && authenticated) {
      navigate(route);
    }
  }, [ready, authenticated]);

  return (
    <div>
      <button className="" onClick={login}>
        Connect Wallet{" "}
      </button>
    </div>
  );
}

export default ConnectWallet;
