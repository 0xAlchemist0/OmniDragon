import { useWallets } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import CreatePair from "../components/CreatePair";
import TokenInTokenOut from "../components/TokenInTokenOut";
import { getPairsInfo, searchDexscreener } from "../lib/dexscreener-handler";
import { useTxService } from "../state/TxServiceProvider";
function LiquidityHub() {
  const [tokenA, setTokenA] = useState(null);
  const [tokenB, setTokenB] = useState(null);
  const [selection, setSelection] = useState(0);
  const { reader, writer }: any = useTxService();
  const [topPairs, setTopPairs] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [helperInput, setHelperInput] = useState(null);
  const { wallets } = useWallets();
  const options = [{ option: "Swap" }, { option: "Create Pair" }];

  useEffect(() => {
    getSomePairs(14);
  }, [wallets, reader, writer]);

  useEffect(() => {
    const searchPair = async () => {
      const chainName = await reader.getChainName;
      if (helperInput) {
        const searchResults: any = await searchDexscreener(
          helperInput,
          chainName
        );
        setSearchResults(searchResults);
      }
    };

    if (helperInput) {
      searchPair();
    }
  }, [helperInput]);

  async function getSomePairs(limit: any) {
    const swapXPairs: any = await reader.topFactoryPairs(limit);
    const PairsInfo: any = await getPairsInfo(swapXPairs, reader);
    setTopPairs(PairsInfo);
    // setTopPairs(pairsFound);
  }

  function LiquidityAdd() {
    return <></>;
  }

  function LiquidityPairCreate() {
    return (
      <div>
        <div className="mt-5">
          <CreatePair
            pairs={topPairs}
            input={helperInput}
            setInput={setHelperInput}
            searchResults={searchResults}
          />
        </div>
      </div>
    );
  }
  function LiquiditySwap() {
    return (
      <div>
        <div className="mt-5">
          {/* echange component  */}
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
                console.log("current tab index: ", index);
                setSelection(index);
              }}
            >
              {item.option}
            </button>
          );
        })}
      </span>
      {selection === 0 && (
        <div className="bg-gray-900 border-gray-600 p-5 m-auto  rounded-md text-white">
          {selection == 0 && <LiquiditySwap />}
        </div>
      )}
      {selection === 1 ? (
        <div className="bg-gray-900 border-gray-600 p-1  m-auto  rounded-md text-white">
          {selection == 1 && <LiquidityPairCreate />}
        </div>
      ) : null}
    </div>
  );
}

export default LiquidityHub;

// stable (bool) – A boolean flag (true or false) indicating whether the pool is a stable pair (like USDC/USDT) with low-slippage stable swaps, or a regular volatile pair (like ETH/USDC).
