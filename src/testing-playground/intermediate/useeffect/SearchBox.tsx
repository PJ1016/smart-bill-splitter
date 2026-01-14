import { useState, useEffect } from "react";
import { Box, TextField, Typography } from "@mui/material";

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  return (
    <Box sx={{ p: 4, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Search Project (Debounce)
      </Typography>

      <TextField
        label="Search..."
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
        placeholder="Type something..."
      />

      <Typography variant="body1">
        Searching for: <strong>{debouncedTerm || "..."}</strong>
      </Typography>
    </Box>
  );
};

export default SearchBox;
