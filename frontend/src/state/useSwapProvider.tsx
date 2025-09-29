import { useEffect, useState } from "react";
import { getTokensInfo } from "../lib/dexscreener-handler";
import { useTxService } from "./TxServiceProvider";

//only pass in address and amounts dont pass in entire object
function useSwapProvider(tokenIn: any, tokenOut: any, inAmount: any) {
  const { reader, writer }: any = useTxService();
  const [quote, setQuote] = useState({
    quoteOut: null,
    isStable: null,
    USD: {
      in: null,
      out: null,
    },
  });

  useEffect(() => {
    console.log("change");
    if (tokenIn && tokenOut && inAmount) {
      getQuote();
    }
  }, [tokenIn, tokenOut, inAmount]);

  async function getQuote() {
    const dexscreenrRes = await getTokensInfo([tokenIn, tokenOut], reader);
    const priceIn = dexscreenrRes[0].price;
    const priceOut = dexscreenrRes[1].price;
    const isPair = await reader.isPair(tokenIn, tokenOut, reader);
    let result: any;
    if (isPair) {
      result = await reader.getAmountOut(inAmount, tokenIn, tokenOut, reader);
    }

    if (result[0]) {
      const quoteOut: any = String(result[0]);
      const isStable: any = result[1];

      const usdIn: any = getUSD(inAmount, priceIn);
      const usdOut: any = getUSD(quoteOut, priceOut);
      //index one quote , index2 pairsStableness
      console.log({
        quoteOut,
        isStable,
        USD: {
          in: usdIn,
          out: usdOut,
        },
      });
      setQuote({
        quoteOut,
        isStable,
        USD: {
          in: usdIn,
          out: usdOut,
        },
      });
    }
  }

  function getUSD(value: any, price: any) {
    return Number(value) * price;
  }
  return quote;
}

export default useSwapProvider;
