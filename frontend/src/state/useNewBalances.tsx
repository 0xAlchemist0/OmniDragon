import { useEffect, useState } from "react";
import { getToken } from "../lib/dexscreener-handler";
import { useTxService } from "./TxServiceProvider";

function useNewBalnces({ addressList }: any) {
  const [balances, setBalances]: any = useState(null);
  const { reader, writer }: any = useTxService();

  useEffect(() => {
    if (reader && writer && addressList) {
      getBalances();
    }
  }, [reader, writer]);

  async function getBalances() {
    const balancesFound = [];
    const chainName = await reader.getChainName();
    for (let i = 0; i <= addressList.length(); i++) {
      const dexInfo = await getToken(addressList[i], chainName);
      const balance = await reader.tempBalanceOf(addressList[i]);
      const { baseToken, info, liquidity, marketCap, priceUsd }: any = dexInfo;
      if (balance) {
        //every token will be formatted like this no mater what even dexscreeenr
        balancesFound.push({
          name: baseToken.name,
          address: addressList[i],
          balance,
          image: info.imageUrl,
          liquidity,
          priceUsd,
        });
      }
    }
    return balances;
  }
}
export default useNewBalnces;
