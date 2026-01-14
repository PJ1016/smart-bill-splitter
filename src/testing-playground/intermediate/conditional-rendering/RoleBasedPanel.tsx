import { Box, Typography, Alert } from "@mui/material";

interface RoleBasedPanelProps {
  role: "admin" | "user";
}

const RoleBasedPanel = ({ role }: RoleBasedPanelProps) => {
  return (
    <Box sx={{ p: 4, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Admin Panel Project
      </Typography>

      {role === "admin" ? (
        <Box sx={{ bgcolor: "primary.light", p: 3, borderRadius: 1 }}>
          <Typography variant="h6" color="primary.contrastText">
            Admin Dashboard
          </Typography>
          <Typography color="primary.contrastText">
            You have full access to manage users and settings.
          </Typography>
        </Box>
      ) : (
        <Alert severity="error">
          Access Denied: You do not have permission to view this panel.
        </Alert>
      )}
    </Box>
  );
};

export default RoleBasedPanel;
