import { useEffect, useState } from "react";
function useBalances(address?: string) {
  const [dragonBalance, setDragonBalance] = useState(null);
  const [mainnetbalance, setMainnetBalance] = useState(null);
  const [veDragonBalance, setVeDragonBalance] = useState(null);

  useEffect(() => {
    getBalances();
  }, [address]);

  async function getBalances() {}

  async function getveDragonBalance() {}
  async function getDragonBalnce() {}

  async function getMainnetBalance() {}
}

export default useBalances;
