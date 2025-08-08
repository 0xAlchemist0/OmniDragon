import { PrivyProvider } from "@privy-io/react-auth";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
const appID = import.meta.env.VITE_APP_ID;
const secret = import.meta.env.VITE_APP_SERET;
const clientID = import.meta.env.VITE_CLIENT_ID;
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrivyProvider
      appId={appID}
      clientId={clientID}
      config={{
        appearance: {
          theme: "dark",
        },
      }}
    >
      <App />
    </PrivyProvider>
  </StrictMode>
);
