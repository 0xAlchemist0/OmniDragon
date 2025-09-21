import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";

function CreatePair({ pairs, input, setInput }: any) {
  const handleInput = () => {
    //    <TokenModal
    //               activate={activate}
    //               setActivate={setActivate}
    //               pairs={pairs}
    //               setTokenIn={setTokenIn}
    //               setTokenOut={setTokenOut}
    //               tokenType={tokenType}
    //               tokens={tokens}
    //               setTokens={setTokens}
    //               setVerified={setVerified}
    //               setStable={setStable}
    //             ></TokenModal>
  };

  function ModalPart() {
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "black ",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <div>
        <Button onClick={handleOpen} className="border">
          Test
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="flex justify-between">
              <h1>Select a asset</h1>
              <span></span>
            </div>
            <div className="">
              <div className="mt-3 border ">
                <h1 className="text-sm p-2">Base Token</h1>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    );
  }

  function SubmitTxBtn() {
    return (
      <button className="border p-2 mt-2 text-white hover:bg-gray-800/80 hover:border-gray/80 w-full border-gray-700  bg-gray-800 rounded-md clear-start">
        Create Pair
      </button>
    );
  }
  return (
    <div className="p-3  ">
      <div className="border ">
        <h1>Pool Creation</h1>
        <h1 className="text-xs">Select a token for pair creation</h1>
      </div>
      <div>
        <h1>Base Token</h1>
        <ModalPart />
      </div>
      <div>
        <SubmitTxBtn />
      </div>
    </div>
  );
}

export default CreatePair;
