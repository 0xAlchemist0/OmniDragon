import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Fade,
  IconButton,
  Popper,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaSwimmingPool, FaWallet } from "react-icons/fa";
import { HiArrowsUpDown } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import { LuArrowDownUp } from "react-icons/lu";
import { useTxService } from "../../state/TxServiceProvider";
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
  const [tokens, setTokens] = useState<{ in: Token | any; out: Token | any }>({
    in: { address: null },
    out: { address: null },
  });
  const [modalOpen, setModalOpen] = useState({ in: false, out: false });

  const [amounts, setAmounts] = useState<{ in: string; out: string }>({
    in: "",
    out: "",
  });
  const { reader, writer } = useTxService();

  const [searchInput, setSearchInput] = useState({ in: "", out: "" });

  const [confirmTX, setConfirmTX] = useState(false);
  //default slippage 5%
  const [slippage, setSlippage] = useState("5");
  const [debouncedIn, setDebouncedIn] = useState(amounts.in);
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedIn(amounts.in), 500);
    return () => clearTimeout(timeout);
  }, [amounts.in]);
  const quoteProvider = useSwapProvider(
    tokens.in.address,
    tokens.out.address,
    amounts.in,
    slippage
  );
  const [txResults, setTxResults] = useState(null);
  const pairs = usePairs(searchInput, setTokens, txResults, tokens);
  useEffect(() => {
    if (quoteProvider?.quote?.quoteOut && amounts.in !== "") {
      setAmounts((prev: any) => ({
        ...prev,
        out: quoteProvider.quote.quoteOut,
      }));
    }
  }, [quoteProvider?.quote?.quoteOut]);
  const MemoizedSelector = React.memo(Selector);

  function SwapSettings() {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    useEffect(() => {
      console.log("slippage chnaged: ", slippage);
    }, [slippage]);
    const canBeOpen = open && Boolean(anchorEl);
    const id = canBeOpen ? "transition-popper" : undefined;

    return (
      <div className="flex justify-between">
        <h1 className="font-bold text-gray-600 text-md">Swap Tokens</h1>

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
                  p: 3,
                  backgroundColor: "oklch(27.9% 0.041 260.031)",
                  borderColor: "oklch(27.9% 0.041 260.031)",
                  color: "white",
                  borderRadius: "15px",
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
                        className="border text-center rounded-md border-gray-600 text-gray-300 px-2"
                        onClick={() => {
                          setSlippage("1");
                        }}
                      >
                        1%
                      </button>
                      <button
                        className="border text-center rounded-md border-gray-600 text-gray-300 px-2"
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
        disabled={quoteProvider.quote.error ? true : false}
        onClick={() => {
          if (quoteProvider.quote && quoteProvider.quote.assembledTX) {
            setConfirmTX(true);
          }
        }}
        className={`"mt-5 border w-full font-bold hover:bg-slate-800/50 hover:cursor-pointer text-white mt-4 p-2.5 rounded-lg border-gray-800 ${
          quoteProvider.quote.assembledTX ? "bg-slate-800" : "bg-slate-800/40"
        } text-white"`}
      >
        {quoteProvider.quote.error ? quoteProvider.quote.error : " Swap Asset"}
      </button>
    );
  }
  const [load, setLoad] = useState(false);

  function Selector({
    image,
    setter,
    state,
    type,
    searchInput,
    setSearchInput,
  }: any) {
    console.log("type<", type);
    const [amountss, setAmountss] = useState({ in: "", out: "" });
    const quoteProviderss = useSwapProvider(
      tokens.in.address,
      tokens.out.address,
      amountss.in,
      slippage
    );
    console.log(state);

    return (
      <div className="mt-4 p-5 border rounded-lg border-gray-600 bg-gray-800/30 grid grid-rows-1 gap-1">
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="0.00"
            className="text-2xl text-gray-300 font-bold outline-none w-60"
            value={amounts[type]}
            onChange={(e) => {
              console.log(e.target.value);
              e.preventDefault();
              setAmounts({ ...amounts, [type]: e.target.value });
            }}
          />

          <NewTokenModal
            open={modalOpen[type]}
            onOpen={() => setModalOpen((prev) => ({ ...prev, [type]: true }))}
            onClose={() => setModalOpen((prev) => ({ ...prev, [type]: false }))}
            pairs={pairs || []}
            setter={setter}
            state={state}
            type={type}
            setSearchInput={setSearchInput}
            searchInput={searchInput}
            search={pairs.searchToken}
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
            ${quoteProvider ? quoteProvider.quote.USD[type] : "~"}
          </h1>
          <span className="flex text-gray-600 mt-2.5 gap-2 ">
            <FaWallet className="mt-1" />
            <button
              onClick={() => {
                if (state[type].balance) {
                  setAmounts((prev) => ({
                    ...prev,
                    [type]: String(state[type].balance),
                  }));
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
    <div className="p-5 border w-[450px] m-auto mt-4 rounded-md bg-[#1f2124] border-slate-900">
      <NewTxConfirmModal
        tokens={tokens}
        quote={quoteProvider.quote}
        load={load}
        setLoad={setLoad}
        action={async () => {
          console.log(
            "before tx is approved: ",
            quoteProvider.quote?.isApproved
          );
          const swap = async () => {
            setLoad(true);

            console.log("pre swap: ,", quoteProvider.quote);
            const result: any = await writer.performSwap(
              quoteProvider.quote?.assembledTX
            );
            setLoad(false);
            setTxResults(result);
          };

          const approveSpending = async () => {
            setLoad(true);

            await writer.approveTokens(
              quoteProvider?.quote?.assembledTX?.inputTokens[0]?.tokenAddress,

              quoteProvider?.quote?.assembledTX?.transaction?.to
            );
            setLoad(false);

            quoteProvider.updateApproval(true);
          };

          if (quoteProvider.quote.isApproved === true) {
            swap();
          } else if (quoteProvider.quote.isApproved === false) {
            approveSpending();
          }
        }}
        show={confirmTX}
        setShow={setConfirmTX}
        setResponse={setTxResults}
        txResults={txResults}
        setTxResults={setTxResults}
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
        <MemoizedSelector
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
        <MemoizedSelector
          image={""}
          setter={setTokens}
          state={tokens}
          type={"out"}
          setSearchInput={setSearchInput}
          searchInput={searchInput}
        />
      </div>{" "}
      <div className="text-white mt-2">
        {quoteProvider && quoteProvider.quote.names.in && (
          <>
            <Accordion
              className="border-0"
              sx={{
                bgcolor: "#1f2124",
                color: "white",
                border: "#1f2124",
              }}
            >
              <AccordionSummary
                expandIcon={
                  <HiArrowsUpDown className="text-gray-100 text-lg" />
                }
                aria-controls="panel1-content"
                id="panel1-header"
                className=""
              >
                Quote Details
              </AccordionSummary>
              <AccordionDetails className="border-0">
                <Typography>
                  <div className="text-sm">
                    <div className="flex justify-between">
                      <h1>Amount sold:</h1>
                      <h1>{quoteProvider.quote.inAmount || "0"}</h1>
                    </div>
                    <div className="flex justify-between mt-2">
                      <h1>Minimum recieved:</h1>
                      <h1>{quoteProvider.quote.quoteOut || "0"}</h1>
                    </div>
                    <div className="flex justify-between mt-2">
                      <h1>Exchange Rate:</h1>
                      <h1>
                        1{quoteProvider.quote.names.out} = $
                        {quoteProvider.quote.prices.out}
                      </h1>
                    </div>
                    <div className="flex justify-between mt-2">
                      <h1>Slippage:</h1>
                      <h1>5%</h1>
                    </div>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </>
        )}
      </div>
      <ExcecutionBTN />
    </div>
  );
}

export default SwapPage;
