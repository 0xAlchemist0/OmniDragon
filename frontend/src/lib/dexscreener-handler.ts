import { formatUnits } from "viem";

const endpoints = {
  findPools: "https://api.dexscreener.com/tokens/v1/",
  findToken: "https://api.dexscreener.com/latest/dex/pairs/",
  searchQuery: "https://api.dexscreener.com/latest/dex/search",
};

const defaultPairsByChain: any = {
  sonic: "0x33503BC86f2808151A6e083e67D7D97a66dfEc11",
};

export async function getTokensInfo(tokensList: any, reader: any) {
  const chain = await reader.getChainName();
  const partnersInfo = [];

  for (let i = 0; i < tokensList.length; i++) {
    const tokenInfo = await getToken(tokensList[i], chain);
    if (tokenInfo !== false) {
      partnersInfo.push(tokenInfo);
    } else {
      const unkownPair = unknownPairBody(chain, tokensList[i]);
      partnersInfo.push(unkownPair);
    }
  }
  return partnersInfo;
}

export async function getTokenPrice(tokenList: any, reader: any) {
  const pairs = await getTokensInfo(tokenList, reader);

  const prices = [];
  if (pairs) {
    for (const pair in pairs) {
      const { priceUsd } = pairs[pair];
      prices.push(parseFloat(priceUsd));
    }
  }

  return prices;
}

const defaultPairs: any = {
  sonic: [
    "0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38",
    "0x69Dc1c36F8B26Db3471ACF0a6469D815E9A27777",
  ],
};

export async function getDefaultPair(reader: any) {
  const chainName = await reader.getChainName();
  const result: any = await getTokensInfo(defaultPairs.sonic, reader);
  const formattedPairs: any = await formatPairs(result, reader);
  console.log(result);

  return formattedPairs;
}

export async function searchDexscreener(searchItem: string, chainName: string) {
  try {
    const request = await fetch(
      endpoints.searchQuery + `?q=${searchItem.trim()}`
    );
    const response = await request.json();
    const filtered = filterByChain(response.pairs, chainName);
    const best = discoverBestPair(filtered);
    return best;
  } catch (error) {
    console.log(error);
  }
}

export function filterByChain(pairs: any[], chainName: string) {
  const foundOnChain = [];
  for (const pair in pairs) {
    const currentChain = pairs[pair].chainId;
    if (currentChain === chainName.toLowerCase()) {
      foundOnChain.push(pairs[pair]);
    }
  }
  return foundOnChain;
}

//name change

export async function getPairsInfo(pairsList: any, reader: any) {
  const chain = await reader.getChainName();
  const pairsInfo = [];
  let rounds = 1;
  for (let i = 0; i < pairsList.length; i++) {
    const pairInfo = await searchByPair(pairsList[i], chain);
    if (pairInfo && pairInfo["pairs"] !== null) {
      pairsInfo.push(pairInfo["pairs"][0]);
    }
  }
  return pairsInfo;
}

export async function getDefaultToken(chainName: any, reader: any) {
  let tokenInfo = null;
  if (String(chainName).toLowerCase() === "sonic") {
    tokenInfo = await getTokensInfo(
      ["0xA04BC7140c26fc9BB1F36B1A604C7A5a88fb0E70"],
      reader
    );
  }
}

export async function highliquidityPairs(
  minumum: any,
  maximum: any,
  shouldFindBest: any,
  pairs: any,
  reader: any
) {
  if (shouldFindBest) {
    const pairsInfo = await getPairsInfo(pairs, reader);
  }
}

export async function getDefaultPairs(chainName: any) {
  let result;
  if (String(chainName).toLowerCase() === "sonic") {
    result = await searchByPair(defaultPairsByChain.sonic, chainName);
    const { pairs } = result;
    const { baseToken, quoteToken }: any = pairs[0];
    const inToken = await getToken(baseToken.address, chainName);
    const outToken = await getToken(quoteToken.address, chainName);
    return { in: inToken, out: outToken };
  }

  return result;
}

export async function filterByDex(found: any[], dexId: string) {}

