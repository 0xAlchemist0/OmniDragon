import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { HiArrowsUpDown } from "react-icons/hi2";
import { ImSpinner8 } from "react-icons/im";
import { IoClose, IoHelpBuoyOutline } from "react-icons/io5";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 470,
  bgcolor: "#1A1C1F",
  color: "white",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

export default function NewTxConfirmModal({
  tokens,
  quote,
  load,
  setLoad,
  action,
  show,
  setShow,
  setResponse,
  txResults,
  setTxResults,
}: any) {
  const handleClose = () => {
    setTxResults(null);
    setLoad(false);
    setShow(false);
  };
  function QuoteBox({ type }: any) {
    console.log(quote);
    console.log(tokens[type]);
    return (
      <div className="border px-4 rounded-lg border-gray-700  bg-gray-800/20 grid grid-cols-2 ">
        <div className="grid grid-rows-3">
          <h1 className="text-gray-500 font-light mt-2">
            {type === "in" ? "You Pay" : "You Recieve"}
          </h1>
          <h1 className="text-gray-300 text-3xl font-bold">
            {quote ? quote.inAmount : ""}
          </h1>
          <h1 className="text-gray-600 text-lg font-bold mt-0.5">
            $ {quote ? (type === "in" ? quote.USD.in : quote.USD.out) : null}
          </h1>
        </div>
        <div className="  flex justify-end mt-8">
          <img
            src={
              tokens[type]
                ? tokens[type].image
                  ? tokens[type].image
                  : "https://media.tenor.com/SsTnMMMQdkQAAAAe/confusion-emoji.png"
                : null
            }
            alt=""
            className="border rounded-full border-0 size-10"
          />
        </div>
      </div>
    );
  }
  function PerformingTransaction() {
    console.log("tx result ");
    console.log(txResults);
    return (
      <div>
        <div className="text-white p-10 mt-7 ">
          <FaCheckCircle className="text-[80px] m-auto text-green-500" />
          <h1 className="text-center mt-5 font-semibold text-gray-500">
            Swap Success!
          </h1>
          <div className="mt-2  gap-5 flex justify-center text-gray-300 font-semibold mt-4">
            <div className="flex gap-2">
              <img
                src={quote.images.in}
                alt=""
                className="rounded-full size-6 border-0"
              />
              <div className="flex gap-1">
                <h1>{quote.inAmount}</h1>
                <h1>{quote.names.in}</h1>
              </div>
            </div>
            <div>
              <FaArrowRight className="mt-1 text-gray-500" />
            </div>
            <div className="flex gap-2">
              <img
                src={quote.images.out}
                alt=""
                className="rounded-full size-6 border-0"
              />
              <div className="flex gap-1">
                <h1>{quote.inAmount}</h1>
                <h1>{quote.names.in}</h1>
              </div>
            </div>
          </div>
        </div>
        <a
          href={`https://sonicscan.org/tx/${txResults.txHash}`}
          target="_blank"
          className="text-center  px-34 text-gray-400 hover:underline"
        >
          View on Explorer
        </a>
      </div>
    );
  }

  return (
    <div>
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-between">
            <h1 className="text-lg font-semibold text-gray-500 mt-0.5">
              Review Transaction
            </h1>
            <div className="flex gap-2">
              <span className="flex gap-1 mt-2 text-sm text-gray-500">
                <IoHelpBuoyOutline className="mt-0.5" />
                <a href="" className="hover:underline" target="_blank">
                  Get Help?
                </a>
              </span>
              <button
                className="hover:cursor-pointer"
                onClick={() => {
                  setShow(false);
                }}
              >
                <IoClose className="mt-1 text-[25px] text-gray-500" />
              </button>
            </div>
          </div>
          {txResults !== null && txResults.complete ? (
            <PerformingTransaction />
          ) : (
            <>
              <div className="mt-3 grid grid-flow-row gap-3">
                <QuoteBox type={"in"} />
                <QuoteBox type={"out"} />
              </div>
              <div className="mt-3">
                {quote && quote.names.in && (
                  <>
                    <Accordion
                      className="border-0"
                      sx={{
                        bgcolor: "#1f2124",
                        color: "white",
                        border: "#1f2124",
                        marginBottom: "10px",
                      }}
                    >
                      <AccordionSummary
                        expandIcon={
                          <HiArrowsUpDown className="text-gray-100 text-sm" />
                        }
                        aria-controls="panel1-content"
                        id="panel1-header"
                        className="text-sm"
                      >
                        Quote Details
                      </AccordionSummary>
                      <AccordionDetails className="border-0 text-xs">
                        <Typography>
                          <div className="text-xs">
                            <div className="flex justify-between text-xs">
                              <h1>Amount sold:</h1>
                              <h1>{quote.inAmount || "0"}</h1>
                            </div>
                            <div className="flex justify-between mt-2 text-xs">
                              <h1>Minimum recieved:</h1>
                              <h1>{quote.quoteOut || "0"}</h1>
                            </div>
                            <div className="flex justify-between mt-2 text-xs">
                              <h1>Exchange Rate:</h1>
                              <h1>
                                1{quote.names.out} = ${quote.prices.out}
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
                {quote.isApproved === false && (
                  <button
                    className={`" border-0 mb-3 bg-slate-800/50 w-full p-2 rounded-lg hover:bg-slate-700/50"`}
                    onClick={() => {
                      action();
                    }}
                  >
                    {load ? (
                      <ImSpinner8 className="text-center text-xl animate-spin m-auto" />
                    ) : (
                      "Approve Tokens"
                    )}
                  </button>
                )}
                <button
                  className={`"mt-3 border-0  bg-slate-800/30 w-full p-${
                    quote.isApproved === false ? "2" : "4"
                  } rounded-lg hover:bg-slate-800/50 ${
                    load === true && " animate-spin"
                  }"`}
                  disabled={quote.isAppoved}
                  onClick={() => {
                    action();
                  }}
                >
                  {load ? (
                    <ImSpinner8 className="text-center text-xl animate-spin m-auto" />
                  ) : (
                    "Swap Tokens"
                  )}
                </button>
              </div>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
}
