import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { searchDexscreener } from "../lib/dexscreener-handler";
import { useTxService } from "../state/TxServiceProvider";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 470,
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
  tokenType,
  tokens,
  setTokens,
  setVerified,
  children,
}: any) {
  const handleOpen = () => setActivate(true);
  const handleClose = () => setActivate(false);
  const [searchResults, setSearchResults] = useState(null);
  const [input, setInput] = useState(null);

  const { reader }: any = useTxService();

  const handleSelection = (selection: any) => {
    setTokens((prev: any) => ({
      ...prev,
      [tokenType]: selection,
    }));
  };
  useEffect(() => {
    if (input === "" || input === null) setSearchResults(null);
    const search = async () => {
      const chainName = await reader.getChainName();
      if (input) {
        const res = await searchDexscreener(input, chainName);
        if (res) {
          setSearchResults(res);
        } else {
          setSearchResults(null);
        }
      }
    };
    if (input) {
      search();
    }
  }, [input]);

  useEffect(() => {
    const verify = async () => {
      const result = await reader.isPair(
        tokens.in.baseToken.address,
        tokens.out.baseToken.address,
        reader
      );
      console.log("is pair found? : ", result);
      if (result) setVerified(true);
      else setVerified(false);
    };
    if (tokens.in && tokens.out) {
      verify();
    }
  }, [tokens.in, tokens.out]);

  useEffect(() => {}, [tokenType]);
  function MapPairs() {
    return (
      <div className="overflow-hidden">
        {searchResults !== null ? (
          <div className="h-40 overflow-y-auto grid grid-flow-row gap-2">
            <button
              className={`border w-95 m-auto border-gray-700 rounded-md flex justify-between p-2 `}
              style={{ scrollbarWidth: "none" }}
              onClick={() => {
                handleSelection(searchResults);
                setActivate(false);
              }}
            >
              <div className="flex gap-2 p-2 text-sm">
                {searchResults && searchResults?.info && (
                  <img
                    src={
                      searchResults
                        ? searchResults?.info?.imageUrl
                        : "https://media.tenor.com/SsTnMMMQdkQAAAAe/confusion-emoji.png"
                    }
                    className="size-8 border rounded-full"
                  />
                )}
                <h1 className="mt-1.5 text-md text-gray-200 font-bold">
                  {searchResults?.baseToken?.name}
                </h1>
                <RiVerifiedBadgeFill className="text-blue-500 mt-2" />
              </div>
              <div className="">
                <h1 className="text-[11px] mt-3 text-white">${"0"}</h1>

                <h1 className="text-[10px] ">${"3.99"}</h1>
              </div>
            </button>
          </div>
        ) : (
          <>
            {pairs ? (
              <>
                <div className="h-90 overflow-y-auto grid grid-flow-row gap-2">
                  {pairs.map((item: any, key: any) => {
                    const images = item["info"];
                    const formattedPrice = parseFloat(
                      item["priceUsd"]
                    ).toPrecision(3);
                    if (images) {
                      return (
                        <button
                          key={key}
                          className={`border w-95 m-auto border-gray-700 rounded-md flex justify-between p-2 ${(key =
                            0 && "mt-")}`}
                          style={{ scrollbarWidth: "none" }}
                          onClick={() => {
                            handleSelection(item);
                            setActivate(false);
                          }}
                        >
                          <div className="flex gap-2 p-2 text-sm">
                            {images && (
                              <img
                                src={
                                  images.imageUrl
                                    ? images.imageUrl
                                    : "https://media.tenor.com/SsTnMMMQdkQAAAAe/confusion-emoji.png"
                                }
                                className="size-8 border rounded-full"
                              />
                            )}
                            <h1 className="mt-1.5 text-md text-gray-200 font-bold">
                              {item["baseToken"].name}
                            </h1>
                            <RiVerifiedBadgeFill className="text-blue-500 mt-2" />
                          </div>
                          <div className="">
                            <h1 className="text-[11px] mt-3 text-white">
                              ${formattedPrice}
                            </h1>

                            <h1 className="text-[10px] ">
                              ${parseFloat(formattedPrice).toFixed(3)}
                            </h1>
                          </div>
                        </button>
                      );
                    }
                  })}
                </div>
              </>
            ) : null}
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      <Button onClick={handleOpen}>{children}</Button>
      <Modal
        open={activate}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="overflow-y-auto">
            <div className="flex justify-between">
              <h1>Select Token</h1>
              <h1>X</h1>
            </div>
            <div className="mt-2 flex justify-center mb-2">
              <input
                type="text"
                className="border w-99 rounded-md p-2 border-gray-700"
                placeholder="Enter token or pair address"
                onChange={(e) => {
                  setInput(e?.target?.value);
                }}
              />
            </div>
            <div
              className={`${
                searchResults ? "mt-2" : null
              } grid grid-flow-row gap-2`}
            >
              <MapPairs />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
