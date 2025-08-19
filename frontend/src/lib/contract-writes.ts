// export async function lock(signer: any, params: any) {
//   console.log("igner: ", signer);
//   await walletClient.writeContract({
//     address: contracts.veDRAGON,
//     account: signer,
//     abi: veDRAGONAbi,
//     functionName: "lock",
//     args: params,
//   });
//   return 0;
// }

import { createWalletClient, custom } from "viem";
import { sonic } from "viem/chains";
import { veDRAGONAbi } from "../utils/abi/veDRAGONAbi";
import contracts from "../utils/contracts";

// export async initializeClient(chain){
//       this.walletClient = createWalletClient({
//       account: this._wallet,
//       chain: sonic,
//       transport: custom(provider),
//     });
// }

export class Write {
  public walletClient: any = null;
  public wallet: any = null;
  public account = null;

  public constructor(provider: any, account: any) {
    this.wallet = account;
    this.initializeWalletClient(provider);
  }

  public async initializeWalletClient(provider: any) {
    this.walletClient = createWalletClient({
      account: this.wallet,
      chain: sonic,
      transport: custom(provider),
    });
  }
  // /approve before calling functions
  public async approveTokens(
    spender: any,
    amount: any,
    allower: any,
    allowerAbi: any
  ) {
    const response = await this.submitTransaction({
      address: allower,
      abi: allowerAbi,
      functionName: "apporve",
      args: [spender, amount],
    });

    return response;
  }

  //updaters used in use effect hooks

  public async updateUserInfo(newProvider: any, newWallet: any) {
    this.wallet = newWallet;
    this.initializeWalletClient(newProvider);
  }

  public async switchChaim() {}

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
