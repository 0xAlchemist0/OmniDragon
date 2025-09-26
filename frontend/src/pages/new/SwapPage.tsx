import { CiSettings } from "react-icons/ci";
import { FaSwimmingPool, FaWallet } from "react-icons/fa";
import { HiArrowsUpDown } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { LuArrowDownUp } from "react-icons/lu";
function SwapSettings() {
  return (
    <div className="flex justify-between">
      <Tabs />
      <span className="">
        <button className="border rounded-full p-1 border-gray-500 bg-gray-800 text-gray-300 text-lg">
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
      <span className="flex gap-1">
        <HiArrowsUpDown className="text-white text-sm mt-0.5" />

        <h1 className="text-sm text-white font-light">Swap</h1>
      </span>
      <span className="flex gap-1">
        <FaSwimmingPool className="text-white text-sm mt-0.5" />

        <h1 className="text-sm text-white font-light">Create</h1>
      </span>
    </span>
  );
}

function ExcecutionBTN() {
  return (
    <button className="mt-5 border w-full p-2.5 rounded-lg border-gray-800 bg-slate-800 text-white">
      Connect Wallet
    </button>
  );
}

function Selector({ image }) {
  return (
    <div className="mt-4 p-5 border rounded-lg border-gray-600 bg-gray-800/60 grid grid-rows-1 gap-1">
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="0.00"
          className="text-2xl text-gray-600 font-bold outline-none w-60"
        />
        <button className="border p-2 text-nowrap rounded-lg flex gap-1.5 border-gray-600 bg-gray-800/90 text-white ">
          <span className={`${image && "flex"}`}></span>
          <IoIosArrowDown className="mt-[2px] text-gray-300 font-bold text-md" />
        </button>
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

function SwapPage() {
  return (
    <div className="p-5 border w-[90%] m-auto mt-4 rounded-md bg-slate-900 border-slate-900">
      <SwapSettings />
      <div className="grid grid-flow-row ">
        <Selector image={""} />
        <div className="flex justify-center text-2xl font-bold text-gray-500 mt-3">
          <LuArrowDownUp />
        </div>
        <Selector image={""} />
      </div>

      <ExcecutionBTN />
    </div>
  );
}

export default SwapPage;
