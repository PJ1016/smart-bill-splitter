import { useState } from "react";
import { Button, Box, Typography } from "@mui/material";

const ToggleButton = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <Box sx={{ p: 4, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Toggle Project
      </Typography>
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          color: isOn ? "success.main" : "text.secondary",
        }}
      >
        Status: {isOn ? "ON" : "OFF"}
      </Typography>
      <Button
        variant={isOn ? "contained" : "outlined"}
        color={isOn ? "success" : "primary"}
        onClick={() => setIsOn(!isOn)}
      >
        {isOn ? "Turn OFF" : "Turn ON"}
      </Button>
    </Box>
  );
};

export default ToggleButton;
