import { createPublicClient, formatUnits, http } from "viem";
import { viemClient } from "../utils/ViemClient";
import { DRAGONGAUGEREGISTRYAbi } from "../utils/abi/DRAGONGAUGEREGISTRYAbi";
import ERC20ABI from "../utils/abi/ERC20ABI";
import UniswapV2FactoryABI from "../utils/abi/UniswapV2FactoryABI";
import UniswapV2RouterABI from "../utils/abi/UniswapV2RouterABI";
import { veDRAGONAbi } from "../utils/abi/veDRAGONAbi";
import contracts from "../utils/contracts";
import { findChain } from "./chainFinder";
import { findChainName } from "./chainMap";
import { getTokensInfo } from "./dexscreener-handler";
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
    owner: any,
    spender: any,
    spenderAbi: any,
    amountToTransact: string
  ) {
    const currentAllowance: any = await viemClient.readContract({
      address: spender,
      abi: spenderAbi,
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

  //returns array index 0 amount to recive of wht ur buying , index 1 if pool is stable or not we need these for route param in swap
  public async getAmounOut(amountIn: any, tokenIn: any, tokenOut: any) {
    try {
      const result = await viemClient.readContract({
        address: contracts.Uniswap.UniswapV2Router,
        abi: UniswapV2RouterABI,
        functionName: "getAmountOut",
        args: [amountIn, tokenIn, tokenOut],
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  public async balanceOfnew(tokenAddress: any) {
    const balance: any = await viemClient.readContract({
      address: tokenAddress,
      abi: ERC20ABI,
      functionName: "balanceOf",
      args: [this.wallet],
    });
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

  public async topFactoryPairs(limit: any) {
    const topPairs = [];
    console.log("doing");

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
    } catch (error) {
      console.log(error);
    }
  }

  //read should het all its info and stuff not through frontend frontend should be clean

  public async partnerList(index: any) {
    console.log("index: ", index);
    try {
      const partner = await viemClient.readContract({
        address: "0x698402021A594515F5a379F6C4E77d3E1F452777",
        abi: DRAGONGAUGEREGISTRYAbi,
        functionName: "partnerList",
        args: [BigInt(index)],
      });
      return partner;
    } catch (error) {
      console.log("EDDKMDDMKDMKDMKDKM ", error);
      return "stop";
    }
  }
}
