import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useTxService } from "../state/TxServiceProvider";
import contracts from "../utils/contracts";

function TxConfirm({
  tokenIn,
  tokenOut,
  inAmount,
  outAmount,
  quote,
  setShowConfirmation,
  showConfirmation,
}: any) {
  const { reader, writer } = useTxService();
  const style = {
    position: "absolute",
    top: "35%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 470,
    bgcolor: "#111827",
    border: "2px solid #000",
    borderRadius: "15px",
    boxShadow: 24,
    p: 4,
  };

  const [isApproves, setIsApproved] = useState(false);
  const handleClose = () => {
    setShowConfirmation(false);
  };

  //approval should only be from token In
  useEffect(() => {
    setIsApproved(false);
  }, [tokenIn]);

  function getUSD(token: any, type: any) {
    console.log(token, type);
    const priceUsd: any = parseFloat(token?.priceUsd).toFixed(4);
    console.log(priceUsd);
    if (String(type) === "in") {
      return parseFloat(priceUsd * Number(inAmount)).toFixed(2);
    } else {
      return parseFloat(priceUsd * Number(quote[0])).toFixed(2);
    }
  }

  async function verifyApproval() {
    const approvalsNeeded = [];
    const isInApproved = await writer.approveTokens(
      tokenIn.baseToken.address,
      contracts.Uniswap.UniswapV2Router,
      Number(inAmount)
    );
    if (isInApproved) {
      setIsApproved(true);
      excectuteTX();
    }
  }

  async function excectuteTX() {
    const reuslt = await writer.swapExactTokensForTokens(
      String(inAmount),
      String(quote[0]),
      tokenIn.baseToken.address,
      tokenOut.baseToken.address
    );
  }

  function TokenCard({ info, type }: any) {
    const USD: any = getUSD(info, type);
    console.log(USD);
    return (
      <div className="border p-4 rounded-md border-gray-700 grid grid-flow-row gap-3">
        <h1 className="text-sm">{type === "in" ? "You Pay" : "You Recieve"}</h1>
        <div className="flex justify-between">
          <h1 className="text-3xl text-white ">
            {String(type) === "in" ? inAmount : quote[0]}
          </h1>
          <img
            src={
              info.info
                ? info.info.imageUrl
                : "https://wallpapers.com/images/hd/thinking_-emoji_-confusion-png-xpnniaqrng2mn9r1.jpg"
            }
            alt=""
            className="rounded-full size-10"
          />
        </div>
        <h1>~${USD || 0}</h1>
      </div>
    );
  }
  return (
    <div>
      <Modal
        open={showConfirmation}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className=""
      >
        <Box sx={style}>
          <div className="overflow-y-auto flex justify-between">
            <h1>Confirm Swap </h1>
            <h1>X</h1>
          </div>
          <div className="mt-3 grid grid-rows-1 gap-4 ">
            <TokenCard info={tokenIn} type={"in"} />
            <TokenCard info={tokenOut} type={"out"} />
          </div>
          <div className="mt-4">
            <button
              className="text-center border w-full p-3 rounded-lg border-gray-600 bg-gray-800 text-white font-semibold"
              onClick={async () => {
                excectuteTX();
              }}
            >
              Approve and Swap
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default TxConfirm;
