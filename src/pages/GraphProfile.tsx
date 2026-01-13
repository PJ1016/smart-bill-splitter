import { useGetProfileQuery } from "../features/graph/graphApi";
import { Button, CircularProgress } from "@mui/material";

const GraphProfile = () => {
  const { data: profile, isLoading, isError, refetch } = useGetProfileQuery();

  return (
    <>
      <Button onClick={refetch} disabled={isLoading}>
        Reload Graph Profile
      </Button>
      {isLoading && <CircularProgress size={20} sx={{ ml: 2 }} />}
      {isError && <p>Error loading profile</p>}
      {profile && <pre>{JSON.stringify(profile, null, 2)}</pre>}
    </>
  );
};

export default GraphProfile;
