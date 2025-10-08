import { useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import ConnectWallet from "./pages/ConnectWallet";
import Dashboard from "./pages/Dashboard";
import Gauges from "./pages/Gauges";
import Home from "./pages/Home";
import LockDex from "./pages/LockDex";
import SwapPage from "./pages/new/SwapPage";

function App() {
  const navigate = useNavigate();
  const loaction = useLocation();
  const [currentRoute, setCurrentRoute] = useState("");
  // const { ready, authenticated }: any = usePrivy();

  // useEffect(() => {}, [location.pathname]);

  // useEffect(() => {
  //   const targetPaths = ["/lock", "/liquidity"];
  //   if ((location.pathname in targetPaths && !ready) || !authenticated) {
  //     setTimeout(() => {
  //       navigate("/connect");
  //     }, 3000);
  //   }
  //   if (location.pathname !== "/connect" && location)
  //     setCurrentRoute(location.pathname);
  // }, [location.pathname]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Home />} />
          <Route path="/lock" element={<LockDex />} />
          <Route path="/gauges" element={<Gauges />} />
          {/* <Route path="/l" element={<LiquidityHub />} /> */}
          <Route path="/liquidity" element={<SwapPage />} />

          <Route
            path="/connect"
            element={<ConnectWallet route={currentRoute} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
