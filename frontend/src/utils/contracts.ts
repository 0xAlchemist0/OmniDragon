const contracts: any = {
  // omni is the main token
  CREATE2FactoryWithOwnership: "0xAA28020DDA6b954D16208eccF873D79AC6533833",
  //this is where we get the list of partners
  Registry: "0x6940aDc0A505108bC11CA28EefB7E3BAc7AF0777",

  Tokens: {
    omniDRAGON: "0x69dc1c36f8b26db3471acf0a6469d815e9a27777",
    redDRAGON: "0x69320eb5b9161a34cb9cdd163419f826691a1777",
    veDRAGON: "0x69492C71d7A3caf0277E238D9D4305c6af930777",
  },
  Odos: {
    Router: "0xaC041Df48dF9791B0654f1Dbbf2CC8450C5f2e9D",
  },
  Uniswap: {
    // 0x05c1be79d3aC21Cc4B727eeD58C9B2fF757F5663
    UniswapV2Factory: "0x05c1be79d3aC21Cc4B727eeD58C9B2fF757F5663",
    UniswapV2Router: "0x1D368773735ee1E678950B7A97bcA2CafB330CDc",
  },
  Pool: {
    UniswapV2LP: "0x33503bc86f2808151a6e083e67d7d97a66dfec11",
  },
  Lottery: {
    Oracle: "0x69A366F17b78fA60795d64B348bBc41197270777",
    OmniDragonPrimaryOracle: "0x175c9571771894e151317e80d7b4434e1f583d59",
    OmniDragonLotteryManager: "0x69a6a2813c2224bbc34b3d0bf56c719de3c34777",
    OmniDragonJackpotVault: "0x69ec31a869c537749af7fd44dd1fd347d62c7777",
    DragonFeeMHelper: "0xc47c9cabae8a6425f01f5769eda470e1d01e9fbf",
  },
  VRF: {
    ChainlinkVRFIntegratorV2_5_Sonic:
      "0x2BD68f5E956ca9789A7Ab7674670499e65140Bd5",
    OmniDragonVRFConsumerV2_5_Arbitrum:
      "0x697a9d438a5b61ea75aa823f98a85efb70fd23d5",
  },
  RevenueAndBribes: {
    veDRAGONRevenueDistributor: "0x6960cd77b3628b77d06871f114cde980434fa777",
    PartnerBribeDistributor: "0xbc68de87eC01f4c70Cd0949f94b3E97aa115C9a1",
  },
  Gauge: {
    GaugeController: "0x69b0d9c5e74413a7d2c7d3d680fe1289c311e777",
    DragonGaugeRegistry: "0x698402021a594515f5a379f6c4e77d3e1f452777",
  },
  Voting: {
    VotingPowerCalculator: "0x27705dd6fa47326e1096770fd33cf4798d785ac1",
    veDRAGONBoostManager: "0x620893426c6737e6507a92d060a0a7cd8fb7c1f5",
  },
  Libraries: {
    veDRAGONMath: "0xD835C0D651dA5AD6c3f0b60a12a688E45A1B92fC",
  },
  Partners: {
    GOOD: "0xb5a43c1C8B346B9C6FD8E4Afb8871c940B36e279",
    ffDRAGON: "0x40f531123bce8962d9cea52a3b150023bef488ed",
  },

  mainnet: {
    sonic: "0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38",
  },
};

export default contracts;

// So the main contracts will be

// Registry
// Token
// Oracle
// Lottery
// VRF
// JackpotVault
// Multisig Wallet  (temporary to be replaced by veDRAGONRevenueDistributor)
///since shadow routes after completing swap do the way to find the best routes based on the tree dexes
