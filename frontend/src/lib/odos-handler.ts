//handles token routing

import { formatUnits, parseUnits } from "viem";
import { getTokenPrice } from "./dexscreener-handler";
//code should be cleaned and easier when you complete swap functionality
const endpoint = "https://api.odos.xyz/sor/quote/v2";
const assembleEndpoint = "https://api.odos.xyz/sor/assemble";

async function assembleTransactionBody(userAddr: any, pathID: any) {
  const assembleRequestBody = {
    userAddr: userAddr, // the checksummed address used to generate the quote
    pathId: pathID, // Replace with the pathId from quote response in step 1
    simulate: true, // this can be set to true if the user isn't doing their own estimate gas call for the transaction
  };

  return JSON.stringify(assembleRequestBody);
}

export async function assembleTransaction(rawBody: any, reader: any) {
  if (!rawBody) throw new Error("Missing the body parameter!");
  try {
    const { pathId }: any = rawBody;
    const userAddr: any = await reader.getWallet();
    const assembleBody: any = await assembleTransactionBody(userAddr, pathId);
    const result: any = await fetch(assembleEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: assembleBody,
    });
    const response: any = await result.json();

    if (response) {
      console.log("transaction assembled: ", response);
      return response;
    }
    console.log("not found !");
    return null;
  } catch (error) {
    console.log(error);
  }
}

export async function generateQuote(
  tokenIn: any,
  tokenOut: any,
  inAmount: any,
  slippage: any,
  reader: any
) {
  try {
    let result = {};
    const chainID: any = await reader.getChainId();
    const userAddr: any = await reader.getWallet();
    const reqBody: any = await bodyBuilder(
      tokenIn,
      tokenOut,
      inAmount,
      userAddr,
      slippage,
      chainID
    );
    const prices = await getTokenPrice([tokenIn, tokenOut], reader);
    const response = await fetch("https://api.odos.xyz/sor/quote/v2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: reqBody,
    });
    if (response.status === 200) {
      const res: any = await response.json();
      //index zero inamount, indez one outamount
      result = {
        quotes: [
          inAmount,
          String(parseFloat(formatUnits(res.outAmounts[0], 18)).toFixed(2)),
        ],

        prices: prices,
        rawResponse: res,
      };
    }

    return result;
  } catch (error) {}
}

async function bodyBuilder(
  tokenIn: any,
  tokenOut: any,
  inAmount: any,
  userAddr: any,
  slippage: any,
  chainID: any
) {
  const quoteRequestBody = {
    chainId: chainID, // Replace with desired chainId
    inputTokens: [
      {
        tokenAddress: tokenIn, // checksummed input token address
        amount: String(parseUnits(inAmount, 18)), // input amount as a string in fixed integer precision
      },
    ],
    outputTokens: [
      {
        tokenAddress: tokenOut, // checksummed output token address
        proportion: 1,
      },
    ],
    userAddr, // checksummed user address
    slippageLimitPercent: 5.0, // set your slippage limit percentage (1 = 1%),
    referralCode: 0, // referral code (recommended)
    disableRFQs: true,
    compact: true,
  };
  return JSON.stringify(quoteRequestBody);
}

// { const [quote, setQuote] = useState({
//     quoteOut: null,
//     isStable: null,
//     inAmount: null,
//     USD: {
//       in: null,
//       out: null,
//     },
//     error: undefined,
//     isApproved: false,
//   });

//     "traceId": "8abb7c2e-f3c6-430f-b481-406bb6feff4e",
//     "inTokens": [
//         "0x039e2fb66102314ce7b64ce5ce3e5183bc94ad38"
//     ],
//     "outTokens": [
//         "0x3333b97138d4b086720b5ae8a7844b1345a33333"
//     ],
//     "inAmounts": [
//         "400000000000000000000"
//     ],
//     "outAmounts": [
//         "10879549717191319552"
//     ],
//     "gasEstimate": 487759,
//     "dataGasEstimate": 0,
//     "gweiPerGas": 60,
//     "gasEstimateValue": 0.008332398960964785,
//     "inValues": [
//         113.94228822759344
//     ],
//     "outValues": [
//         113.83938636418928
//     ],
//     "netOutValue": 113.83105396522832,
//     "priceImpact": 0.14502024839996427,
//     "percentDiff": -0.060328610162926566,
//     "permit2Message": null,
//     "permit2Hash": null,
//     "partnerFeePercent": 0,
//     "pathId": "59bf7e360f6123c44c5a788a63f16b97",
//     "pathViz": null,
//     "blockNumber": 49087381
// }
