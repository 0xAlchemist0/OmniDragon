import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import * as React from "react";
import { FaCoins, FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  backgroundColor: "rgb(15, 23, 42)",
};

export default function NewTokenModal({
  pairs,
  setter,
  state,
  type,
  children,
}: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    border: "1px solid",
    borderColor: "grey.800",
    p: 1,
    whiteSpace: "nowrap",
    borderRadius: "0.5rem", // lg = 0.5rem
    display: "flex",
    gap: "0.375rem", // 1.5 * 0.25rem
    bgcolor: "rgba(31, 41, 55, 0.9)", // gray-800/90
    color: "white",
    cursor: "pointer",
  };

  function FeaturedPairs({ image = null }: any) {
    return (
      <div className="grid grid-cols-5 mt-4 p-2">
        {pairs &&
          pairs.map((item: any, index: any) => {
            if (index < 5) {
              return (
                <div className="border m-auto px-4 py-1 rounded-md bg-gray-800/60 border-gray-600">
                  <img
                    src={item.image ? item.image : ""}
                    alt=""
                    className="size-7 m-auto"
                  />
                  <h1 className="text-xs font-semibold text-gray-400 mt-1">
                    {item.symbol}
                  </h1>
                </div>
              );
            }
          })}
      </div>
    );
  }

  function Pairs({ handleClose }: any) {
    return (
      <div className="p-3 overflow-y-auto h-130">
        <span className="flex gap-2 ">
          <FaCoins className="text-gray-600 mt-1" />
          <h1 className="text-sm mt-1 font-bold">Your tokens</h1>
        </span>
        {pairs && (
          <>
            {pairs.map((item: any, index: any) => {
              console.log(item);
              return (
                <button
                  className="grid grid-cols-8  mt-3 w-full p-2 hover:bg-slate-800/90"
                  key={index}
                  onClick={() => {
                    console.log("type: ", state);
                    setter({ ...state, [String(type)]: item });
                    handleClose();
                  }}
                >
                  <span className="col-span-1 ">
                    <img
                      src={
                        item.image
                          ? item.image
                          : "https://media.tenor.com/SsTnMMMQdkQAAAAe/confusion-emoji.png"
                      }
                      alt=""
                      className="size-10 mx-auto mt-1 my-auto rounded-full"
                    />
                  </span>
                  <span className="col-span-5  text-left ms-2 ">
                    <h1 className="font-semibold text-gray-400 text-lg">
                      {item.name}
                    </h1>
                    <h1 className="font-light text-gray-500 text-sm">
                      {item.symbol}
                    </h1>
                  </span>
                  <span className="col-span-2  text-right">
                    <h1 className="text-lg font-bold">$23,983</h1>

                    <h1 className="text-sm">23.45</h1>
                  </span>
                </button>
              );
            })}
          </>
        )}
      </div>
    );
  }

  function getFeatured() {
    //first pairs are feature d
  }

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={style}
        className="border p-2 text-nowrap rounded-lg flex gap-1.5  border-gray-600 bg-gray-800/90 text-white hover:cursor-pointer "
      >
        {children}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxStyle}>
          <div>
            <h1 className="p-2 font-bold">
              {state[type] ? state[type].symbol : "Select a Token"}
            </h1>

            <div className="mt-2 border border-gray-600 grid grid-cols-8 p-2 rounded-full  bg-gray-800/60">
              <FaSearch className="text-gray-500 col-span-1 mt-[7px] ms-4 text-sm" />
              <input
                type="text"
                className=" col-span-6 p-1  outline-none font-bold text-sm"
                placeholder="Enter a token"
              />
              <button className=" col-span-1 flex gap-2 flex justify-end">
                <img
                  src="https://app.uniswap.org/assets/all-networks-icon-yW1hkVHa.png"
                  alt=""
                  className="size-6.5 mt-0.5"
                />
                <IoIosArrowDown className="mt-1.5 text-gray-300 font-bold text-md" />
              </button>
            </div>
          </div>
          {/* featured pairs found here */}
          <FeaturedPairs />
          {/* token pairs available go here */}
          <Pairs handleClose={handleClose} setter={setter} />
        </Box>
      </Modal>
    </div>
  );
}
