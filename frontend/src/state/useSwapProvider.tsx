import { useEffect, useState } from "react";
import { getPairsAll, getTokensInfo } from "../lib/dexscreener-handler";
import { useTxService } from "./TxServiceProvider";

//only pass in address and amounts dont pass in entire object
function useSwapProvider({
  tokenIn = null,
  tokenOut = null,
  inAmount = null,
}: any) {
  const { reader, writer }: any = useTxService();
  const [quote, setQuote] = useState({
    quoteOut: null,
    isstable: null,
    usdIn: null,
    usdOut: null,
  });

  const [pairs, setPairs] = useState([]);
  useEffect(() => {
    if (tokenIn && tokenOut && inAmount) {
      getQuote();
    }
  }, [tokenIn, tokenOut, inAmount]);
  useEffect(() => {}, [reader, writer]);
  async function getPairs() {
    const result = await getPairsAll(reader);
  }
  async function getQuote() {
    const dexscreenrRes = await getTokensInfo([tokenIn, tokenOut], reader);
    const priceIn = dexscreenrRes[0].price;
    const priceOut = dexscreenrRes[1].price;

    const result: any = await reader.getAmountOut(
      inAmount,
      tokenIn,
      tokenOut,
      reader
    );
    if (result[0]) {
      const usdIn: any = getUSD(priceIn, inAmount);
      const usdOut: any = getUSD(priceOut, result[0]);
      //index one quote , index2 pairsStableness
      setQuote({
        quoteOut: result[0],
        isstable: result[1],
        usdIn,
        usdOut,
      });
    }
  }

  function getUSD(value: any, price: any) {
    return Number(value) * price;
  }
  return quote;
}

export default useSwapProvider;
