function HomeMidSection() {
  function Card(props: any) {
    const { title, content }: any = props;
    return (
      <div className="border border-gray-800  rounded-xl bg-[#0f172afa] p-10">
        <h1 className="text-xl font-bold">{title}</h1>
        <h1 className="mt-3 text-lg text-gray-400 font-light">{content}</h1>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-3xl font-bold text-white text-center mt-10 ">
        Built for the future of defi
      </h1>
      <div className="grid grid-flow-row gap-5 mt-10">
        <Card
          title={"Cross-Chain Architechture"}
          content={
            "Seamless token transfers across Sonic, Ethereum, Arbitrum, Base, and Avalanche networks powered by LayerZero V2 infrastructure."
          }
        />
        <Card
          title={"Verifiable Randomness"}
          content={
            "Cryptographically secure randomness through Chainlink VRF integration, ensuring transparent and fair lottery mechanism."
          }
        />{" "}
        <Card
          title={"Enterprise Security"}
          content={
            "Multi-layered protection with emergency controls, audited smart contracts, and role-based access control for maximum security."
          }
        />
      </div>
    </div>
  );
}

export default HomeMidSection;
