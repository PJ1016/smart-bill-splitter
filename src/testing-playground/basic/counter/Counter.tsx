import { useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import { increment, decrement } from "./counterUtils";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <Box sx={{ p: 4, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Counter Project
      </Typography>
      <Typography variant="h3" data-testid="count-value" sx={{ mb: 2 }}>
        {count}
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCount(increment(count))}
        >
          Increment
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => setCount(decrement(count))}
        >
          Decrement
        </Button>
      </Box>
    </Box>
  );
};

export default Counter;
