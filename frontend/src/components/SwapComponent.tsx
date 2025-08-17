import { Box, Slider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import { IoWalletOutline } from "react-icons/io5";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 15,
  height: 15,
  border: `2px solid black`,
  borderRadius: 5,
}));

function SwapComponent({ description, manageLock, chainLogo }: any) {
  //     {
  //   title,
  //   description,
  //   mainBtnLabel,
  //   mainBtnAction,
  // }: any

  function TimeSlider() {
    const marks = [
      {
        value: 7,
        label: "7 days",
      },
      {
        value: 14,
        label: "3 months",
      },
      {
        value: 30,
        label: "6 months",
      },
      {
        value: 60,
        label: "1 year",
      },

      {
        value: 365,
        label: "1 yer",
      },
    ];

    function valuetext(value: number) {
      return `${value}`;
    }
    return (
      <Box sx={{ width: "90%", color: "white" }}>
        <Slider
          aria-label="Restricted values"
          defaultValue={7}
          getAriaValueText={valuetext}
          step={null}
          valueLabelDisplay="auto"
          marks={marks}
          sx={{
            "& .MuiSlider-markLabel": {
              //   color: "white",
              fontSize: "10px", // smaller so they fit
              whiteSpace: "nowrap",
            },
            "& .MuiSlider-markLabel[data-index]": {
              display: "block !important", // force all labels
            },
          }}
        />
      </Box>
    );
  }

  function LockCalculation() {
    return (
      <div className="grid grid-rows-1 gap-3">
        <div className="border rounded-md text-right bg-gray-800 border-gray-600 text-white">
          <span className="grid grid-rows-1 p-5">
            <h1 className="text-lg">4 Years</h1>
            <h1 className="text-xs">New Lock Time</h1>
          </span>
        </div>
        <div className="border rounded-md text-right bg-gray-800 border-gray-600 text-white">
          <span className="grid grid-rows-1 p-5">
            <h1 className="text-lg">0.00 VeDragon</h1>
            <h1 className="text-xs">New estimated voting power</h1>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* <div className="p-6">hello</div> */}
      <div className="border bg-[#0f172afa] border-gray-600 rounded-lg w-md m-auto p-5">
        <h1 className="font-bold text-xl text-white">Create New Lock</h1>
        <div className="border mt-2 border-gray-800"></div>
        <h3 className="text-xs mt-3 text-gray-400">{description}</h3>
      </div>
      <div className="mt-4 border bg-[#0f172afa] border-gray-600 rounded-lg w-md m-auto p-5">
        <span className="flex justify-between text-white mt-0.5">
          <h1>Amount</h1>
          <h1 className="text-sm text-gray-600 flex gap-2">
            <IoWalletOutline className="mt-0.5" />
            0.0 Dragon
          </h1>
        </span>
        <div className="border mt-3 border-gray-600 rounded-md p-3 text-white ">
          <span className="flex justify-between">
            <span className="border rounded-lg border-gray-600 bg-[#0e1627] flex gap-2 p-2 mt-1">
              <img
                src="https://docs.omnidragon.io/img/logo.svg"
                alt=""
                className="size-5"
              />
              <h1 className="text-xs mt-1">Dragon</h1>
            </span>
            <span className="grid grid-rows-1 text-gray-600">
              <h1 className="text-2xl text-right">0</h1>
              <h1 className="text-xs">~$0.00</h1>
            </span>
          </span>
        </div>
        <div className="flex justify-center mt-4">
          <TimeSlider />
        </div>
        <div>
          <LockCalculation />
        </div>
        <div className="flex gap-3 justify-center mt-5 text-white">
          <button className="border p-2.5 rounded-lg w-50 border-gray-600 bg-gray-700">
            Cancel
          </button>
          <button className="border p-2.5 rounded-lg w-50 border-gray-600 bg-amber-600">
            Create Lock
          </button>
        </div>
      </div>
    </div>
  );
}

export default SwapComponent;
