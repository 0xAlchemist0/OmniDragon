import { useEffect, useState } from "react";
import { formatUnits, parseUnits } from "viem";
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
    error: undefined,
  });

  useEffect(() => {
    console.log("change");
    if (tokenIn && tokenOut && inAmount) {
      getQuote();
    }
  }, [tokenIn, tokenOut, inAmount]);
  useEffect(() => {
    console.log("in updated: ", inAmount);

    if (tokenIn && tokenOut && inAmount) {
      getQuote();
    }
  }, [inAmount]);

  async function getQuote() {
    const dexscreenrRes = await getTokensInfo([tokenIn, tokenOut], reader);
    console.log(dexscreenrRes[0]);
    const priceIn = dexscreenrRes[0].priceUsd;
    const priceOut = dexscreenrRes[1].priceUsd;
    const isPair = await reader.isPair(tokenIn, tokenOut, reader);
    console.log(isPair);
    let result: any;
    if (isPair) {
      result = await reader.getAmountOut(
        parseUnits(inAmount, 18),
        tokenIn,
        tokenOut,
        reader
      );
      if (result) {
        const quoteOut: any = Number(formatUnits(result[0], 18)).toFixed(2);
        console.log();
        const isStable: any = result[1];

        const usdIn: any = String(getUSD(Number(inAmount), Number(priceIn)));
        const usdOut: any = String(getUSD(quoteOut, Number(priceOut)));
        console.log(
          String(inAmount),
          tokenIn,
          tokenOut,
          priceIn,
          priceOut,
          usdIn,
          usdOut
        );

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
          error: undefined,
        });
      }
      console.log(tokenIn, tokenOut, inAmount);
      console.log(result);
    } else {
      setQuoteError();
    }
  }

  function setQuoteError() {
    setQuote({
      quoteOut: null,
      isStable: null,
      USD: {
        in: null,
        out: null,
      },
      error: "Swap router not found!",
    });
  }
  useEffect(() => {
    console.log(quote);
  }, [quote]);
  function getUSD(value: any, price: any) {
    const result = value * price;
    return result.toFixed(2);
  }
  return quote;
}

export default useSwapProvider;
