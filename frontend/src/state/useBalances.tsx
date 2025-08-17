import { useEffect, useState } from "react";
import balanceOf from "../lib/contract-reads";
import { dragonABI } from "../utils/abi/dragonABI";
import contactBook from "../utils/contract-book";
function useBalances(address?: any) {
  const [balances, setBalances] = useState(null);
  const { dragon }: any = contactBook;

  useEffect(() => {
    getBalances();
  }, [address]);

  async function getBalances() {
    await getDragonBalnce();
  }

  async function getveDragonBalance() {}
  async function getDragonBalnce() {
    const dragonBalance = await balanceOf(dragon, address, dragonABI);
  }

  async function getMainnetBalance() {}
}

export default useBalances;
