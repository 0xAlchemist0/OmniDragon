import { PrivyProvider } from "@privy-io/react-auth";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { sonic } from "viem/chains";
import App from "./App.tsx";
import "./index.css";
const appID = import.meta.env.VITE_APP_ID;
const secret = import.meta.env.VITE_APP_SERET;
const clientID = import.meta.env.VITE_CLIENT_ID;
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <PrivyProvider
        appId={appID}
        clientId={clientID}
        config={{
          appearance: {
            theme: "dark",
          },
          defaultChain: sonic,
          supportedChains: [sonic],
        }}
      >
        <App />
      </PrivyProvider>
    </BrowserRouter>
  </StrictMode>
);
