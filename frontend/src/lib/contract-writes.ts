import { veDRAGONAbi } from "../utils/abi/veDRAGONAbi";
import contracts from "../utils/contracts";
import { walletClient } from "../utils/ViemClient";

export async function lock(signer: any, params: any) {
  console.log("igner: ", signer);
  await walletClient.writeContract({
    address: contracts.veDRAGON,
    account: signer,
    abi: veDRAGONAbi,
    functionName: "lock",
    args: params,
  });
  return 0;
}
