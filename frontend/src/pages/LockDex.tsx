import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect } from "react";
import ClaimLock from "../components/ClaimLock";
import SwapComponent from "../components/SwapComponent";
//0 lock, 1 claim
function LockDex() {
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    console.log(value);
  }, [value]);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="">
      <div className="p-1 mb-3  w-md flex m-auto">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              border: "1px solid gray", // border around all tabs
              borderRadius: "8px",
              minHeight: "40px",
              "& .MuiTabs-flexContainer": {
                display: "flex",
              },
              "& .MuiTabs-indicator": {
                display: "none", // hide default underline indicator
              },
            }}
          >
            <Tab
              label="Lock"
              className=""
              sx={{
                flex: 1, // all tabs equal width
                borderRight: "1px solid gray", // divider between tabs
                textTransform: "none",
                fontWeight: "bold",
                minHeight: "40px",
                color: "white",
                "&.Mui-selected": {
                  backgroundColor: "#0f172afa",
                  color: "white",
                },
              }}
            />
            <Tab
              label="Claim"
              sx={{
                flex: 1, // all tabs equal width
                borderRight: "1px solid gray", // divider between tabs
                textTransform: "none",
                fontWeight: "bold",
                minHeight: "40px",
                color: "white",
                "&.Mui-selected": {
                  backgroundColor: "#0f172afa",
                  color: "white",
                },
              }}
            />
          </Tabs>
        </Box>
      </div>
      {value == 0 ? (
        <SwapComponent
          description={
            "Locking DRAGON gives you veDRAGON, which lets you earn boosted rewards from gauges, influence reward distribution through voting, and get access to lotteries and partner incentives."
          }
          manageLock={true}
          chainLogo={
            "https://theoregongroup.com/wp-content/uploads/2024/12/sonic-fantom-crypto.jpg"
          }
        />
      ) : (
        <ClaimLock />
      )}
    </div>
  );
}

export default LockDex;
