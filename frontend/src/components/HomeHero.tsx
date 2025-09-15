function HomeHero() {
  function HeroSpan(props: any) {
    const { top, bottom }: any = props;
    return (
      <span className="grid grid-rows-1 ">
        <h1 className="text-3xl font-bold text-[#ff6b7a]">{top}</h1>
        <h1 className="text-sm text-stone-300">{bottom}</h1>
      </span>
    );
  }
  return (
    <div className="border  border-gray-800 rounded-lg text-center md:w-[40%] md:m-auto p-10 text-white">
      <h1 className=" text-4xl font-bold bg-gradient-to-r from-[#e2ca2f] via-white to-[#db5656] bg-clip-text text-transparent">
        Red Dragon
      </h1>
      <h1 className="text-xl/9 mt-10  font-bold w-[90%] m-auto ">
        Next-Generation Cross-Chain Protocol
      </h1>
      <h1 className="text-lg/8 mt-5 font-light text-stone-300">
        Revolutionary ERC-20 compatible token protocol built on LayerZero V2,
        delivering secure cross-chain functionality with cryptographically
        verifiable randomness through Chainlink VRF integration.
      </h1>
      <div className=" grid grid-flow-col gap-4 mt-10">
        <HeroSpan top={"5+"} bottom={"Supported Chains"} />
        <HeroSpan top={"100%"} bottom={"Verifiable"} />
        <HeroSpan top={"24/7"} bottom={"Active Protocol"} />
      </div>
      <div className="mt-15 grid grid-flow-row gap-5 w-75 m-auto">
        <button className="border border-yellow-900 font-extrabold  rounded-xl p-6 bg-gradient-to-r from-yellow-500 to-red-500 text-white">
          Explore Documentation
        </button>
        <button className="border border-stone-700 rounded-xl p-6">
          View on Gthub
        </button>
      </div>
    </div>
  );
}

export default HomeHero;