export async function searchByPair(pairAddress: any, chain: string) {
  try {
    const infoRequest = await fetch(
      endpoints.findToken + String(chain).toLowerCase() + `/${pairAddress}`
    );
    const info = await infoRequest.json();
    return info;
  } catch (error) {
    return null;
  }
}

export async function getToken(tokenAddress: string, chain: string) {
  try {
    const infoRequest = await fetch(
      endpoints.findPools + chain + `/${tokenAddress}`
    );

    const info = await infoRequest.json();
    if (info.length > 0) {
      const bestPair = discoverBestPair(info);

      return bestPair;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

//rechec flow of this file

function discoverBestPair(pairs: any) {
  let bestPair = null;
  let bestRatio = -Infinity;
  //fix its supposed to be in pair in pairs
  for (const pair in pairs) {
    console.log(pairs[pair]);
    const pairRatio = getVolumeLiquidityRatio(pairs[pair]);
    console.log(pairRatio);
    if (pairRatio > bestRatio) {
      bestRatio = pairRatio;
      bestPair = pairs[pair];
    }
  }
  console.log("bestPair: ", bestPair);
  return bestPair;
}

function getVolumeLiquidityRatio(info: any) {
  const { liquidity, volume } = info;

  if (liquidity) {
    return (liquidity["usd"] + volume["h24"]) * 2;
  } else {
    return 0;
  }
}

export async function getPairsAll(reader: any) {
  const chainName = await reader.getChainName();
  if (!chainName) throw new Error("No chain name found ");
  const dexFilter =
    String(chainName).toLowerCase() === "sonic" ? "shadow-exchange" : null;

  //returns  top pairs on dexscreeenr for the specific dex
  const dexSearch = await fetch(endpoints.searchQuery + `?q=${dexFilter}`);
  const searchRes = await dexSearch.json();

  const filtered = await formatPairs(searchRes.pairs, reader);
  return filtered;
}
////

export async function formatPairs(pairs: any, reader: any) {
  const formattedPairs = [];
  for (const pair in pairs) {
    const { baseToken, priceUsd, info = null, liquidity }: any = pairs[pair];
    const balance = await reader.tempBalanceOf(baseToken.address);
    console.log("balance: ");
    //defalt foormat for all ppairs no ore slopy destructring
    formattedPairs.push({
      name: baseToken.name,
      symbol: baseToken.symbol,
      address: baseToken.address,
      image: info ? info.imageUrl : null,
      liquidity,
      priceUsd,
      balance: String(parseFloat(formatUnits(balance, 18)).toFixed(2)),
    });
  }
  return formattedPairs;
}

//i think we have to check that the best pair is actually paired to dragon it cant be paird to another token
function unknownPairBody(chainName: any, tokenAddress: any) {
  const body = {
    chainId: { chainName },
    dexId: "unkown",
    url: `https://dexscreener.com/solana/${tokenAddress}`,
    pairAddress: "Not Found",
    labels: ["Unkown"],
    baseToken: {
      address: tokenAddress,
      name: "N/A",
      symbol: "N/A",
    },
    quoteToken: {
      address: tokenAddress,
      name: "N/A",
      symbol: "N/A",
    },
    priceNative: "Unknown",
    priceUsd: "Unknown",
    txns: {},
    volume: {
      h24: 0,
      h6: 0,
      h1: 0,
      m5: 0,
    },
    priceChange: {
      m5: 0,
      h1: 0,
      h6: 0,
      h24: 0,
    },
    liquidity: {
      usd: 0,
      base: 0,
      quote: 0,
    },
    fdv: 0,
    marketCap: 0,
    pairCreatedAt: 0,
    info: {
      imageUrl:
        "https://wallpapers.com/images/hd/thinking_-emoji_-confusion-png-xpnniaqrng2mn9r1.jpg",
      header:
        "https://dd.dexscreener.com/ds-data/tokens/solana/JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN/header.png?key=87bc98",
      openGraph:
        "https://cdn.dexscreener.com/token-images/og/solana/JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN?timestamp=1757037600000",
      websites: [
        {
          label: "Twitter",
          url: "Unknown",
        },
      ],
      socials: [
        {
          type: "Discord",
          url: "Unknown",
        },
        {
          type: "Website",
          url: "Unknown",
        },
      ],
    },
  };
  return body;
} //skeleton goes here
