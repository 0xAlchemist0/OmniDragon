import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import contracts from "../utils/contracts";
function useBalances(address?: any) {
  const { wallets } = useWallets();
  const { user } = usePrivy();
  const [balances, setBalances] = useState({});
  const { omniDRAGON }: any = contracts["Tokens"];
  useEffect(() => {
    const user: any = wallets[0];
    console.log(user);
    if (user) {
      getBalances(user.address);
    }
  }, [wallets]);

  // const provider = await wallets[0]?.getEthereumProvider();
  //   const account = await provider.request({ method: "eth_requestAccounts" });

  async function getBalances(userAddress: any) {
    const provider = await wallets[0]?.getEthereumProvider();
    const account = await provider.request({ method: "eth_requestAccounts" });
    const dragon: any = await getDragonBalnce(userAddress);
    const chain = wallets[0].chainId;
    const chainId = chain.slice(chain.indexOf(":") + 1, chain.length);
    setBalances({
      dragon: dragon,
      provider,
      account: wallets[0],
      chainId,
    });
  }

  async function getveDragonBalance() {}
  async function getDragonBalnce(userAddress: any) {
    console.log(userAddress);
  }

  async function getMainnetBalance() {}
  return balances;
}

export default useBalances;
