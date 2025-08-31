import { arbitrum, base, sonic } from "viem/chains";

export const chainMap: any = {
  [base.id]: base.name,
  [sonic.id]: sonic.name,
  [arbitrum.id]: arbitrum.name,
};

export async function findChainName(chainId: number) {
  return await chainMap[chainId];
}
