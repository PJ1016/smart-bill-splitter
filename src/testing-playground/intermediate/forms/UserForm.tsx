import { useState, FormEvent } from "react";
import { Button, TextField, Box, Typography, Alert } from "@mui/material";

const UserForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  // Simple validation
  const isNameValid = formData.name.length > 2;
  const isEmailValid = formData.email.includes("@");
  const isValid = isNameValid && isEmailValid;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isValid) {
      console.log("Form Submitted:", formData);
      setSubmitted(true);
    }
  };

  return (
    <Box sx={{ p: 4, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        User Form Project
      </Typography>

      {submitted ? (
        <Alert severity="success" sx={{ mb: 2 }}>
          Successfully submitted!
        </Alert>
      ) : null}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={formData.name.length > 0 && !isNameValid}
          helperText={
            formData.name.length > 0 && !isNameValid
              ? "Name must be > 2 chars"
              : ""
          }
          inputProps={{ "aria-label": "name-input" }}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={formData.email.length > 0 && !isEmailValid}
          helperText={
            formData.email.length > 0 && !isEmailValid ? "Invalid email" : ""
          }
          inputProps={{ "aria-label": "email-input" }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={!isValid}
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default UserForm;
