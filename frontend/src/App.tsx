import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import LockDex from "./pages/LockDex";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Home />} />
            <Route path="/lock" element={<LockDex />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
