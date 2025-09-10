const endpoints = {
  findPools: "https://api.dexscreener.com/tokens/v1/",
  findToken: "https://api.dexscreener.com/latest/dex/pairs/",
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

//name change

export async function getPairsInfo(pairsList: any, reader: any) {
  const chain = await reader.getChainName();
  const pairsInfo = [];

  for (let i = 0; i < pairsList.length; i++) {
    const pairInfo = await searchByPair(pairsList[i], chain);
    console.log(typeof pairInfo);
    if (pairInfo && pairInfo["pairs"] !== null) {
      console.log(pairInfo);
      pairsInfo.push(pairInfo["pairs"][0]);
    }
  }
  return pairsInfo;
}

async function searchByPair(pairAddress: any, chain: string) {
  try {
    const infoRequest = await fetch(
      endpoints.findToken + String(chain).toLowerCase() + `/${pairAddress}`
    );
    const info = await infoRequest.json();
    return info;
  } catch (error) {
    console.log(error);
  }
}

async function getToken(tokenAddress: string, chain: string) {
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
  let bestRatio = 0;
  //fix its supposed to be in pair in pairs
  for (const pair in pairs) {
    const pairRatio = getVolumeLiquidityRatio(pairs[pair]);

    if (pairRatio > bestRatio) {
      bestRatio = pairRatio;
      bestPair = pairs[pair];
    }
  }

  return bestPair;
}

function getVolumeLiquidityRatio(info: any) {
  const { liquidity, volume } = info;

  return (liquidity["usd"] + volume["h24"]) * 2;
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
