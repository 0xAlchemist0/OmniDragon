import { useEffect, useState } from "react";
import { assembleTransaction, generateQuote } from "../lib/odos-handler";
import contracts from "../utils/contracts";
import { useTxService } from "./TxServiceProvider";

//only pass in address and amounts dont pass in entire object
function useSwapProvider(
  tokenIn: any,
  tokenOut: any,
  inAmount: any,
  slippage: any
) {
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
    rawQuote: null,
    assembledTX: null,
    updateApproval: null,
    images: { in: null, out: null },
    names: { in: null, out: null },
    prices: { in: null, out: null },
  });

  useEffect(() => {
    if (tokenIn && tokenOut && inAmount) {
      resetState();

      getTest();
      // tempQuote();
    }
  }, [tokenIn, tokenOut, inAmount]);
  const updateApproval = (type: boolean) => {
    setQuote({ ...quote, isApproved: type });
  };

  async function getTest() {
    const result: any = await generateQuote(
      tokenIn,
      tokenOut,
      inAmount,
      slippage,
      reader
    );
    console.log("rest", result);
    const assembledTX = await assembleTransaction(result.rawQuote, reader);
    result.assembledTX = assembledTX;
    setQuote(result);
  }

  function resetState() {
    setQuote({
      quoteOut: null,
      isStable: null,
      inAmount: null,
      USD: {
        in: null,
        out: null,
      },
      error: undefined,
      isApproved: false,
      rawQuote: null,
      assembledTX: null,
      updateApproval: null,
      images: { in: null, out: null },
      names: { in: null, out: null },
      prices: { in: null, out: null },
    });
  }
  // // reuslt we get we now gotta format and
  // "quotes": [
  //     "10.890519074714155008",
  //     "400"
  // ],
  // "prices": [
  //     0.2845,
  //     10.44
  // ]

  // async function tempQuote() {
  //   const isApproved = await verifyApproval();

  //   const isPair: any = await reader.isPair(tokenIn, tokenOut, reader);

  //   const prices = await getTokenPrice([tokenIn, tokenOut], reader);
  //   let result = null;
  //   if (isPair) {
  //     const isStable = await reader.isPairStable(tokenIn, tokenOut, reader);

  //     result = await reader.getAmountsOut(
  //       tokenIn,
  //       tokenOut,
  //       isStable,
  //       inAmount
  //     );

  //     if (result) {
  //       result[0] = formatUnits(result[0], 18);
  //       result[1] = formatUnits(result[1], 18);
  //       //index zeroo value of token in in usd
  //       //index one value for tokenout in usd
  //       const usdValues: any = getUSDValues([inAmount, result[1]], prices);
  //       setQuote({
  //         quoteOut: String(result[1]),
  //         isStable,
  //         inAmount,
  //         USD: {
  //           in: usdValues[0],
  //           out: usdValues[1],
  //         },
  //         error: undefined,
  //         isApproved,
  //         rawQuote: null,
  //     assembledTX: null

  //       });
  //     } else {
  //       setQuote({
  //         quoteOut: null,
  //         isStable: null,
  //         inAmount: null,
  //         USD: {
  //           in: null,
  //           out: null,
  //         },
  //         error: "Pair not available to trade",
  //         isApproved,
  //         rawQuote: null,
  //     assembledTX: null

  //       });
  //     }
  //   }
  // }

  function getUSDValues(values: any, prices: any) {
    const usdValues = [];
    for (const value in values) {
      const valueUSD = parseFloat(values[value]) * parseFloat(prices[value]);

      usdValues.push(valueUSD.toFixed(2));
    }
    return usdValues;
  }
  async function verifyApproval() {
    const isAppoved = await reader.isApproved(
      tokenIn,
      contracts.Odos.Router,
      "1000000000000000000000000000000"
    );
    return isAppoved;
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
      isAppoved: false,
      rawQuote: null,
      assembledTX: null,
      prices: { in: null, out: null },
    });
  }
  useEffect(() => {}, [quote]);

  function getUSD(value: any, price: any) {
    const result = value * price;
    return result.toFixed(2);
  }
  return { quote, updateApproval };
}

export default useSwapProvider;
