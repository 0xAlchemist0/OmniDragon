import { useEffect, useState } from "react";
import { useTxService } from "../state/TxServiceProvider";

function LiquidityHub() {
  const [tokenA, setTokenA] = useState(null);
  const [tokenB, setTokenB] = useState(null);
  const [selection, setSelection] = useState(0);
  const { reader, writer }: any = useTxService();
  const [topPairs, setTopPairs] = useState(null);
  const options = [
    { option: "Swap" },
    { option: "Add Liquidity" },
    { option: "Create Pair" },
  ];

  useEffect(() => {
    getSomePairs(12);
  }, []);

  async function getSomePairs(limit: any) {
    const pairsFound = await reader.allPairs(limit);
    setTopPairs(pairsFound);
  }

  function LiquidityAdd() {
    return <></>;
  }

  function LiquidityPairCreate() {
    return <></>;
  }
  function LiquiditySwap() {
    return (
      <span className="flex justify-between">
        <h1>hello</h1>
        <h1>hello</h1>
      </span>
    );
  }

  return (
    <div className="p-3 w-[90%] m-auto">
      <span className="border flex gap-4 text-white p-3 text-sm">
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
      <div className="bg-gray-800 border-gray-600 p-3 m-auto  rounded-md text-white">
        {selection == 0 && <LiquiditySwap />}
        {selection == 1 && <LiquidityAdd />}
        {selection == 0 && <LiquidityPairCreate />}
      </div>
    </div>
  );
}

export default LiquidityHub;

// stable (bool) – A boolean flag (true or false) indicating whether the pool is a stable pair (like USDC/USDT) with low-slippage stable swaps, or a regular volatile pair (like ETH/USDC).
