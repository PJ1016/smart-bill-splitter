import { type ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { CloudUpload, ViewList, Chat as ChatIcon, Luggage } from '@mui/icons-material';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Add Memory', path: '/add-memory', icon: CloudUpload },
    { label: 'View Memories', path: '/memories', icon: ViewList },
    { label: 'AI Chat', path: '/chat', icon: ChatIcon },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="static" 
        sx={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Box
              sx={{
                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                borderRadius: '50%',
                p: 1,
                mr: 2,
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              }}
            >
              <Luggage sx={{ fontSize: 28, color: 'white' }} />
            </Box>
            <Typography 
              variant="h4" 
              component="div" 
              sx={{ 
                fontWeight: 800,
                fontFamily: '"Inter", sans-serif',
                letterSpacing: '-0.02em',
                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              Travel Memory Hub
            </Typography>
          </Box>
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Button
                key={item.path}
                onClick={() => navigate(item.path)}
                startIcon={<IconComponent />}
                sx={{
                  background: location.pathname === item.path 
                    ? 'rgba(255, 255, 255, 0.2)' 
                    : 'transparent',
                  color: 'white',
                  mx: 1,
                  borderRadius: 3,
                  px: 3,
                  py: 1.5,
                  fontWeight: 600,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.15)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  );
};

export default Layout;