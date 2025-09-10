import { useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import TokenInTokenOut from "../components/TokenInTokenOut";
import { getPairsInfo } from "../lib/dexscreener-handler";
import { useTxService } from "../state/TxServiceProvider";
function LiquidityHub() {
  const [tokenA, setTokenA] = useState(null);
  const [tokenB, setTokenB] = useState(null);
  const [selection, setSelection] = useState(0);
  const { reader, writer }: any = useTxService();
  const [topPairs, setTopPairs] = useState(null);
  const { wallets } = useWallets();
  const options = [
    { option: "Swap" },
    { option: "Add Liquidity" },
    { option: "Create Pair" },
  ];

  useEffect(() => {
    console.log("Reader Props :", reader);
    console.log("Writer Props: ", writer);
    getSomePairs(20);
  }, [wallets, reader, writer]);

  async function getSomePairs(limit: any) {
    const swapXPairs: any = await reader.topFactoryPairs(limit);
    console.log(swapXPairs);
    const PairsInfo: any = await getPairsInfo(swapXPairs, reader);
    setTopPairs(PairsInfo);
    // setTopPairs(pairsFound);
  }

  function LiquidityAdd() {
    return <></>;
  }

  function LiquidityPairCreate() {
    return <></>;
  }
  function LiquiditySwap() {
    return (
      <div>
        <div className="mt-5">
          <TokenInTokenOut pairs={topPairs} />
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 w-[90%] md:w-[600px] m-auto">
      <span className=" flex gap-4 text-white p-3 text-sm">
        {options.map((item: any, index: any) => {
          return (
            <button
              className="hover:text-gray-600"
              key={index}
              onClick={() => {
                setSelection(index);
              }}
            >
              {item.option}
            </button>
          );
        })}
      </span>
      <div className="bg-gray-900 border-gray-600 p-5 m-auto  rounded-md text-white">
        {selection == 0 && <LiquiditySwap />}
        {selection == 1 && <LiquidityAdd />}
        {selection == 0 && <LiquidityPairCreate />}
      </div>
    </div>
  );
}

export default LiquidityHub;

// stable (bool) – A boolean flag (true or false) indicating whether the pool is a stable pair (like USDC/USDT) with low-slippage stable swaps, or a regular volatile pair (like ETH/USDC).
