import { useState } from "react";
import { CiSettings } from "react-icons/ci";
import { FaSwimmingPool, FaWallet } from "react-icons/fa";
import { HiArrowsUpDown } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { LuArrowDownUp } from "react-icons/lu";
import useNewBalnces from "../../state/useNewBalances";
import usePairs from "../../state/usePairs";
import useSwapProvider from "../../state/useSwapProvider";
import NewTokenModal from "./NewTokenModal";
function SwapPage() {
  type Token = {
    address: string;
    symbol: string;
    decimals: number;
    image?: string;
  };
  const [tokens, setTokens] = useState<{ in: Token | null; out: Token | null }>(
    { in: null, out: null }
  );
  const [tokenCheckList, setTokenCheckList] = useState([]);
  const [inAmount, setInAmount] = useState<any | null>(0);
  const [searchInput, setSearchInput] = useState("");
  const swapProvider = useSwapProvider(tokens.in, tokens.out, inAmount);
  const balances = useNewBalnces(tokenCheckList);
  const pairs = usePairs(searchInput);
  function SwapSettings() {
    return (
      <div className="flex justify-between">
        <Tabs />
        <span className="">
          <button className="border rounded-full p-1 border-gray-500 bg-gray-800 text-gray-300 text-lg hover:bg-gray-800/50 hover:text-gray-300/50 hover:cursor-pointer">
            <CiSettings />
          </button>
        </span>
      </div>
    );
  }

  function Tabs() {
    return (
      <span className="flex gap-5 mt-1">
        {" "}
        <span className="flex gap-1  border rounded-full px-2 bg-gray-800 border-gray-600 text-white hover:cursor-pointer hov hover:text-gray-300/50">
          <HiArrowsUpDown className=" text-sm mt-0.5" />

          <h1 className="text-xs mt-0.5 font-light">Swap</h1>
        </span>
        <span className="flex gap-1 text-white hover:cursor-pointer  hover:text-gray-300/50">
          <FaSwimmingPool className=" text-sm mt-0.5" />

          <h1 className="text-sm  font-light">Create</h1>
        </span>
      </span>
    );
  }

  function ExcecutionBTN() {
    return (
      <button className="mt-5 border w-full font-bold hover:bg-slate-800/50 hover:cursor-pointer p-2.5 rounded-lg border-gray-800 bg-slate-800 text-white">
        Swap Asset
      </button>
    );
  }

  function Selector({ image }: any) {
    return (
      <div className="mt-4 p-5 border rounded-lg border-gray-600 bg-gray-800/60 grid grid-rows-1 gap-1">
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="0.00"
            className="text-2xl text-gray-300 font-bold outline-none w-60"
          />
          <NewTokenModal pairs={pairs || []}>
            <span className={`${image && "flex"} text-xs font-light`}>
              Select token
            </span>
            <IoIosArrowDown className="mt-[-1.5px] text-gray-300 font-bold text-md" />
          </NewTokenModal>
        </div>
        <div className="flex justify-between">
          <h1 className="text-gray-600 mt-2">$~</h1>
          <span className="flex text-gray-600 mt-2.5 gap-2 ">
            <FaWallet className="mt-1" />
            <h1>0.00</h1>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 border w-[90%] m-auto mt-4 rounded-md bg-slate-900 border-slate-900">
      <SwapSettings />
      <div className="grid grid-flow-row ">
        <Selector image={""} />
        <button className="flex justify-center text-2xl font-bold text-gray-500 mt-3 hover:cursor-pointer">
          <LuArrowDownUp />
        </button>
        <Selector image={""} />
      </div>

      <ExcecutionBTN />
    </div>
  );
}

export default SwapPage;
