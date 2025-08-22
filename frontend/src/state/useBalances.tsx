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
      console.log("Chain: ", chain);
      const chainId = chain.slice(chain.indexOf(":") + 1);

      const chainConfig = findChain(Number(chainId));
      console.log("Config: ", chainConfig);
      setBalances({
        dragon, // dragon balance
        provider, // use to sign txs
        account, // wallet address
        chainConfig, // chain config
        chainId,
      });
    };

    loadBalances();
  }, [wallets]);

  async function getDragonBalance(userAddress: string) {
    // TODO: implement actual fetch
    return 0;
  }

  return balances;
}

export default useBalances;
