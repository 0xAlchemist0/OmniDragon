//handles token routing

import { formatUnits, parseUnits } from "viem";
import contracts from "../utils/contracts";
import {
  getTokenImages,
  getTokenNames,
  getTokenPrice,
} from "./dexscreener-handler";
//code should be cleaned and easier when you complete swap functionality
const endpoint = "https://api.odos.xyz/sor/quote/v2";
const assembleEndpoint = "https://api.odos.xyz/sor/assemble";
const requestQuoteParams: any = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: null,
};
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
  console.log("ASSEMBLE BODY: ", rawBody);
  try {
    const { pathId }: any = rawBody;
    const userAddr: any = await reader.getWallet();
    console.log("HERE LEFT OFFF: ", userAddr, pathId);
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
// const assembleRequestBody = {
//   userAddr: '0x...', // the checksummed address used to generate the quote
//   pathId: quote.pathId, // Replace with the pathId from quote response in step 1
//   simulate: true, // this can be set to true if the user isn't doing their own estimate gas call for the transaction
// };
//

//migration and cleaning of code
export async function getQuoteTemp(params: any) {
  const requestBody = bodyBuilder(params);
}

export async function generateQuote(
  tokenIn: any,
  tokenOut: any,
  inAmount: any,
  slippage: any,
  reader: any
) {
  try {
    let result: any = {};
    const chainID: any = await reader.getChainId();
    const userAddr: any = await reader.getWallet();
    const reqBody: any = await bodyBuilder([
      tokenIn,
      tokenOut,
      inAmount,
      userAddr,
      slippage,
      chainID,
    ]);
    const prices = await getTokenPrice([tokenIn, tokenOut], reader);
    const images = await getTokenImages([tokenIn, tokenOut]);
    const names = await getTokenNames([tokenIn, tokenOut]);

    requestQuoteParams.body = reqBody;
    const response = await fetch(endpoint, requestQuoteParams);
    if (response.status === 200) {
      const res: any = await response.json();
      const quoteOut = String(
        parseFloat(formatUnits(res.outAmounts[0], 18)).toFixed(2)
      );
      result = {
        quoteOut,
        inAmount,

        // prices: prices,
        rawResponse: res,
        USD: {},
        isApproved: false,
        error: undefined,
        rawQuote: res,
        images: {
          in: images[0],
          out: images[1],
        },
        names: { in: names[0], out: names[1] },
      };

      const usdValues: any = getUSDValues([inAmount, quoteOut], prices);
      result.USD = {
        in: usdValues[0],
        out: usdValues[1],
      };
      // const assembledTx = await assembleTransaction(res, reader);
      // result.assembledTx = assembledTx;
      const isApproved: any = await verifyApproval(reader, tokenIn);
      console.log(isApproved);
      result.isApproved = isApproved;
      //index zero inamount, indez one outamount
    }

    return result;
  } catch (error) {
    console.log(error);
  }
}
function getUSDValues(values: any, prices: any) {
  const usdValues = [];
  for (const value in values) {
    const valueUSD = parseFloat(values[value]) * parseFloat(prices[value]);

    usdValues.push(valueUSD.toFixed(2));
  }
  return usdValues;
}
async function verifyApproval(reader: any, tokenIn: any) {
  const isAppoved = await reader.isApproved(
    tokenIn,
    contracts.Odos.Router,
    "1000000000000000000000000000000"
  );
  return isAppoved;
}

async function bodyBuilder(params: any) {
  const quoteRequestBody = {
    chainId: params[5], // Replace with desired chainId
    inputTokens: [
      {
        tokenAddress: params[0], // checksummed input token address
        amount: String(parseUnits(params[2], 18)), // input amount as a string in fixed integer precision
      },
    ],
    outputTokens: [
      {
        tokenAddress: params[1], // checksummed output token address
        proportion: 1,
      },
    ],
    userAddr: params[3], // checksummed user address
    slippageLimitPercent: parseFloat(params[4]), // set your slippage limit percentage (1 = 1%),
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
