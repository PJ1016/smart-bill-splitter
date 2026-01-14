import { Box, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <Box sx={{ p: 4, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Dashboard Project (Protected)
      </Typography>
      <Typography>
        Welcome to the secret dashboard! If you can see this, you are
        authenticated.
      </Typography>
    </Box>
  );
};

export default Dashboard;
