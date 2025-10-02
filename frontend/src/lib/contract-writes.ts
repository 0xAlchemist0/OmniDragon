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
  //   1.21
  // contract-reads.tsx:75 Cant find pairs tableness
  // TxConfirm.tsx:76 IS the pair stable?:  null
  // contract-reads.tsx:75 Cant find pairs tableness
  // contract-writes.ts:68 Is this pool stable at all:  null
  // contract-writes.ts:90 Failed TX alert stableness  not fond!
  public async performSwap(assembledTransaction: any, isApproved: any) {
    try {
      console.log("swapping");
      console.log(assembledTransaction);
      // const data = decodeFunctionData({
      //   abi: contracts.Odos.Router,
      //   data: "0xfb8f41b2000000000000000000000000ac041df48df9791b0654f1dbbf2cc8450c5f2e9d000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002c68af0bb140000', '0xfb8f41b2000000000000000000000000ac041df48df9791b0654f1dbbf2cc8450c5f2e9d000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002c68af0bb140000",
      // });
      // console.log("decoded error", data);
      const { inputTokens, transaction }: any = assembledTransaction;
      const { to } = transaction;
      const { tokenAddress } = inputTokens;
      await this.approveTokens(
        assembledTransaction.inputTokens[0].tokenAddress,
        assembledTransaction.transaction.to
      );

      const tx = await this.walletClient.sendTransaction({
        to: assembledTransaction.transaction.to,
        value: assembledTransaction.transaction.value,
        data: assembledTransaction.transaction.data,
      });
      const result = "";
    } catch (error) {
      console.log(error);
    }
  }

  public async swapExactTokensForTokens(args: any) {
    console.log(args);
    try {
      //should fix should be in steps and seperate click approve spending then swp pops up

      const simulation = await this.readInstance.simulateTX(args);
      const response: any = await this.submitTransaction(args);

      return response;
    } catch (err) {
      console.error("Swap failed:", err);
      throw err;
    }
  }

  public async swapExactTokensForEth(args: any) {
    console.log(args);
    try {
      const simResult = await this.readInstance.simulateTX(args);
      const result = await this.submitTransaction(args);
    } catch (error) {
      console.log(error);
    }
  }

  public async getRoute() {}

  public async getDeadline(suggestedDeadline: any) {
    if (suggestedDeadline === "0")
      return Math.floor(Date.now() / 1000) + 60 * 20;
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
    return deadline;
  }

  // /approve before calling functions
  //call approval to all check if user is approved brfore

  public async applySlippage(amountOutMin: any, slippage: any) {
    const parsedDecimal: any = parseFloat(slippage) / 100;
    const result = parseFloat(amountOutMin) * (1 - parseFloat(parsedDecimal));
    return String(result);
  }

  //remembr lock still passes in old param so fix 09-16-2025
  public async approveTokens(tokenAddress: any, spender: any) {
    await this.submitTransaction({
      address: tokenAddress,
      abi: ERC20ABI,
      functionName: "approve",
      args: [spender, parseUnits("2000000000000000000000000000000000", 18)],
    });
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
