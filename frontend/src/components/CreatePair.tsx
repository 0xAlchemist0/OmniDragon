import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useTxService } from "../state/TxServiceProvider";
import contracts from "../utils/contracts";
function CreatePair({ pairs, input, setInput, searchResults }: any) {
  const [isStable, setIsstable] = useState(null);
  const [pairedToken, setPairedToken] = useState(null);
  console.log(pairs);
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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { reader, writer } = useTxService();
  const [exists, setExists] = useState();
  function ModalPart({ isBase }: any) {
    const style = {
      position: "absolute",
      top: "40%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 470,
      bgcolor: "#111827",
      border: "2px solid #000",
      borderRadius: "15px",
      boxShadow: 24,
      p: 4,
    };

    async function excectueTx() {
      if ((pairedToken && isStable) || isStable === false) {
        const response = await writer.createPair(
          contracts.Tokens.omniDRAGON,
          pairedToken,
          isStable
        );
      } else {
        console.log("Error missing params ! ");
      }
    }

    async function verifyPairExistence() {
      const doesExist: any = await reader.doesPairExist(
        contracts.Tokens.omniDRAGON,
        pairedToken,
        isStable,
        reader
      );
      console.log("Does pair exist: ", doesExist);
      setExists(doesExist);
    }
    console.log(pairs);
    useEffect(() => {
      if (pairedToken && isStable !== null) {
        verifyPairExistence();
      }
    }, [pairedToken, isStable]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
      <div>
        <button
          onClick={handleOpen}
          className="border flex justify-between p-2  rounded-md bg-gray-800 border-gray-700 w-full "
        >
          <div className="flex gap-2 ">
            <img
              src={
                pairedToken && isBase === false
                  ? pairedToken.info.imageUrl
                  : "https://docs.omnidragon.io/img/logo.svg"
              }
              alt=""
              className="size-4.5 mt-0.5 rounded-full"
            />
            <h1 className="font-semibold text-xs mt-1">
              {pairedToken && isBase !== true && pairedToken.baseToken.symbol}
              {isBase && "Dragon"}
            </h1>
          </div>
          <div className="flex gap-2 ">
            <MdKeyboardArrowDown className="mt-1 text-xl" />
          </div>
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="flex justify-between">
              <h1 className="text-lg font-bold">Select a asset</h1>
              <h1>X</h1>
            </div>
            <div className="border bg-gray-800 border-gray-800 mt-2 rounded-full p-2">
              <input
                type="text"
                className="w-95 rounded-full border-0 outline-0"
                placeholder="Search Token"
                onChange={(e) => {
                  //closes after a single input
                  if (!isBase) {
                    setInput(e.target.value);
                  }
                }}
              />
            </div>
            <div className="mt-5 overflow-y-auto grid grid-flow-row gap-2 w-100">
              {pairs &&
                pairs.map((item: any, index: any) => {
                  console.log(item);
                  return (
                    <button
                      className="grid grid-cols-6  p-2 hover:bg-gray-800 rounded-md "
                      onClick={() => {
                        setPairedToken(item);
                        setOpen(false);
                      }}
                    >
                      <div className=" flex gap-2 col-span-3  text-xs p-2">
                        <img
                          src={
                            item.info
                              ? item.info.imageUrl
                              : "https://img.favpng.com/5/24/25/iphone-emoji-samsung-galaxy-guess-the-questions-png-favpng-c3MHskS0v4eXsEeqCzRYk4wTi.jpg"
                          }
                          alt=""
                          className="h-10 rounded-full "
                        />
                        <div className="">
                          <h1 className="text-[16px] text-gray-200 font-semibold overflow-hidden">
                            {item.baseToken.name}
                          </h1>
                          <h1 className="text-xs text-left">ETH</h1>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 col-span-3  h-15">
                        <div className=" text-xs text-right p-2 grid grid-rows-2 ">
                          <h1 className="text-[15px] text-gray-200 font-bold">
                            {" "}
                            $1238
                          </h1>
                          <h1 className="text-[13px]"> 0.0001</h1>
                        </div>
                      </div>
                    </button>
                  );
                })}
            </div>
          </Box>
        </Modal>
      </div>
    );
  }
  async function excecuteTX() {
    if (pairedToken) {
      if (pairedToken.baseToken) {
        const result: any = await writer.createPair(
          contracts.Tokens.omniDRAGON,
          pairedToken.baseToken.address,
          isStable
        );
      }
    }
  }
  function SubmitTxBtn() {
    return (
      <button
        className="border p-2 mt-2 text-white hover:bg-gray-800/80 hover:border-gray/80 w-full border-gray-700  bg-gray-800 rounded-md clear-start"
        onClick={() => {
          excecuteTX();
        }}
      >
        Create Pair
      </button>
    );
  }
  return (
    <div className="p-2  ">
      <div className="mb-1 p-3">
        <h1 className="text-gray-100">Select Pair </h1>
        <h1 className="text-[10px] text-gray-400">
          Choose the tokens you want to provide liquidity for. You can select
          tokens on all supported networks.
        </h1>
      </div>
      <div>
        <div className="grid grid-rows-1 md:grid-cols-2 gap-3 p-3">
          <div>
            <h1 className="text-sm mb-2">Base Token</h1>
            <ModalPart isBase={true} />
          </div>{" "}
          <div className="text-white text-center relative mt-3 md:hidden">
            +
          </div>
          <div className="">
            <h1 className="text-sm mb-2">Paired Token</h1>
            <ModalPart isBase={false} />
          </div>
        </div>
      </div>
      <div className="mt-3 p-3">
        <h1>Stable Tiers</h1>
        <h1 className="text-[10px] text-gray-400">
          Each token pair can only have one stable pool and one volatile pool,
          so if a pair already exists, a new one cannot be created.
        </h1>
        <div className="mt-2 grid grid-flow-col p-5 gap-2 text-xs">
          <button
            className={`border p-5 text-left hover:bg-gray-800/80 ${
              isStable === true && "bg-gray-800"
            } rounded-md border-gray-600 ${isStable === true && "bg-gray-300"}`}
            onClick={() => {
              setIsstable(true);
            }}
          >
            <h1>Stable</h1>
            <h1 className="text-[10px] whitespace-nowrap mt-1">1% Fee</h1>
          </button>
          <button
            className={`border p-5 text-left hover:bg-gray-800/80 ${
              isStable === false && "bg-gray-800"
            } rounded-md border-gray-600 ${
              isStable === false && "bg-gray-300"
            }`}
            onClick={() => {
              setIsstable(false);
            }}
          >
            <h1>Not Stable</h1>
            <h1 className="text-[10px] whitespace-nowrap mt-1">10% Fee</h1>
          </button>
        </div>
      </div>
      {exists && (
        <div className="text-red-700">Token Combination Already Exists</div>
      )}

      <div className=" mb-1">
        <SubmitTxBtn />
      </div>
    </div>
  );
}

export default CreatePair;
