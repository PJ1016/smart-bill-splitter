import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "./auth/msalConfig.ts";

// Wait for the instance to be initialized before rendering
msalInstance.initialize().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </StrictMode>
  );
});
