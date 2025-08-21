import { createPublicClient, formatUnits, http } from "viem";
import { viemClient } from "../utils/ViemClient";
import { veDRAGONAbi } from "../utils/abi/veDRAGONAbi";
import contracts from "../utils/contracts";
import { findChain } from "./chainFinder";
//check approval before tx in read

//class makes things easier
export class Read {
  public wallet: any;
  public viemClient: any;
  public chainConfig: any;

  public constructor(user: any, chain: any) {
    this.wallet = user;
    this.chainConfig = chain;
    this.intializeClient();
  }

  //updaters used in use effect hooks

  public updateWallet(newWallet: any) {
    this.wallet - newWallet;
  }

  public async intializeClient() {
    this.viemClient = createPublicClient({
      chain: this.chainConfig,
      transport: http(),
    });
  }

  //updates automatically pass chain id boom goes the function
  public async updateChain(chainId: any) {
    const newChain: any = findChain(chainId);

    if (newChain) {
      this.chainConfig = newChain;
      this.intializeClient();
    }
  }

  //Approvsl before tx
  //always check this to make sure u can spend tokens
  public async isApproved(
    owner: any,
    spender: any,
    allowerAbi: any,
    amountToTransact: string
  ) {
    const currentAllowance: any = await viemClient.readContract({
      address: spender,
      abi: allowerAbi,
      functionName: "allowance",
      args: [owner, spender],
    });

    const isApproved = currentAllowance >= amountToTransact ? true : false;

    return isApproved;
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
