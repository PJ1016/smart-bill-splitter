import { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../auth/authConfig";
import { Button } from "@mui/material";

const GraphProfile = () => {
  const { instance, accounts } = useMsal();
  const [profile, setProfile] = useState<any>(null);

  const loadProfile = async () => {
    const tokenResponse = await instance.acquireTokenSilent({
      ...loginRequest,
      account: accounts[0],
    });

    const response = await fetch("https://graph.microsoft.com/v1.0/me", {
      headers: {
        Authorization: `Bearer ${tokenResponse.accessToken}`,
      },
    });

    const data = await response.json();
    setProfile(data);
  };

  return (
    <>
      <Button onClick={loadProfile}>Load Graph Profile</Button>

      {profile && <pre>{JSON.stringify(profile, null, 2)}</pre>}
    </>
  );
};

export default GraphProfile;
