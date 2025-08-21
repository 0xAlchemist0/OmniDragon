import { createWalletClient, custom } from "viem";
import { veDRAGONAbi } from "../utils/abi/veDRAGONAbi";
import contracts from "../utils/contracts";
import { findChain } from "./chainFinder";
import { Read } from "./contract-reads";

export class Write {
  public walletClient: any = null;
  public wallet: any = null;
  public account = null;
  public readInstance: any = null;
  public currChain: any;

  //initialize each instance with the current chain
  public constructor(provider: any, account: any, chainId: any) {
    this.wallet = account;
    this.currChain = findChain(chainId);
    this.initializeWalletClient(provider);
  }

  public async initializeWalletClient(provider: any) {
    this.walletClient = createWalletClient({
      account: this.wallet,
      chain: this.currChain,
      transport: custom(provider),
    });
  }
  public async updateChain(newChain: any) {
    this.walletClient.switchChaim(newChain);
  }

  public async getRead() {
    this.readInstance = new Read(this.account, this.currChain.id);
  }

  // /approve before calling functions
  //call approval to all check if user is approved brfore

  public async approveTokens(
    spender: any,
    amount: any,
    allower: any,
    allowerAbi: any
  ) {
    const isApproved = await this.readInstance.isApproved(
      this.account,
      spender,
      allowerAbi,
      amount
    );
    if (isApproved) {
      const response = await this.submitTransaction({
        address: allower,
        abi: allowerAbi,
        functionName: "apporve",
        args: [spender, "1000000000000"],
      });

      return response;
    }
    return false;
  }

  //updaters used in use effect hooks

  public async updateUserInfo(newProvider: any, newWallet: any) {
    this.wallet = newWallet;
    this.initializeWalletClient(newProvider);
  }

  public async lock(amount: any, duration: any) {
    const response = await this.submitTransaction({
      address: contracts.veDRAGON,
      abi: veDRAGONAbi,
      functionName: "lock",
      args: [amount, duration],
    });

    return response;
  }

  public async submitTransaction(args: any) {
    const { request }: any = await this.walletClient.simulateContract({
      account: this.wallet,
      ...args,
    });
    const txHash: any = await this.walletClient.writeContract(request);
    const resposne: any = this.txResponse(Boolean(txHash), txHash);
    return resposne;
  }

  public txResponse(txSuccess: boolean, txHash: any = null) {
    if (txSuccess) {
      return {
        complete: true,
        message: `🎉 Transaction Success`,
        txHash,
      };
    }

    return {
      complete: false,
      message: `⚠️ Transaction Failed: `,
    };
  }
}
