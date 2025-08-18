import { createPublicClient, createWalletClient, http } from "viem";
import { sonic } from "viem/chains";

export const viemClient = createPublicClient({
  chain: sonic,
  transport: http(),
});

export const walletClient = createWalletClient({
  chain: sonic,
  transport: http(),
});
