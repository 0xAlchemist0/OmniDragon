import { createPublicClient, createWalletClient, http } from "viem";
import { sonic } from "viem/chains";

export let viemClient = createPublicClient({
  chain: sonic,
  transport: http(),
});

export const walletClient = createWalletClient({
  chain: sonic,
  transport: http(),
});

export async function updatePublicChain(newChain) {
  viemClient = createPublicClient({
    chain: newChain,
    transport: http(),
  });
}
