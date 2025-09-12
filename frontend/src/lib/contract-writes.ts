import { createWalletClient, custom } from "viem";
import UniswapV2FactoryABI from "../utils/abi/UniswapV2FactoryABI";
import UniswapV2RouterABI from "../utils/abi/UniswapV2RouterABI";
import { veDRAGONAbi } from "../utils/abi/veDRAGONAbi";
import contracts from "../utils/contracts";
import { Read } from "./contract-reads";

export class Write {
  public walletClient: any = null;
  public wallet: any = null;
  public account = null;
  public readInstance: any = null;
  public currChain: any;
  public provider: any;
  //initialize each instance with the current chain
  public constructor(provider: any, account: any, chain: any) {
    this.wallet = account;
    this.currChain = chain;
    this.provider = provider;
    this.getRead();
    this.initializeWalletClient();
  }

  public async initializeWalletClient() {
    console.log("wallet:", this.wallet);
    console.log("currChain:", this.currChain);
    console.log("provider:", this.provider);

    try {
      this.walletClient = createWalletClient({
        account: this.wallet,
        chain: this.currChain,
        transport: custom(this.provider),
      });
    } catch (error) {
      console.log("errorrrrE", error);
    }
  }
  public async updateChain(newChain: any) {
    this.walletClient.switchChaim(newChain);
  }

  public async getRead() {
    this.readInstance = new Read(this.account, this.currChain, this.provider);
  }

  public async swapExactTokensforTokens(
    amountIn: any,
    amountOutMin: any,
    routes: any,
    deadline: any
  ) {}

  public async swap(amountIn: any, amountOut: any, to: any, data: any) {
    try {
      const response: any = await this.submitTransaction({
        address: contracts.Uniswap.UniswapV2Router,
        abi: UniswapV2RouterABI,
        functionName: "SwapExactTokensForTokens",
        args: [amountIn, amountOut, to, data],
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async getDeadline() {
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
    return deadline;
  }

  // /approve before calling functions
  //call approval to all check if user is approved brfore

  public async approveTokens(
    spender: any,
    value: any,
    //allower is where the contract which we call approve
    allower: any,
    allowerAbi: any
  ) {
    const isApproved = await this.readInstance.isApproved(
      this.wallet,
      spender,
      allowerAbi,
      value
    );
    if (!isApproved) {
      const response = await this.submitTransaction({
        address: allower,
        abi: allowerAbi,
        functionName: "approve",
        args: [spender, "1000000000000000000000000000000"],
      });

      return true;
    }
    return true;
  }

  //updaters used in use effect hooks

  public async updateUserInfo(newProvider: any, newWallet: any) {
    this.wallet = newWallet;
    this.provider = newProvider;
    this.initializeWalletClient();
  }

  public async lock(amount: any, duration: any) {
    try {
      const response = await this.submitTransaction({
        address: contracts.Tokens.veDRAGON,
        abi: veDRAGONAbi,
        functionName: "lock",
        args: [amount, duration],
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  public async getAmoutOut(amountIn: any, tokenIn: any, tokenOut: any) {
    try {
      //returns an array index 0 is amount of tokenout u get (the one your buying), index 1 is if pool is sttable or not important for swapping
      const quote = await this.submitTransaction({
        address: contracts.Uniswap.UniswapV2Router,
        abi: UniswapV2RouterABI,
        function: "getAmountOut",
        args: [amountIn, tokenIn, tokenOut],
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async createPair(tokenA: any, tokenB: any, pool: any) {
    try {
      const response = await this.submitTransaction({
        address: contracts.Uniswap.UniswapV2Factory,
        abi: UniswapV2FactoryABI,
        function: "createPair",
        args: [tokenA, tokenB, pool],
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  public async submitTransaction(args: any) {
    // const request = await this.readInstance.simulateTx(args);
    const txHash: any = await this.walletClient.writeContract(args);
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
