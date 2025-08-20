import * as chains from "viem/chains";

export function findChain(newChain: any) {
  return Object.values(chains).find((x) => x.id === newChain);
}
