import { useEffect, useState } from "react";
import { formatUnits, parseUnits } from "viem";
import { getTokensInfo } from "../lib/dexscreener-handler";
import contracts from "../utils/contracts";
import { useTxService } from "./TxServiceProvider";

//only pass in address and amounts dont pass in entire object
function useSwapProvider(tokenIn: any, tokenOut: any, inAmount: any) {
  const { reader, writer }: any = useTxService();
  const [quote, setQuote] = useState({
    quoteOut: null,
    isStable: null,
    inAmount: null,
    USD: {
      in: null,
      out: null,
    },
    error: undefined,
    isApproved: false,
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
    const isApproved = await reader.isApproved(
      tokenIn,
      contracts.Uniswap.UniswapV2Router,
      parseUnits(inAmount, 18)
    );
    console.log("is approved?: ", isApproved);
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

        //index one quote , index2 pairsStableness

        setQuote({
          quoteOut,
          isStable,
          inAmount,
          USD: {
            in: usdIn,
            out: usdOut,
          },
          error: undefined,
          isApproved,
        });
      }
    } else {
      setQuoteError();
    }
  }

  function setQuoteError() {
    setQuote({
      quoteOut: null,
      isStable: null,
      inAmount,
      USD: {
        in: null,
        out: null,
      },
      error: "Swap router not found!",
      isAppoved: quote.isApproved,
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
