import { createPublicClient, formatEther, formatUnits, http } from "viem";
import { viemClient } from "../utils/ViemClient";
import { DRAGONGAUGEREGISTRYAbi } from "../utils/abi/DRAGONGAUGEREGISTRYAbi";
import ERC20ABI from "../utils/abi/ERC20ABI";
import UniswapV2FactoryABI from "../utils/abi/UniswapV2FactoryABI";
import UniswapV2RouterABI from "../utils/abi/UniswapV2RouterABI";
import { veDRAGONAbi } from "../utils/abi/veDRAGONAbi";
import contracts from "../utils/contracts";
import { findChain } from "./chainFinder";
import { findChainName } from "./chainMap";
import { getPairsInfo, getTokensInfo } from "./dexscreener-handler";
//check approval before tx in read

//class makes things easier
export class Read {
  public wallet: any;
  public viemClient: any;
  public provider: any;
  public chainConfig: any;

  public constructor(user: any, chain: any, provider: any) {
    this.wallet = user;
    this.chainConfig = chain;
    this.provider = provider;
    this.intializeClient();
  }

  //updaters used in use effect hooks

  public updateWallet(newWallet: any) {
    this.wallet = newWallet;
  }

  public async getChainId() {
    return await this.viemClient.getChainId();
  }

  public async getchainLogo() {
    return await this.viemClient.getchainLogo();
  }

  public async getChainName() {
    const chainId: number = await this.getChainId();
    const chainName: string = await findChainName(chainId);
    return chainName;
  }

  public async intializeClient() {
    this.viemClient = createPublicClient({
      chain: this.chainConfig,
      transport: http(),
    });
  }

  //flow change
  //wait check how we verify pair first find function that does this as well
  public async checkPairStableness(tokenIn: any, tokenOut: any, reader: any) {
    let result = {};
    if (!tokenIn || !tokenOut || !reader) {
      throw new Error("Mising Params");
    }

    //array returne sorted
    const amountSimulated = "2000";
    const simulatedQuote: any = await this.getAmountOut(
      amountSimulated,
      tokenIn,
      tokenOut,
      reader
    );
    console.log("Simulated quote: ", simulatedQuote);
    if (simulatedQuote[0]) {
      return simulatedQuote[1];
    } else {
      console.log("Cant find pairs tableness");
      return null;
    }
  }
  public async simulateContract(params: any) {
    const simulation = await this.viemClient.simulateContract(params);
    console.log(simulation);
  }

  public async estimateContractTotalGas(params: any) {
    try {
      const gas: any = await this.viemClient.estimateContractGas(params);
      return gas;
    } catch (error) {}
  }

  //updates automatically pass chain id boom goes the function
  public async updateChain(chainId: any) {
    const newChain: any = findChain(chainId);

    if (newChain) {
      this.chainConfig = newChain;
      this.intializeClient();
    }
  }

  public async simulateTX(args: any) {
    const { request }: any = await this.viemClient.simulateContract({
      account: this.wallet,
      ...args,
    });
    return request;
  }

