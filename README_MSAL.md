# MSAL Authentication Documentation

This project uses the **Microsoft Authentication Library (MSAL)** for React (`@azure/msal-react` and `@azure/msal-browser`) to handle user authentication via Azure Active Directory (Azure AD).

## 1. Prerequisites (Azure Portal)

To make authentication work, you need an App Registration in the [Azure Portal](https://portal.azure.com/):

1. **Register a new application**:

   - **Supported account types**: Accounts in any organizational directory (Any Azure AD directory - Multitenant) and personal Microsoft accounts (e.g., Skype, Xbox).
   - **Redirect URI**: `http://localhost:5173` (Single-page application).

2. **Copy the Client ID**:
   - You will need the **Application (client) ID** from the Overview blade.

## 2. Configuration (`.env` & `src/auth/msalConfig.ts`)

The MSAL configuration values are now stored in a `.env` file for better security and flexibility.

1.  **Create a `.env` file** in the root of your project (copy from `.env.example`):

    ```env
    VITE_MSAL_CLIENT_ID=your_client_id_here
    VITE_MSAL_AUTHORITY=https://login.microsoftonline.com/common
    VITE_MSAL_REDIRECT_URI=http://localhost:5173
    ```

2.  **The `src/auth/msalConfig.ts` file reads these values**:
    ```typescript
    // src/auth/msalConfig.ts
    export const msalInstance = new PublicClientApplication({
      auth: {
        clientId: import.meta.env.VITE_MSAL_CLIENT_ID,
        authority: import.meta.env.VITE_MSAL_AUTHORITY,
        redirectUri: import.meta.env.VITE_MSAL_REDIRECT_URI,
      },
      // ...
    });
    ```

- **VITE_MSAL_CLIENT_ID**: Your Azure Application (client) ID.
- **VITE_MSAL_AUTHORITY**: The URL that MSAL uses to request tokens.
- **VITE_MSAL_REDIRECT_URI**: Must match what is registered in Azure.

## 3. Initialization (`src/main.tsx`)

The application waits for MSAL to initialize before rendering. This ensures no authentication race conditions occur on startup.

```tsx
// src/main.tsx
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "./auth/msalConfig.ts";

msalInstance.initialize().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </StrictMode>
  );
});
```

## 4. Protecting Routes (`src/App.tsx`)

We use `MsalAuthenticationTemplate` to wrap the entire application (or specific routes). This component automatically handles the login flow if a user is not authenticated.

```tsx
// src/App.tsx
import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";

function App() {
  return (
    <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
      {/* Your protected app content */}
    </MsalAuthenticationTemplate>
  );
}
```

- **interactionType**: `InteractionType.Redirect` (redirects to Microsoft login page) or `InteractionType.Popup` (opens a popup window).

## 5. Accessing User Info (`src/pages/Home.tsx`)

You can access the authenticated user's account information using the `useMsal` hook.

```tsx
// src/pages/Home.tsx
import { useMsal } from "@azure/msal-react";

const Home = () => {
  const { accounts } = useMsal();
  const userName = accounts[0]?.name || "Traveler";

  return <h1>Welcome back, {userName}!</h1>;
};
```

## 6. Access Token & API Calls

To call a protected API, you need to acquire an access token.

```typescript
const { instance, accounts } = useMsal();

const request = {
  scopes: ["User.Read"],
  account: accounts[0],
};

instance
  .acquireTokenSilent(request)
  .then((response) => {
    // call API with response.accessToken
  })
  .catch((e) => {
    instance.acquireTokenPopup(request).then((response) => {
      // call API with response.accessToken
    });
  });
```
