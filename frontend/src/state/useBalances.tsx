import { useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { findChain } from "../lib/chainFinder";

function useBalances(address?: string) {
  const { wallets } = useWallets();
  const [balances, setBalances] = useState<any>(null);

  useEffect(() => {
    const user = wallets?.[0];
    if (!user) return;

    const loadBalances = async () => {
      const provider = await user.getEthereumProvider();
      const account = user.address;
      const dragon = await getDragonBalance(account);

      const chain = user.chainId;
      const chainId = chain.slice(chain.indexOf(":") + 1);
      const chainConfig = findChain(chainId);
      console.log("config: ");
      console.log(chainConfig);

      setBalances({
        dragon, // dragon balance
        provider, // use to sign txs
        account, // wallet address
        chain: chainConfig, // chain config
        chainId,
      });
    };

    loadBalances();
  }, [wallets]);

  async function getDragonBalance(userAddress: string) {
    console.log("Fetching dragon balance for", userAddress);
    // TODO: implement actual fetch
    return 0;
  }

  return balances;
}

export default useBalances;
