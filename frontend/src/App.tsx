import { useWallets } from "@privy-io/react-auth";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import Gauges from "./pages/Gauges";
import Home from "./pages/Home";
import LiquidityHub from "./pages/LiquidityHub";
import LockDex from "./pages/LockDex";

function App() {
  const { wallets } = useWallets();
  const [rInstance, setRInstance] = React.useState(null);
  const [wInstance, setWInstance] = React.useState(null);

  useEffect(() => {}, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Home />} />
            <Route path="/lock" element={<LockDex />} />
            <Route path="/gauges" element={<Gauges />} />
            <Route path="/liquidity" element={<LiquidityHub />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
