import { debounce } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import * as React from "react";
import { FaCoins, FaSearch } from "react-icons/fa";
const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#1A1C1F",
  borderRadius: "15px",
  boxShadow: 24,
  border: "1px solid rgba(255, 255, 255, 0.1)",
  p: { xs: 2.5, sm: 3.5, md: 4 },
  width: {
    xs: "85%", // mobile
    sm: 450, // tablets
    md: 450, // desktop
  },
  maxHeight: "90vh",
  overflowY: "auto",
};

export default React.memo(
  function NewTokenModal({
    open,
    onOpen,
    onClose,
    pairs,
    setter,
    state,
    type,
    setSearchInput,
    searchInput,
    search,
    children,
  }: any) {
    const [input, setInput] = React.useState("");
    const style = {
      border: "1px solid",
      borderColor: "grey.800",
      p: 1,
      whiteSpace: "nowrap",
      borderRadius: "0.5rem", // lg = 0.5rem
      display: "flex",
      gap: "0.375rem", // 1.5 * 0.25rem
      bgcolor: "#11182733", // gray-800/90
      color: "white",
      cursor: "pointer",
    };
    // ✅ Stable debounced search function (memoized once)
    const debouncedSearch = React.useMemo(
      () =>
        debounce((type: any, value: string) => {
          search(type, value, value.length <= 1);
        }, 300),
      [search]
    );

    // ✅ Clean up to avoid memory leaks

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInput(value);
      debouncedSearch(type, value); // always use latest input directly
    };
    React.useEffect(() => {
      console.log("input event: ,", input);
    }, [input]);
    function FeaturedPairs({ image = null }: any) {
      console.log(pairs);
      return (
        <div className="grid grid-flow-col gap-2 mt-4 p-2 gap-y-3">
          {pairs.pairs &&
            pairs.pairs.map((item: any, index: any) => {
              if (index <= 3) {
                return (
                  <button
                    className="border hover:cursor-pointer flex col-span-1 p-1 justify-start  gap-2 bg-gray-900/60 border-gray-700/40 p-2 rounded-xl"
                    key={index}
                    onClick={() => {
                      setter({ ...state, [type]: item });
                      onClose();
                    }}
                  >
                    <img
                      src={item.image ? item.image : ""}
                      alt=""
                      className="size-5 rounded-full "
                    />
                    <h1 className="text-xs text-center font-semibold text-gray-400 mt-1">
                      {item.symbol}
                    </h1>
                  </button>
                );
              }
            })}
        </div>
      );
    }

    function Pairs({ handleClose }: any) {
      console.log("reuslt: ", pairs.searchResults);
      return (
        <div className="p-3 overflow-y-auto h-130 no-scrollbar">
          <span className="flex gap-2 ">
            <FaCoins className="text-gray-600 mt-1" />
            <h1 className="text-sm mt-1 font-bold">Your tokens</h1>
          </span>
          {pairs.searchResults ? (
            <button
              className="grid grid-cols-8 mt-3 w-full p-2 hover:bg-stone-900/90"
              onClick={() => {
                setter({ ...state, [String(type)]: pairs.searchResults });
                search(type, "", true);
                console.log("clicked");
                handleClose();
              }}
            >
              <span className="col-span-1">
                <img
                  src={
                    pairs.searchResults.image
                      ? pairs.searchResults.image
                      : "https://media.tenor.com/SsTnMMMQdkQAAAAe/confusion-emoji.png"
                  }
                  alt=""
                  className="size-10 mx-auto mt-1 my-auto rounded-full"
                />
              </span>
              <span className="col-span-5 text-left ms-2">
                <h1 className="font-semibold text-gray-400 text-lg">
                  {pairs.searchResults.name}
                </h1>
                <h1 className="font-light text-gray-500 text-sm">
                  {pairs.searchResults.symbol}
                </h1>
              </span>
              <span className="col-span-2 text-right">
                <h1 className="text-lg font-bold">
                  {" "}
                  {pairs.searchResults.balance}
                </h1>
                <h1 className="text-sm">
                  {" $"}
                  {parseFloat(
                    parseFloat(pairs.searchResults.balance) *
                      parseFloat(pairs.searchResults.priceUsd)
                  ).toFixed(2)}
                </h1>
              </span>
            </button>
          ) : (
            pairs.pairs && (
              <>
                {pairs.pairs.map((item: any, index: any) => (
                  <button
                    className="grid grid-cols-8 mt-3 w-full p-3 hover:bg-stone-900/90 hover:cursor-pointer"
                    key={index}
                    onClick={() => {
                      setter({ ...state, [String(type)]: item });
                      search(type, "", true);
                      console.log("clicked");
                      onClose();
                    }}
                  >
                    <span className="col-span-1">
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
                    <span className="col-span-5 text-left ms-2">
                      <h1 className="font-semibold text-gray-400 text-md">
                        {item.name}
                      </h1>
                      <h1 className="font-light text-gray-500 text-sm">
                        {item.symbol}
                      </h1>
                    </span>
                    <span className="col-span-2 text-right">
                      <h1 className="text-lg font-bold">
                        $
                        {parseFloat(
                          parseFloat(item.balance) * parseFloat(item.priceUsd)
                        ).toFixed(2)}
                      </h1>
                      <h1 className="text-sm">{item.balance}</h1>
                    </span>
                  </button>
                ))}
              </>
            )
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
          onClick={onOpen}
          sx={style}
          className="border p-2 me-2  p-3 text-nowrap rounded-lg  gap-1.5  border-gray-600  bg-gray-900/20 text-white hover:cursor-pointer "
        >
          {children}
        </Button>
        <Modal
          open={open}
          disableAutoFocus
          disableEnforceFocus
          onClose={onClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          hideBackdrop={false}
        >
          <Box sx={boxStyle} onClick={(e) => e.stopPropagation()}>
            <div>
              <div className="mt-2 border border-gray-600/40 grid grid-cols-8 p-1.5 rounded-md  bg-gray-800/30">
                <FaSearch className="text-gray-500 col-span-1 mt-[7px] ms-4 text-sm" />
                <input
                  type="text"
                  className=" col-span-6 p-1  outline-none font-bold text-sm"
                  placeholder="Search by name, symbool, or address"
                  value={input}
                  onChange={handleChange}
                />
                {/* <button className=" col-span-1 flex gap-2 flex justify-end">
                  <img
                    src="https://app.uniswap.org/assets/all-networks-icon-yW1hkVHa.png"
                    alt=""
                    className="size-6.5 mt-0.5"
                  />
                  <IoIosArrowDown className="mt-1.5 text-gray-300 font-bold text-md" />
                </button> */}
              </div>
            </div>
            {/* featured pairs found here */}
            <FeaturedPairs />
            {/* token pairs available go here */}
            <Pairs handleClose={onClose} setter={setter} />
          </Box>
        </Modal>
      </div>
    );
  }

  //  <input
  //               type="text"
  //               className=" col-span-6 p-1  outline-none font-bold text-sm"
  //               placeholder="Enter a token"
  //               value={searchInput[type] || ""}
  //               onChange={(e) => {
  //                 setSearchInput((prev: any) => ({
  //                   ...prev,
  //                   [type]: e.target.value,
  //                 }));
  //               }}
  //             />
);
