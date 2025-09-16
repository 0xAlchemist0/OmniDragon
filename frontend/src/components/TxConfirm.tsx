import { Box, Modal } from "@mui/material";

function TxConfirm({
  tokenIn,
  tokenOut,
  inAmount,
  outAmount,
  quote,
  setShowConfirmation,
  showConfirmation,
}: any) {
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
  const handleClose = () => {
    setShowConfirmation(false);
  };

  function getUSD(token: any, type: any) {
    console.log(token, type);
    const priceUsd: any = token?.priceUsd;
    if (type === "in") {
      if (quote && priceUsd) {
        console.log(priceUsd);
        return parseFloat(Number(inAmount) * parseFloat(priceUsd)).toFixed(2);
      }
    } else {
      if (priceUsd && quote) {
        return parseFloat(parseFloat(priceUsd) * Number(quote[0])).toFixed(2);
      }
    }
  }

  function TokenCard({ info, type }: any) {
    const USD = getUSD(info, type);
    return (
      <div className="border p-3 rounded-md border-gray-600 ">{USD || 0}</div>
    );
  }
  return (
    <div>
      <Modal
        open={showConfirmation}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="overflow-y-auto flex justify-between">
            <h1>Confirm Swap </h1>
            <h1>X</h1>
          </div>
          <div className="mt-3 grid grid-rows-1 gap-2 ">
            <TokenCard info={tokenIn} type={"in"} />
            <TokenCard info={tokenOut} type={"out"} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default TxConfirm;
