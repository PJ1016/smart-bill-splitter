import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useGetUsersQuery, useAddUserMutation } from "../api/usersApi";
import { Provider } from "react-redux";
import { playgroundStore } from "../store";

// Helper component to provide the store locally for this example
const UsersPageContent = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const [addUser, { isLoading: isAdding }] = useAddUserMutation();
  const [localUsers, setLocalUsers] = useState<{ id: number; name: string }[]>(
    []
  );

  const handleAddUser = async () => {
    // Since JSONPlaceholder doesn't actually persist, we simulate a UI update
    // But importantly, we still trigger the real mutation hook logic.
    await addUser({ name: "New User" });
    setLocalUsers((prev) => [
      ...prev,
      { id: Date.now(), name: "New User (Simulated)" },
    ]);
  };

  return (
    <Box sx={{ p: 4, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        RTK Query Users Project
      </Typography>

      <Button
        variant="contained"
        onClick={handleAddUser}
        disabled={isAdding}
        sx={{ mb: 2 }}
      >
        {isAdding ? "Adding..." : "Add User"}
      </Button>

      {isLoading && <CircularProgress />}
      {isError && <Alert severity="error">Error fetching users</Alert>}

      <List>
        {users?.map((user) => (
          <ListItem key={user.id}>
            <ListItemText primary={user.name} />
          </ListItem>
        ))}
        {localUsers.map((user) => (
          <ListItem key={user.id}>
            <ListItemText
              primary={user.name}
              secondary="Local optimistic update"
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

// Wrap in Provider just for this isolated example page
const UsersPage = () => (
  <Provider store={playgroundStore}>
    <UsersPageContent />
  </Provider>
);

export default UsersPage;
