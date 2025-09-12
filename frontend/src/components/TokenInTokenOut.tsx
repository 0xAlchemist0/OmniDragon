import { useEffect, useState } from "react";
import { CiWallet } from "react-icons/ci";
import { FaArrowDown } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import TokenModal from "./TokenModal";

function TokenInTokenOut({ pairs }: any) {
  const [activateIn, setActivateIn] = useState(false);
  const [activateOut, setActivateOut] = useState(false);

  const [tokenIn, setTokenIn] = useState({ amount: null });
  const [tokenOut, setTokenOut] = useState({ amount: null });
  const [tokens, setTokens] = useState({
    in: null,
    out: null,
  });
  const [inAmount, setInAmount] = useState("");

  const [outAmount, setOutAmount] = useState("");
  useEffect(() => {}, [tokenIn, tokenOut]);

  const handleInput = (tokenType: any, input: any) => {
    console.log("input: ", input);
    if (tokenType === "in") {
      setInAmount(input);
    } else {
      setOutAmount(input);
    }
  };

  function TokenSelector({ tokenType, activate, setActivate }: any) {
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
          <div>
            <TokenModal
              activate={activate}
              setActivate={setActivate}
              pairs={pairs}
              setTokenIn={setTokenIn}
              setTokenOut={setTokenOut}
              tokenType={tokenType}
              tokens={tokens}
              setTokens={setTokens}
            >
              <div className="border flex gap-2 p-1 w-20  rounded-md border-gray-700 bg-gray-800  ">
                <span className="m-auto flex gap-2  overflow-hidden">
                  <img
                    src={
                      tokens[tokenType]?.info?.imageUrl ||
                      "https://cdn-icons-png.flaticon.com/512/14446/14446160.png"
                    }
                    alt=""
                    className="size-4 mt-0.5 rounded-full border"
                  />

                  <h1 className="mt-1 text-[10px] text-white font-bold">
                    {tokens[tokenType]?.baseToken?.name || "ETH"}
                  </h1>
                  <IoIosArrowDown className="text-gray-600 mt-1.5" />
                </span>
              </div>
            </TokenModal>
          </div>
          <div className="  text-gray-600">
            <input
              type="text"
              className="  w-20 text-xl text-right text-white"
              placeholder="0"
              value={tokenType === "in" ? inAmount : outAmount}
              onChange={(e) => {
                handleInput(tokenType, e.target.value);
              }}
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
        <TokenSelector
          tokenType="in"
          activate={activateOut}
          setActivate={setActivateOut}
        />
        <div className="m-auto">
          <div className="border p-1 rounded-full bg-gray-800 text-gray-600">
            <FaArrowDown />
          </div>
        </div>
        <TokenSelector
          tokenType="out"
          activate={activateIn}
          setActivate={setActivateIn}
        />
      </div>

      <div className="mt-5">
        <SubmitTXBTN />
      </div>
      <div></div>
    </div>
  );
}

export default TokenInTokenOut;
