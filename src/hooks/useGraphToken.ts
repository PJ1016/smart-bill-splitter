import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../auth/authConfig";

export const useGraphToken = () => {
  const { instance, accounts } = useMsal();

  const getAccessToken = async () => {
    if (!accounts.length) {
      throw new Error("No active account");
    }
    // This is where access token is retrieved
    const response = await instance.acquireTokenSilent({
      ...loginRequest,
      account: accounts[0],
    });
    // Return the access token
    return response.accessToken;
  };

  return { getAccessToken };
};
