import { createPublicClient, http } from "viem";
import { sonic } from "viem/chains";

const viemClient = createPublicClient({
  chain: sonic,
  transport: http(),
});

export default viemClient;
