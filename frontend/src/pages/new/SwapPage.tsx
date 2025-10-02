import { Box, Fade, IconButton, Popper, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CiSettings } from "react-icons/ci";
import { FaSwimmingPool, FaWallet } from "react-icons/fa";
import { HiArrowsUpDown } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import { LuArrowDownUp } from "react-icons/lu";
import { useTxService } from "../../state/TxServiceProvider";
import useNewBalnces from "../../state/useNewBalances";
import usePairs from "../../state/usePairs";
import useSwapProvider from "../../state/useSwapProvider";
import NewTokenModal from "./NewTokenModal";
import NewTxConfirmModal from "./NewTxConfirmModal";
function SwapPage() {
  type Token = {
    address: string;
    symbol: string;
    decimals: number;
    image?: string;
  };
  const [tokens, setTokens] = useState<{ in: Token | null; out: Token | null }>(
    { in: { address: null }, out: { address: null } }
  );
  const { reader, writer } = useTxService();
  const [tokenCheckList, setTokenCheckList] = useState([]);
  const [amounts, setAmounts] = useState<any | null>(0);
  const [searchInput, setSearchInput] = useState<any | null>("");
  const [confirmTX, setConfirmTX] = useState(false);
  //default slippage 5%
  const [slippage, setSlippage] = useState("5");
  const quoteProvider = useSwapProvider(
    tokens.in.address,
    tokens.out.address,
    amounts.in,
    slippage
  );
  const [txResults, setTxResults] = useState(null);
  const balances = useNewBalnces(tokenCheckList);
  const pairs = usePairs(searchInput, setTokens);
  function SwapSettings() {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((previousOpen) => !previousOpen);
    };
    useEffect(() => {
      console.log("slippage chnaged: ", slippage);
    }, [slippage]);
    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? "transition-popper" : undefined;

    return (
      <div className="flex justify-between">
        <h1 className="font-bold text-gray-600 text-md">Swap Tokens</h1>
        <button
          aria-describedby={id}
          type="button"
          onClick={handleClick}
          className="border rounded-full p-1 border-gray-500 bg-gray-800 text-gray-300 text-lg hover:bg-gray-800/50 hover:text-gray-300/50 hover:cursor-pointer"
        >
          <CiSettings />
        </button>
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          placement="bottom-start"
          transition
          className=""
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Box
                sx={{
                  border: 1,
                  p: 1,
                  backgroundColor: "oklch(27.9% 0.041 260.031)",
                  borderColor: "oklch(27.9% 0.041 260.031)",
                  color: "white",
                }}
              >
                <div className="grid grid-rows-1 gap-2">
                  <div className="">
                    <h1>Custom Slippage</h1>
                  </div>

                  <div className="p-2">
                    <h1 className="text-sm">Slippage</h1>
                    <input
                      type="text"
                      placeholder="Custom Slippage"
                      className="border p-2 rounded-md bg-gray-800 border-gray-900 mt-2"
                      onChange={(e) => {
                        if (Number(e.target.value)) {
                          setSlippage(e.target.value);
                        }
                      }}
                    />
                    <div className="mt-3 grid grid-cols-3 gap-1 w-30 text-sm">
                      <button
                        className="border text-center rounded-md border-gray-600 text-gray-400 px-2"
                        onClick={() => {
                          setSlippage("1");
                        }}
                      >
                        1%
                      </button>
                      <button
                        className="border text-center rounded-md border-gray-600 text-gray-400 px-2"
                        onClick={() => {
                          setSlippage("5");
                        }}
                      >
                        5%
                      </button>
                      <button
                        className="border text-center rounded-md border-gray-600 text-gray-400 px-2"
                        onClick={() => {
                          setSlippage("12");
                        }}
                      >
                        12%
                      </button>
                    </div>
                  </div>
                </div>
              </Box>
            </Fade>
          )}
        </Popper>
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
      <button
        disabled={quoteProvider.error ? true : false}
        onClick={() => {
          setConfirmTX(true);
        }}
        className="mt-5 border w-full font-bold hover:bg-slate-800/50 hover:cursor-pointer p-2.5 rounded-lg border-gray-800 bg-slate-800 text-white"
      >
        {quoteProvider.error ? quoteProvider.error : " Swap Asset"}
      </button>
    );
  }

  function Selector({
    image,
    setter,
    state,
    type,
    searchInput,
    setSearchInput,
  }: any) {
    return (
      <div className="mt-4 p-5 border rounded-lg border-gray-600 bg-gray-800/60 grid grid-rows-1 gap-1">
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="0.00"
            className="text-2xl text-gray-300 font-bold outline-none w-60"
            value={
              type === "in"
                ? amounts[type]
                : type === "out" && quoteProvider
                ? quoteProvider.quoteOut
                : "0.00"
            }
            onChange={(e) => {
              setAmounts({ ...amounts, [type]: e.target.value });
            }}
          />

          <NewTokenModal
            pairs={pairs || []}
            setter={setter}
            state={state}
            type={type}
            setSearchInput={setSearchInput}
            searchInput={searchInput}
          >
            <span
              className={`
                flex gap-1.5
              } text-sm font-stretch-normal font-semibold text-gray-400`}
            >
              <img
                src={
                  state[type].image
                    ? state[type].image
                    : "https://media.tenor.com/SsTnMMMQdkQAAAAe/confusion-emoji.png"
                }
                alt=""
                className="size-5 rounded-full"
              />
              <h1 className="overflow-hidden text-xs mt-0.5">
                {state[type].symbol ? state[type].symbol : "Select Token"}
              </h1>
            </span>
            <IoIosArrowDown className="mt-[-1.5px] text-gray-300 font-bold text-md" />
          </NewTokenModal>
        </div>
        <div className="flex justify-between">
          <h1 className="text-gray-600 mt-2">
            ${quoteProvider ? quoteProvider.USD[type] : "~"}
          </h1>
          <span className="flex text-gray-600 mt-2.5 gap-2 ">
            <FaWallet className="mt-1" />
            <button
              onClick={() => {
                if (state[type].balance) {
                  setAmounts({ ...state, [type]: String(state[type].balance) });
                }
              }}
            >
              {state[type].balance ? state[type].balance : null}
            </button>
          </span>
        </div>
      </div>
    );
  }
  async function swapAssets() {}
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => {
          setTxResults(null);
        }}
      >
        <IoCloseCircleOutline fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  return (
    <div className="p-5 border w-[90%] m-auto mt-4 rounded-md bg-slate-900 border-slate-900">
      <NewTxConfirmModal
        tokens={tokens}
        quote={quoteProvider}
        action={async () => {
          const result: any = await writer.performSwap(
            quoteProvider.assembledTX,
            quoteProvider.isApproved
          );
          setTxResults(result);
          setConfirmTX(false);
        }}
        show={confirmTX}
        setShow={setConfirmTX}
        setResponse={setTxResults}
      />
      <Snackbar
        open={txResults !== null ? true : false}
        autoHideDuration={6000}
        onClose={() => {
          setTxResults(null);
        }}
        message={
          txResults && txResults.message !== null ? txResults.message : "Error"
        }
        action={action}
      />
      <SwapSettings />
      <div className="grid grid-flow-row  ">
        <Selector
          image={""}
          setter={setTokens}
          state={tokens}
          type={"in"}
          setSearchInput={setSearchInput}
          searchInput={searchInput}
        />
        <button
          className="flex justify-center text-2xl font-bold text-gray-500 mt-3 hover:cursor-pointer"
          onClick={() => {
            if (tokens.in || tokens.out) {
              setTokens({ out: tokens.in, in: tokens.out });
            }
          }}
        >
          <LuArrowDownUp />
        </button>
        <Selector
          image={""}
          setter={setTokens}
          state={tokens}
          type={"out"}
          setSearchInput={setSearchInput}
          searchInput={searchInput}
        />
      </div>

      <ExcecutionBTN />
    </div>
  );
}

export default SwapPage;
