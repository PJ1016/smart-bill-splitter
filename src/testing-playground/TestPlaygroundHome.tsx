import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const TestPlaygroundHome = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Counter (Basic)",
      path: "/test-playground/counter",
      color: "#e3f2fd",
    },
    {
      title: "Toggle Button (Basic)",
      path: "/test-playground/toggle",
      color: "#e3f2fd",
    },
    {
      title: "User Form (Intermediate)",
      path: "/test-playground/form",
      color: "#fff3e0",
    },
    {
      title: "Role Panel (Intermediate)",
      path: "/test-playground/role",
      color: "#fff3e0",
    },
    {
      title: "Search Box (useEffect)",
      path: "/test-playground/search",
      color: "#fff3e0",
    },
    {
      title: "RTK Query (Redux)",
      path: "/test-playground/rtk-query",
      color: "#f3e5f5",
    },
    {
      title: "Dashboard (Routing)",
      path: "/test-playground/dashboard",
      color: "#e8f5e9",
    },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        🧪 React Testing Playground
      </Typography>
      <Typography paragraph>
        Select a component below to interact with it. Use these examples to
        practice writing tests.
      </Typography>

      <Grid container spacing={3}>
        {sections.map((section) => (
          <Grid item xs={12} sm={6} md={4} key={section.path}>
            <Card sx={{ bgcolor: section.color }}>
              <CardActionArea
                onClick={() => navigate(section.path)}
                sx={{ height: "100%", p: 2 }}
              >
                <CardContent>
                  <Typography variant="h6">{section.title}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TestPlaygroundHome;
