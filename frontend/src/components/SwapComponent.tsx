import { Box, Slider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoWalletOutline } from "react-icons/io5";
import { useTxService } from "../state/TxServiceProvider";
import { omniDRAGONAbi } from "../utils/abi/omniDRAGONAbi";
import contracts from "../utils/contracts";
import { dateToTimestamp } from "../utils/conversionHandler";

function SwapComponent({ description, manageLock, chainLogo, balances }: any) {
  const [duration, setDuration] = React.useState(7);
  const [votingPower, setVotingPower] = useState(null);
  const [lockAmount, setLockAmount] = useState(0);
  const { reader, writer }: any = useTxService();

  useEffect(() => {
    getVotingPower();
  }, [lockAmount, duration]);

  async function getVotingPower() {
    const convertedDuration = dateToTimestamp(duration);

    if (lockAmount > 0) {
      const powerRes = await reader.calculateVotingPower(
        String(lockAmount),
        String(convertedDuration)
      );
      setVotingPower(powerRes);

      //voting power goes here
    }
  }

  async function excecuteLock() {
    const convertedDuration = dateToTimestamp(duration);

    //we have to approve spending on the dragon contract so vedragon can spend
    const approval = await writer.approveTokens(
      contracts.Tokens.veDRAGON,
      lockAmount,
      contracts.Tokens.omniDRAGON,
      omniDRAGONAbi
    );

    const lockRes = await writer.lock(lockAmount, convertedDuration);
    //tx exec goes here
  }

  function handleAmountChange(event: any) {
    setLockAmount(event.target.value);
  }

  function TimeSlider() {
    const marks = [
      { value: 7, label: "7 days" },
      { value: 90, label: "3 months" },
      { value: 180, label: "6 months" },
      { value: 270, label: "9 months" },

      { value: 365, label: "1 year" },
    ];
    const handleChange = (_: Event, newValue: number | number[]) => {
      setDuration(newValue as number);
    };

    return (
      <Box sx={{ width: "90%", color: "white" }}>
        <Slider
          aria-label="Lock duration"
          defaultValue={7}
          value={duration}
          onChange={handleChange}
          step={null}
          marks={marks}
          min={7}
          max={365}
          valueLabelDisplay="off"
          sx={{
            "& .MuiSlider-markLabel": {
              fontSize: "10px",
              whiteSpace: "nowrap",
              display: "block",
              color: "white",
            },
            "& .MuiSlider-mark": {
              display: "block",
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
            <h1 className="text-lg">{duration} Years</h1>
            <h1 className="text-xs">New Lock Time</h1>
          </span>
        </div>
        <div className="border rounded-md text-right bg-gray-800 border-gray-600 text-white">
          <span className="grid grid-rows-1 p-5">
            <h1 className="text-lg">{votingPower || 0.0} VeDragon</h1>
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
            Dragon
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
            <div className="grid grid-rows-1 text-gray-600">
              <input
                type="number"
                className="text-2xl text-right w-70 outline-0 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance:textfield]"
                defaultValue={0}
                onChange={handleAmountChange}
              />

              <h1 className="text-xs text-right">~$0.00</h1>
            </div>
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
          <button
            className="border p-2.5 rounded-lg w-50 border-gray-600 bg-amber-600"
            onClick={() => {
              excecuteLock();
            }}
          >
            Create Lock
          </button>
        </div>
      </div>
    </div>
  );
}

export default SwapComponent;
