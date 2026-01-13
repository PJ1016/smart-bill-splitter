import { type ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
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
    { label: 'Memories', path: '/memories', icon: ViewList },
    { label: 'AI Chat', path: '/chat', icon: ChatIcon },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 70 } }}>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                flexGrow: 1, 
                cursor: 'pointer',
                gap: 1.5 
              }}
              onClick={() => navigate('/')}
            >
              <Box
                sx={{
                  bgcolor: 'primary.main',
                  borderRadius: 2,
                  p: 0.8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Luggage sx={{ fontSize: 24, color: 'white' }} />
              </Box>
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  fontWeight: 700,
                  color: 'text.primary',
                  letterSpacing: '-0.02em',
                }}
              >
                Travel Memory Hub
              </Typography>
            </Box>
            
            <Box component="nav" sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const IconComponent = item.icon;
                return (
                  <Button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    startIcon={<IconComponent />}
                    variant="text"
                    sx={{
                      color: isActive ? 'primary.main' : 'text.secondary',
                      bgcolor: isActive ? 'primary.light' : 'transparent',
                      background: isActive ? (theme) => alpha(theme.palette.primary.main, 0.1) : 'transparent',
                      fontWeight: 600,
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      '&:hover': {
                        bgcolor: (theme) => alpha(theme.palette.primary.main, isActive ? 0.15 : 0.05),
                        color: isActive ? 'primary.main' : 'text.primary',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
      <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Box>
    </Box>
  );
};
import { alpha } from '@mui/material/styles';

export default Layout;
