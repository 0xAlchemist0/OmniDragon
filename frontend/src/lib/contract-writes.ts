import { createWalletClient, custom } from "viem";
import ERC20ABI from "../utils/abi/ERC20ABI";
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
    try {
      this.walletClient = createWalletClient({
        account: this.wallet,
        chain: this.currChain,
        transport: custom(this.provider),
      });
    } catch (error) {}
  }
  public async updateChain(newChain: any) {
    this.walletClient.switchChaim(newChain);
  }

  public async getRead() {
    this.readInstance = new Read(this.account, this.currChain, this.provider);
  }
  // contract-writes.ts

  // BigInt-safe slippage calculation

  // Swap function using BigInt everywhere
  public async swapExactTokensForTokens(
    amountIn: any, // must be BigInt
    amountOutMin: any, // must be BigInt
    from: any,
    to: any,
    slippagePercent: any,
    deadline: any,
    stable: any
  ) {
    try {
      if (!amountIn || !amountOutMin || !to || !from) {
        throw new Error("Missing inputs");
      }
      this.getRead();
      if (!this.readInstance) {
        throw new Error("Failed reader is not initialized!");
      }

      const isStable: any = await this.readInstance.checkPairStableness(
        from,
        to,
        this.readInstance
      );
      console.log("Is this pool stable at all: ", isStable);
      const slippageApplied = await this.applySlippage(
        amountOutMin,
        slippagePercent
      );
      //amountIN (tokens you are selling amount)
      //amountoutmin
      // Apply slippage safely
      // const minOut = this.applySlippage(amountOutMin, slippagePercent);

      if (isStable || isStable === false) {
        // Call your router contract
        const routes = [{ from, to, stable }];
        const response: any = await this.submitTransaction({
          address: contracts.Uniswap.UniswapV2Router,
          abi: UniswapV2RouterABI,
          method: "swapExactTokensForTokens",
          args: [amountIn, slippageApplied, routes, this.wallet, deadline],
        });

        return response;
      } else {
        console.log("Failed TX alert stableness  not fond!");
      }
    } catch (err) {
      console.error("Swap failed:", err);
      throw err;
    }
  }

  public async getRoute() {}

  public async getDeadline(suggestedDeadline: any) {
    if (suggestedDeadline === "0")
      return BigInt(Math.floor(Date.now() / 1000) + 60 * 20);
    const deadline = BigInt(Math.floor(Date.now() / 1000) + 60 * 20);
    return deadline;
  }

  // /approve before calling functions
  //call approval to all check if user is approved brfore

  public async applySlippage(amountOutMin: any, slippage: any) {
    const result = parseFloat(amountOutMin) * (1 - parseFloat(slippage));
    return String(result);
  }

  //remembr lock still passes in old param so fix 09-16-2025
  public async approveTokens(
    tokenAddress: any,
    spender: any,
    amountToTransact: any
  ) {
    const isApproved = await this.readInstance.isApproved(
      tokenAddress,
      spender,
      amountToTransact
    );
    if (!isApproved) {
      const response: any = await this.submitTransaction({
        address: tokenAddress,
        abi: ERC20ABI,
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
    } catch (error) {}
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
    } catch (error) {}
  }

  public async calculateGas(params: any) {
    const gas = await this.readInstance.estimateContractTotalGas(params);
    return gas;
  }

  public async createPair(tokenA: any, tokenB: any, stable: any) {
    try {
      const response = await this.submitTransaction({
        address: contracts.Uniswap.UniswapV2Factory,
        abi: UniswapV2FactoryABI,
        function: "createPair",
        args: [tokenA, tokenB, stable],
      });
      return response;
    } catch (error) {}
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
