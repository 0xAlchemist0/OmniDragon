import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import balanceOf from "../lib/contract-reads";
import { omniDRAGONAbi } from "../utils/abi/omniDRAGONAbi";
import contracts from "../utils/contracts";
function useBalances(address?: any) {
  const { wallets } = useWallets();
  const { user } = usePrivy();
  const [balances, setBalances] = useState({});
  const { omniDRAGON }: any = contracts["Tokens"];

  useEffect(() => {
    const user: any = wallets[0];

    if (user) {
      getBalances(user.address);
    }
  }, [wallets]);

  async function getBalances(userAddress: any) {
    const signer = wallets[0].address;
    const dragon: any = await getDragonBalnce(userAddress);
    setBalances({
      dragon: dragon,
      signer,
    });
  }

  async function getveDragonBalance() {}
  async function getDragonBalnce(userAddress: any) {
    console.log(userAddress);
    const dragonBalance: any = await balanceOf(
      omniDRAGON,
      userAddress,
      omniDRAGONAbi
    );
    return dragonBalance;
  }

  async function getMainnetBalance() {}
  return balances;
}

export default useBalances;
