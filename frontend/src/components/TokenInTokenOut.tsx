import { TokenETH } from "@web3icons/react";
import { useEffect, useState } from "react";
import { CiWallet } from "react-icons/ci";
import { FaArrowDown } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import TokenModal from "./TokenModal";

function TokenInTokenOut({ pairs }: any) {
  const [activate, setActivate] = useState(false);
  const [tokenIn, setTokenIn] = useState("ETH");
  const [tokenOut, setTokenOut] = useState("ETH");

  useEffect(() => {
    console.log("In:", tokenIn);
    console.log("Out:", tokenOut);
  }, [tokenIn, tokenOut]);

  function TokenSelector() {
    return (
      <div>
        <span className="flex justify-between text-xs mb-2 w-95 md:w-[100%]  m-auto">
          <h1 className=" text-white">Exchange</h1>
          <span className="flex gap-2">
            <CiWallet className="text-gray-500 text-sm " />

            <h1>{"0.00 ETH"}</h1>
          </span>
        </span>
        <div className="border rounded-xl flex justify-between border-gray-800 bg-gray-900 p-3">
          <div className="border rounded-xl font-bold h-10 mt-auto mb-auto p-2.5 flex gap-2 text-sm bg-gray-800 border border-gray-600">
            <div className="flex gap-2">
              <h1 className="">
                <TokenETH variant="branded" size="20" className="mb-2" />
              </h1>{" "}
              <h1 className="">ETH</h1>
            </div>
            <MdKeyboardArrowDown className="mt-1 " />
          </div>
          <div className="  text-gray-600">
            <input
              type="text"
              className="w-10  w-20 text-xl text-right"
              placeholder="0"
            />
            <h1 className="text-right">~$0.00</h1>
          </div>
        </div>
      </div>
    );
  }

  function SubmitTXBTN() {
    return (
      <div>
        <button className="border font-bold text-sm w-full p-2 rounded-md bg-gray-800 h-12 border-gray-600">
          Swap
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-rows-1 gap-3">
        <TokenSelector />
        <div className="m-auto">
          <div className="border p-1 rounded-full bg-gray-800 text-gray-600">
            <FaArrowDown />
          </div>
        </div>
        <TokenSelector />
      </div>

      <div className="mt-5">
        <SubmitTXBTN />
      </div>
      <div>
        <TokenModal
          activate={activate}
          setActivate={setActivate}
          pairs={pairs}
          setTokenIn={setTokenIn}
          setTokenOut={setTokenOut}
        />
      </div>
    </div>
  );
}

export default TokenInTokenOut;
