import { Box, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CiWallet } from "react-icons/ci";
import { FaArrowDown, FaSlidersH } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { getDefaultPairs } from "../lib/dexscreener-handler";
import { useTxService } from "../state/TxServiceProvider";
import TokenModal from "./TokenModal";
import TxConfirm from "./TxConfirm";

function TokenInTokenOut({ pairs }: any) {
  interface Token {
    in?: { baseToken: { address: string } } | null;
    out?: { baseToken: { address: string } } | null;
  }
  const [activateIn, setActivateIn] = useState(false);
  const [activateOut, setActivateOut] = useState(false);
  const { reader, writer } = useTxService();
  const [tokenIn, setTokenIn] = useState({ amount: null });
  const [tokenOut, setTokenOut] = useState({ amount: null });
  const [verified, setVerified] = useState(true);
  const [balances, setBalances] = useState({ in: 0, out: 0 });
  const [tokens, setTokens] = useState<Token | null>({
    in: null,
    out: null,
  });
  const [inAmount, setInAmount] = useState("");
  // minutes so zero means deadline to swap is now
  const [deadline, setDeadLine] = useState("0");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [outAmount, setOutAmount] = useState("");
  const [quote, setQuote] = useState(null);
  const [slippage, setSlippage] = useState("0.12");
  const [stable, setStable] = useState(null);
  useEffect(() => {
    const getDefault = async () => {
      const chainName = await reader.getChainName();
      const result: any = await getDefaultPairs(chainName);
      setTokens(result);
    };
    getDefault();
  }, []);
  useEffect(() => {
    if (tokens) {
      if (tokens.in && tokens.out) {
        const getBalances = async () => {
          const balanceIn = await reader.balanceOfToken(
            tokens.in.baseToken.address
          );
          const balanceOut = await reader.balanceOfToken(
            tokens?.out.baseToken.address
          );

          setBalances({ in: balanceIn, out: balanceOut });
        };
        getBalances();
      }
    }
  }, [tokens]);

  useEffect(() => {
    //removes and shows confirmation
    if (showConfirmation) {
      setActivateIn(false);
      setActivateOut(false);
    }
  }, [showConfirmation]);

  useEffect(() => {
    const parsed = parseInt(inAmount);
    //when u throw errror on frontend website stops working
    const obtainQuote = async () => {
      await reader.getMainetBalance();
      const result = await reader.getAmountOut(
        inAmount,
        tokens?.in?.baseToken.address,
        tokens?.out?.baseToken.address,
        reader
      );

      setQuote(result);
      return result;
    };
    if (!tokens?.in || !tokens?.out || parsed) {
      obtainQuote();
    } else {
    }
  }, [inAmount, tokens]);

  useEffect(() => {
    if (tokens && tokens.in && tokens.out) {
      const findStablemness = async () => {
        const simulatedQuote = await this.getAmountOut();
      };
    }
  }, [inAmount, outAmount, tokens]);

  const handleTxConfirmation = () => {
    if (tokens) {
      if (tokens.in && tokens.out && tokenIn && tokenOut && quote) {
        setShowConfirmation(true);
      }
    }
  };

  const handleInput = (tokenType: any, input: any) => {
    if (tokenType === "in") {
      setInAmount(input);
    } else {
      setOutAmount(input);
    }
  };

  function TokenSelector({ tokenType, activate, setActivate }: any) {
    function getUSD() {
      const priceUsd: any = tokens[tokenType]?.priceUsd;
      if (tokenType === "in") {
        if (quote && priceUsd) {
          return parseFloat(Number(inAmount) * parseFloat(priceUsd)).toFixed(2);
        }
      } else {
        if (priceUsd && quote) {
          return parseFloat(parseFloat(priceUsd) * Number(quote[0])).toFixed(2);
        }
      }
    }
    return (
      <div>
        <span className="flex justify-between text-xs mb-2 w-95 md:w-[100%]  m-auto">
          <h1 className=" text-white">Exchange</h1>
          <span className="flex gap-2">
            <CiWallet className="text-gray-500 text-sm " />

            <h1
              onClick={() => {
                setInAmount(String(balances[[tokenType]]));
              }}
            >
              {balances[tokenType]}
              {tokens[tokenType] ? tokens[tokenType]?.baseToken.symbol : ""}
            </h1>
          </span>
        </span>
        <div className="border rounded-xl flex justify-between border-gray-800 bg-gray-700 p-3">
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
              setVerified={setVerified}
              setStable={setStable}
            >
              <div className="border   gap-2 p-1 w-25   rounded-md border-gray-700 bg-gray-500  ">
                <div className=" flex justify-between   ">
                  <div className="flex gap-2">
                    <img
                      src={
                        tokens[tokenType]?.info?.imageUrl ??
                        "https://media.tenor.com/SsTnMMMQdkQAAAAe/confusion-emoji.png"
                      }
                      alt=""
                      className="size-4 mt-0.5 rounded-full border"
                    />

                    <h1 className="mt-1 text-[10px] text-white font-bold text-nowrap">
                      {tokens[tokenType]?.baseToken?.symbol || "ETH"}
                    </h1>
                  </div>
                  <IoIosArrowDown className="text-gray-600 mt-1.5 text-right  " />
                </div>
              </div>
            </TokenModal>
          </div>
          <div className="  text-gray-600">
            <input
              type="text"
              className="  w-20 text-xl text-right  w-full text-white outline-0"
              placeholder="0"
              value={
                tokenType === "in"
                  ? inAmount
                  : quote
                  ? String(Number(Number(quote[0])))
                  : null
              }
              onChange={(e) => {
                handleInput(tokenType, e.target.value);
              }}
            />
            <h1 className="text-right">~${getUSD()}</h1>
          </div>
        </div>
      </div>
    );
  }

  function SubmitTXBTN({ action }: any) {
    return (
      <div>
        {!verified && (
          <h1 className="text-red-500 font-mono mb-5 text-xs text-center">
            Pair Not found or insufficient liquidity
          </h1>
        )}
        <button
          className="border font-bold text-sm w-full p-2 rounded-md bg-gray-800 h-12 border-gray-600"
          onClick={() => {
            if (verified) {
              handleTxConfirmation();
            }
          }}
        >
          Swap
        </button>
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex justify-end mb-2">
        <SettingsModal />
      </div>
      <div className="grid grid-rows-1 gap-3">
        <TxConfirm
          tokenIn={tokens?.in}
          tokenOut={tokens?.out}
          inAmount={inAmount}
          outAmount={outAmount}
          quote={quote}
          setShowConfirmation={setShowConfirmation}
          showConfirmation={showConfirmation}
          slippage={slippage}
          deadline={deadline}
          stable={stable}
        />
        <TokenSelector
          tokenType="in"
          activate={activateIn}
          setActivate={setActivateIn}
        />
        <div className="m-auto ">
          <button
            className="border p-1 rounded-full bg-gray-800 text-gray-600 "
            onClick={() => {
              if (tokens?.in && tokens?.out) {
                setTokens({ in: tokens.out, out: tokens.in });
              }
            }}
          >
            <FaArrowDown className="h" />
          </button>
        </div>
        <TokenSelector
          tokenType="out"
          activate={activateOut}
          setActivate={setActivateOut}
        />
      </div>

      <div className="mt-5">
        <SubmitTXBTN action={writer.swapExactTokensforTokens} />
      </div>
      <div></div>
    </div>
  );

  function SettingsModal() {
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "70%",
      bgcolor: "#111827",
      border: "2px solid #000",
      borderRadius: "15px",
      boxShadow: 24,
      p: 4,
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <div>
        <FaSlidersH onClick={handleOpen} className="text-gray-700" />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Swap Settings
            </Typography>
            <div className="grid grid-flow-row">
              <div className="flex justify-between mt-3">
                <h1 className="text-sm mt-1.5">Set Slippage</h1>
                <span className="border border-gray-600 p-1 flex justify-between rounded-full gap-2">
                  <button
                    className={`border-0 rounded-full w-10 text-xs text-white font-bold ${
                      slippage === "0.05" ? "bg-orange-500" : null
                    }`}
                    onClick={() => {
                      setSlippage("0.05");
                    }}
                  >
                    <h1 className="mt-0.5 ms-0.5">0.5%</h1>
                  </button>
                  <button
                    className={`border-0 rounded-full w-10 text-xs text-white font-bold ${
                      slippage === "0.01" ? "bg-orange-500" : null
                    }`}
                    onClick={() => {
                      setSlippage("0.01");
                    }}
                  >
                    <h1 className="mt-0.5 ms-0.5">1%</h1>
                  </button>
                  <span className="border-0 bg-gray-800  rounded-full w-15">
                    <input
                      type="text"
                      className="w-15 rounded-full"
                      onClick={() => {
                        setSlippage("0");
                      }}
                    />
                  </span>{" "}
                </span>
              </div>
              <div className="flex justify-between mt-3">
                {/* ?input calculate din minutes */}
                <h1 className="text-sm mt-1.5 text-xs">Deadline Minutes</h1>
                <button className="border border-gray-600 p-1 flex justify-between rounded-full gap-2">
                  <button
                    className={`border-0 rounded-full w-10 text-xs text-white font-bold ${
                      deadline === "0" ? "bg-orange-500" : null
                    }`}
                    onClick={() => {
                      setDeadLine("0");
                    }}
                  >
                    <h1 className="mt-0.5 ms-0.5">Now</h1>
                  </button>
                  <span className="border-0 bg-gray-800  rounded-full w-15">
                    <input
                      type="text"
                      className="w-15 rounded-full"
                      onClick={() => {
                        setDeadLine("-1");
                      }}
                      value={deadline}
                      onChange={(e) => {
                        setDeadLine(e.target.value);
                      }}
                    />
                  </span>{" "}
                </button>
              </div>
              <div className="mt-5">
                <button className="border w-full p-1 rounded-md border-gray-600 bg-gray-700 text-white ">
                  Apply Changes
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    );
  }
}

export default TokenInTokenOut;
