import { createWalletClient, custom, parseUnits } from "viem";
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

  public async swapExactTokensForTokens(
    amountIn: any,
    amountOutMin: any,
    from: any,
    to: any,
    slippage: any,
    deadline: any,
    //just added pass in on other file fix search first
    stable: any
  ) {
    try {
      if (!amountIn || !amountOutMin || !to || !from)
        throw new Error("Missing inputs");

      const slipageApplied = this.applySlippage(amountOutMin, slippage);
      const deadlineFinal: any = await this.getDeadline(slippage);
      console.log("Amount in: ", amountIn, " Type: ", typeof amountIn);
      console.log(
        "Amount out min: ",
        amountOutMin,
        " Type: ",
        typeof amountOutMin
      );
      console.log("from in: ", from, " Type: ", typeof from);
      console.log("to: ", to, " Type: ", typeof to);
      console.log("Slipage: ", slippage, " Type: ", typeof slippage);
      console.log("deadline: ", deadline, " Type: ", typeof deadline);
      console.log("My wallet: ", this.wallet);
      console.log("slippage applied: ", slipageApplied);
      console.log("deadline found : ", deadline);

      console.log("Applied:", slipageApplied);
      const routes = [{ from: from, to: to, stable: true }];
      let params = {
        address: contracts.Uniswap.UniswapV2Router,
        abi: UniswapV2RouterABI,
        functionName: "swapExactTokensForTokens",
        args: [
          parseUnits(String(amountIn), 18),
          slipageApplied,
          routes,
          this.wallet,
          deadlineFinal,
        ],
      };
      const gasEstimate = await this.calculateGas(params);

      const response: any = await this.submitTransaction({
        ...params,
        gas: gasEstimate + 50000n,
      });
      return { status: "Transaction sucessful" };
    } catch (error) {
      console.log(error);
    }
  }
  public applySlippage(amountOut: string, slippagePercent: string) {
    // Convert token amount to wei
    const expected = parseUnits(amountOut, 18);

    // Convert "0.12" (12%) into basis points → 1200
    const bps = BigInt(Math.floor(parseFloat(slippagePercent) * 10000));

    // Apply slippage correctly
    const amountOutMin = (expected * (10000n - bps)) / 10000n;

    return amountOutMin; // BigInt
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

  //remembr lock still passes in old param so fix 09-16-2025
  public async approveTokens(
    tokenAddress: any,
    spender: any,
    amountToTransact: any
  ) {
    console.log("Token Address: ", spender);
    console.log("mount to swap in :", amountToTransact);
    const isApproved = await this.readInstance.isApproved(
      tokenAddress,
      spender,
      amountToTransact
    );
    if (!isApproved) {
      console.log("writing approval");
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

  public async calculateGas(params: any) {
    const gas = await this.readInstance.estimateContractTotalGas(params);
    return gas;
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
