import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "#111827",
  border: "2px solid #000",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

export default function TokenModal({
  activate,
  setActivate,
  pairs,
  setTokenIn,
  setTokenOut,
}: any) {
  const handleOpen = () => setActivate(true);
  const handleClose = () => setActivate(false);
  useEffect(() => {
    console.log(pairs);
  }, [pairs]);

  function MapPairs() {
    console.log("Length: ", pairs);
    return (
      <>
        {pairs ? (
          <div className="overflow-auto">
            {pairs.map((item: any, key: any) => {
              const images = item["info"];
              console.log(images);
              return (
                <div key={key} className="border ">
                  <div>
                    <h1>{item["baseToken"].name}</h1>
                    {images && (
                      <img src={images.imageUrl} className="size-10" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </>
    );
  }

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={activate}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-between">
            <h1>Select Token</h1>
            <h1>X</h1>
          </div>
          <div className="mt-2">
            <input
              type="text"
              className="border w-full rounded-md p-2 border-gray-700"
              placeholder="Enter token or pair address"
            />
          </div>
          <div className="mt-2 grid grid-flow-row gap-2">
            <MapPairs />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
