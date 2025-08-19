import { formatUnits } from "viem";
import { viemClient } from "../utils/ViemClient";
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

export async function calculateVotingPower(amount: any, duration: any) {
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


/class makes things easier
export class Read {
  public wallet: any;
  public Constructor(user: any) {
    this.wallet = user;
  }

  //updaters used in use effect hooks

  public updateWallet(newWallet: any) {
    this.wallet - newWallet;
  }

  public async calculateVotingPower(amount: any, duration: any) {
    const votingPower = await viemClient.readContract({
      address: contracts.Tokens.veDRAGON,
      abi: veDRAGONAbi,
      functionName: "calculateVotingPower",
      args: [amount, duration],
    });

    return votingPower;
  }

  public async balanceOf(allower: any, spender: any, amount: any, abi: any) {
    const balance: any = await viemClient.readContract({
      address: allower,
      account: this.wallet,
      abi,
      functionName: "balanceOf",
      args: [spender, amount],
    });
    const decimals = 10;
    return formatUnits(balance, decimals);
  }
}
