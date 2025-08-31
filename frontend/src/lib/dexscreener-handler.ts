const endpoints = {
  findPools: "https://api.dexscreener.com/tokens/v1/",
};

export async function getTokensInfo(tokensList: any, reader: any) {
  const chain = await reader.getChainName();
  console.log("chain name: ", chain);
  for (let i = 0; i < tokensList.length; i++) {
    const tokenInfo = await getToken(
      "0x79bbF4508B1391af3A0F4B30bb5FC4aa9ab0E07C",
      chain
    );
  }
}

async function getToken(tokenAddress: string, chain: string) {
  try {
    const infoRequest = await fetch(
      endpoints.findPools + chain + `/${tokenAddress}`
    );

    const info = await infoRequest.json();

    console.log(await info);
  } catch (error) {
    console.log(error);
  }
}