  //Approvsl before tx
  //always check this to make sure u can spend tokens
  public async isApproved(
    tokenAddress: any,
    spender: any,
    amountToTransact: string
  ) {
    try {
      const currentAllowance: any = await viemClient.readContract({
        address: tokenAddress,
        abi: ERC20ABI,
        functionName: "allowance",
        args: [this.wallet, spender],
      });

      const isApproved = currentAllowance >= amountToTransact ? true : false;
      return isApproved;
    } catch (error) {}
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

  public async getReserves(tokenA: any, tokenB: any, stable: any) {
    try {
      const reserveResult = await this.viemClient({
        address: contracts.Uniswap.UniswapV2Router,
        abi: UniswapV2RouterABI,
        funcitonName: "getReserves",
        args: [tokenA, tokenB, stable],
      });

      if (reserveResult) {
        //returns reserve a and b
        //returns the current price of the pool
        return reserveResult[0] / reserveResult[1];
      } else {
        return null;
      }
    } catch (error) {
      console.log("pair not found!");
      return null;
    }
  }

  //uses getPair to return a verifiable pair
  public async doesPairExist(
    tokenA: any,
    tokenB: any,
    stable: any,
    reader: any
  ) {
    try {
      const sortedPairs = await this.sortTokens(tokenA, tokenB);
      const result = await viemClient.readContract({
        address: contracts.Uniswap.UniswapV2FactoryABI,
        abi: UniswapV2FactoryABI,
        functionName: "getPair",
        args: [tokenA, tokenB, stable],
      });

      const searchResult = await getPairsInfo([result], reader);
      if (searchResult) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
      console.log(error);
    }
  }

  public async isPair(tokenA: any, tokenB: any, read: any = null) {
    try {
      const sorted: any = await this.sortTokens(tokenA, tokenB);
      const state: any = [true, false];
      if (sorted && sorted) {
        let pairOne = await this.pairFor(sorted[0], sorted[1], state[0]);
        let pairTwo = await this.pairFor(sorted[0], sorted[1], state[1]);
        let result = await getPairsInfo([pairOne], read);
        let resulttwo = await getPairsInfo([pairTwo], read);

        if (result.length >= 1 || resulttwo.length >= 1) {
          return true;
        } else {
          return false;
        }
      }
    } catch (error) {
      return null;
    }
    //ru tilll we find whats stable or not
  }

  public async sortTokens(tokenA: any, tokenB: any) {
    const sorted = await viemClient.readContract({
      address: contracts.Uniswap.UniswapV2Router,
      abi: UniswapV2RouterABI,
      functionName: "sortTokens",
      args: [tokenA, tokenB],
    });
    return sorted;
  }
  //verfies poool id it s stable or not
  public async pairFor(tokenA: any, tokenB: any, stable: any) {
    const pair: any = await viemClient.readContract({
      address: contracts.Uniswap.UniswapV2Router,
      abi: UniswapV2RouterABI,
      functionName: "pairFor",
      args: [tokenA, tokenB, stable],
    });

    return pair;
  }
  //for stbale explanation:
  // If true → it’s a stable pool (uses the stable-swap curve).
  // If false → it’s a volatile pool (uses the constant product curve).

  //returns array index 0 amount to recive of wht ur buying , index 1 if pool is stable or not we need these for route param in swap
  public async getAmountOut(
    amountIn: any,
    tokenIn: any,
    tokenOut: any,
    reader: any
  ) {
    try {
      //verify the pool exists before trading
      const isPair = await this.isPair(tokenIn, tokenOut, reader);
      if (!isPair) return false;
      const result = await viemClient.readContract({
        address: contracts.Uniswap.UniswapV2Router,
        abi: UniswapV2RouterABI,
        functionName: "getAmountOut",
        args: [amountIn, tokenIn, tokenOut],
      });

      //index 0 quote expected amount without slippage, index1 is pool stable or not to complete this trae important for swapping,
      return result;
    } catch (error) {}
  }
  public async tempBalanceOf(tokenAddress: any) {
    try {
      const balance = await viemClient.readContract({
        address: tokenAddress,
        abi: ERC20ABI,
        functionName: "balanceOf",
        args: [this.wallet],
      });

      return balance;
    } catch (error) {
      return null;
    }
  }

  public async getMainetBalance() {
    try {
      const balance = await viemClient.getBalance({ address: this.wallet });
      return formatEther(balance);
    } catch (error) {}
  }

  public async balanceOfToken(tokenAddress: any) {
    const balance: any = await viemClient.readContract({
      address: tokenAddress,
      abi: ERC20ABI,
      functionName: "balanceOf",
      args: [this.wallet],
    });
    return parseFloat(formatUnits(balance, 18)).toFixed(2);
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

  public async getGaugePartners(reader: any) {
    const partners = await this.partnersSearch();
    const partnerInfo = await getTokensInfo(partners, reader);
    const finalPartnersInfo = await this.getPartnerStats(partnerInfo);
    return finalPartnersInfo;
  }

  public async getPartnerStats(partners: any) {
    for (const partner in partners) {
      const { baseToken }: any = partners[partner];
      const { address }: any = baseToken;
      const partnerDetails = await this.getPartnerDetails(address);
      partners[partner] = { ...partners[partner], partnerDetails };
    }
    return partners;
  }

  public async getPartnerDetails(partner: any) {
    try {
      const boost = await this.viemClient.readContract({
        address: "0x698402021A594515F5a379F6C4E77d3E1F452777",
        abi: DRAGONGAUGEREGISTRYAbi,
        functionName: "getPartnerDetails",
        args: [partner],
      });
      //index 0 name, indx 1 fee share, index 2 proability boost (important), index 3 is partner active
      return boost;
    } catch (error) {
      return 0;
    }
  }

  //getting partners for gauges info we loop until error is met
  public async partnersSearch() {
    const partners = [];
    let currPartner = null;
    let currIndex = 0;
    while (currPartner !== "stop") {
      currPartner = await this.partnerList(currIndex);

      if (currPartner !== "stop") {
        partners.push(currPartner);
        ++currIndex;
      }
    }
    return partners;
  }

  public async findBestPairs(
    maximum: any,
    minimum: any,
    shouldFindBest: any,
    reader: Read
  ) {
    const pairs = await this.pairs();
    console.log("all pairs: ", pairs);
    if (shouldFindBest) {
      const result = await getPairsInfo(pairs, reader);
    }
  }

  public async topFactoryPairs(limit: any) {
    const topPairs = [];
    const pairsFound: any = await this.pairs();
    return pairsFound ? pairsFound.slice(0, limit) : null;
  }
  public async allPairsLength() {
    const length = await viemClient.readContract({
      address: contracts.Uniswap.UniswapV2Factory,
      abi: UniswapV2FactoryABI,
      functionName: "allPairsLength",
      args: [],
    });
    return length;
  }
  public async allPairs(index: any) {
    const found = await viemClient.readContract({
      address: contracts.Uniswap.UniswapV2Factory,
      abi: UniswapV2FactoryABI,
      functionName: "allPairs",
      args: [String(index)],
    });

    return found;
  }

  public async pairs() {
    try {
      const found = await viemClient.readContract({
        address: contracts.Uniswap.UniswapV2Factory,
        abi: UniswapV2FactoryABI,
        functionName: "pairs",
        args: [],
      });

      return found;
    } catch (error) {}
  }

  //read should het all its info and stuff not through frontend frontend should be clean

  public async partnerList(index: any) {
    try {
      const partner = await viemClient.readContract({
        address: "0x698402021A594515F5a379F6C4E77d3E1F452777",
        abi: DRAGONGAUGEREGISTRYAbi,
        functionName: "partnerList",
        args: [BigInt(index)],
      });
      return partner;
    } catch (error) {
      return "stop";
    }
  }
}
