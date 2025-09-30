import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { IoHelpBuoyOutline } from "react-icons/io5";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 470,
  bgcolor: "oklch(27.9% 0.041 260.031)",
  color: "white",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

export default function NewTxConfirmModal({
  tokens,
  quote,
  action,
  show,
  setShow,
  setResponse,
}: any) {
  const handleClose = () => setShow(false);
  function QuoteBox({ type }: any) {
    console.log(quote);
    console.log(tokens[type]);
    return (
      <div className="border px-4 rounded-lg border-gray-700 bg-gray-800 grid grid-cols-2 ">
        <div className="grid grid-rows-3">
          <h1 className="text-gray-500 font-light mt-2">
            {type === "in" ? "You Pay" : "You Recieve"}
          </h1>
          <h1 className="text-gray-300 text-4xl font-bold">
            {quote ? quote.inAmount : ""}
          </h1>
          <h1 className="text-gray-600 text-lg font-bold mt-0.5">
            {quote ? (type === "in" ? quote.inAmount : quote.quoteOut) : null}
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
            className="border rounded-full border-0 size-11"
          />
        </div>
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
            <h1 className="text-lg font-bold text-gray-400">
              Review Transaction
            </h1>
            <span className="flex gap-1 mt-1 text-sm text-gray-400">
              <IoHelpBuoyOutline className="mt-0.5" />
              <h1 className="">Get Help?</h1>
            </span>
          </div>
          <div className="mt-3 grid grid-flow-row gap-3">
            <QuoteBox type={"in"} />
            <QuoteBox type={"out"} />
          </div>
          <div>
            <button
              className="mt-3 border-0 bg-slate-700 w-full p-4 rounded-lg hover:bg-slate-700/50"
              onClick={() => {
                action();
              }}
            >
              {quote.isApproved ? "Swap Tokens" : "Approve Spending"}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
