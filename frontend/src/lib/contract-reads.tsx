import { formatUnits } from "viem";
import viemClient from "../utils/ViemClient";
import { veDRAGONAbi } from "../utils/abi/veDRAGONAbi";
import contracts from "../utils/contracts";

export default async function balanceOf(
  tokenAddress: any,
  userAddress: any,
  abi: any
) {
  try {
    const data: any = await viemClient.readContract({
      address: tokenAddress,
      account: userAddress,
      abi,
      functionName: "balanceOf",
      args: [userAddress],
    });
    const decimals = 18;

    return formatUnits(data, decimals);
  } catch (error) {
    console.log("Error", error);
    return 0;
  }
}

async function calculateVotingPower(amount: string, duration: string) {
  try {
    const data: any = await viemClient.readContract({
      address: contracts.Tokens.veDRAGON,
      abi: veDRAGONAbi,
      functionName: "calculateVotingPower",
      args: [amount, duration],
    });
    console.log("Voting Power:", data);
    return data;
  } catch (error) {
    console.log(error);
    return 0;
  }
}
