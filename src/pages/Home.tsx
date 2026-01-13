import { Box, Typography, Container, Grid, Card, CardContent, Button, useTheme } from '@mui/material';
import { CloudUpload, ViewList, Chat, Luggage, ArrowForward } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const actions = [
    {
      title: 'Add New Memory',
      description: 'Capture a new travel experience, photo, or note to remember forever.',
      icon: CloudUpload,
      path: '/add-memory',
      color: theme.palette.primary.main,
    },
    {
      title: 'View Memories',
      description: 'Explore your collection of past adventures and cherished moments.',
      icon: ViewList,
      path: '/memories',
      color: theme.palette.success.main,
    },
    {
      title: 'AI Travel Chat',
      description: 'Chat with your AI assistant to recall specific details from your trips.',
      icon: Chat,
      path: '/chat',
      color: theme.palette.info.main,
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Box
          sx={{
            display: 'inline-flex',
            p: 2,
            borderRadius: '50%',
            bgcolor: 'primary.light',
            color: 'primary.main',
            mb: 3,
            boxShadow: '0 0 0 8px rgba(37, 99, 235, 0.1)',
          }}
        >
          <Luggage sx={{ fontSize: 48 }} />
        </Box>
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom 
          sx={{ fontWeight: 800, color: 'text.primary', letterSpacing: '-0.02em' }}
        >
          Welcome to Travel Memory Hub
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary" 
          sx={{ maxWidth: 600, mx: 'auto', mb: 8, fontWeight: 400 }}
        >
          Your personal space to curate, organize, and relive your travel experiences. 
          What would you like to do today?
        </Typography>

        <Grid container spacing={4}>
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Grid item xs={12} md={4} key={action.title}>
                <Card 
                  elevation={0}
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    border: '1px solid',
                    borderColor: 'grey.200',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: action.color,
                      transform: 'translateY(-4px)',
                      boxShadow: `0 10px 15px -3px rgba(0, 0, 0, 0.05)`,
                    }
                  }}
                  onClick={() => navigate(action.path)}
                >
                  <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <Box 
                      sx={{ 
                        width: 48, 
                        height: 48, 
                        borderRadius: 2, 
                        bgcolor: `${action.color}15`, // 15 is roughly 8% opacity in hex
                        color: action.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                      }}
                    >
                      <Icon sx={{ fontSize: 24 }} />
                    </Box>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
                      {action.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
                      {action.description}
                    </Typography>
                    <Button 
                        endIcon={<ArrowForward />} 
                        sx={{ 
                            alignSelf: 'flex-start', 
                            color: action.color,
                            p: 0,
                            minWidth: 0,
                            '&:hover': {
                                bgcolor: 'transparent',
                                textDecoration: 'underline',
                            }
                        }}
                    >
                        Get Started
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
