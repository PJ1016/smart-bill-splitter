import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import Layout from './components/Layout';
import AddMemory from './pages/AddMemory';
import Memories from './pages/Memories';
import Chat from './pages/Chat';
import ErrorBoundary from './components/ErrorBoundary';
import { store } from './features/memories/store';

// Travel Memory Hub Brand Theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976D2', // Sky Blue - Trust & Navigation
      light: '#42A5F5',
      dark: '#1565C0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FF7043', // Sunset Orange - Action & Energy
      light: '#FF8A65',
      dark: '#F4511E',
      contrastText: '#ffffff',
    },
    success: {
      main: '#388E3C', // Food Category Green
      light: '#66BB6A',
      dark: '#2E7D32',
    },
    info: {
      main: '#0288D1', // Stay Category Blue
      light: '#29B6F6',
      dark: '#0277BD',
    },
    warning: {
      main: '#FFC107', // Highlight Yellow
      light: '#FFD54F',
      dark: '#FFA000',
    },
    error: {
      main: '#D32F2F',
      light: '#EF5350',
      dark: '#C62828',
    },
    background: {
      default: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Modern gradient
      paper: '#FFFFFF',
    },
    text: {
      primary: '#212121',
      secondary: '#616161',
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h3: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.3,
    },
    h4: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h6: {
      fontFamily: '"Inter", sans-serif',
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
    },
    body1: {
      fontFamily: '"Roboto", sans-serif',
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: '"Roboto", sans-serif',
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 12, // Soft rounded corners
  },
  shadows: [
    'none',
    '0px 1px 3px rgba(0, 0, 0, 0.08), 0px 1px 2px rgba(0, 0, 0, 0.12)',
    '0px 1px 5px rgba(0, 0, 0, 0.08), 0px 2px 2px rgba(0, 0, 0, 0.12)',
    '0px 1px 8px rgba(0, 0, 0, 0.08), 0px 3px 4px rgba(0, 0, 0, 0.12)',
    '0px 2px 4px rgba(0, 0, 0, 0.08), 0px 4px 5px rgba(0, 0, 0, 0.12)',
    '0px 3px 5px rgba(0, 0, 0, 0.08), 0px 5px 8px rgba(0, 0, 0, 0.12)',
    '0px 3px 5px rgba(0, 0, 0, 0.08), 0px 6px 10px rgba(0, 0, 0, 0.12)',
    '0px 4px 5px rgba(0, 0, 0, 0.08), 0px 8px 10px rgba(0, 0, 0, 0.12)',
    '0px 5px 5px rgba(0, 0, 0, 0.08), 0px 10px 10px rgba(0, 0, 0, 0.12)',
    '0px 5px 6px rgba(0, 0, 0, 0.08), 0px 12px 15px rgba(0, 0, 0, 0.12)',
    '0px 6px 6px rgba(0, 0, 0, 0.08), 0px 15px 20px rgba(0, 0, 0, 0.12)',
    '0px 6px 7px rgba(0, 0, 0, 0.08), 0px 18px 25px rgba(0, 0, 0, 0.12)',
    '0px 7px 8px rgba(0, 0, 0, 0.08), 0px 20px 25px rgba(0, 0, 0, 0.12)',
    '0px 7px 8px rgba(0, 0, 0, 0.08), 0px 22px 30px rgba(0, 0, 0, 0.12)',
    '0px 7px 9px rgba(0, 0, 0, 0.08), 0px 25px 35px rgba(0, 0, 0, 0.12)',
    '0px 8px 9px rgba(0, 0, 0, 0.08), 0px 28px 40px rgba(0, 0, 0, 0.12)',
    '0px 8px 10px rgba(0, 0, 0, 0.08), 0px 30px 45px rgba(0, 0, 0, 0.12)',
    '0px 8px 11px rgba(0, 0, 0, 0.08), 0px 35px 50px rgba(0, 0, 0, 0.12)',
    '0px 9px 11px rgba(0, 0, 0, 0.08), 0px 40px 55px rgba(0, 0, 0, 0.12)',
    '0px 9px 12px rgba(0, 0, 0, 0.08), 0px 45px 60px rgba(0, 0, 0, 0.12)',
    '0px 10px 13px rgba(0, 0, 0, 0.08), 0px 50px 65px rgba(0, 0, 0, 0.12)',
    '0px 10px 13px rgba(0, 0, 0, 0.08), 0px 55px 70px rgba(0, 0, 0, 0.12)',
    '0px 10px 14px rgba(0, 0, 0, 0.08), 0px 60px 75px rgba(0, 0, 0, 0.12)',
    '0px 11px 14px rgba(0, 0, 0, 0.08), 0px 65px 80px rgba(0, 0, 0, 0.12)',
    '0px 11px 15px rgba(0, 0, 0, 0.08), 0px 70px 85px rgba(0, 0, 0, 0.12)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: '100vh',
          backgroundAttachment: 'fixed',
        },
        '@font-face': [
          {
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontDisplay: 'swap',
            fontWeight: 400,
            src: `url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap')`,
          },
        ],
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(30, 30, 30, 0.9) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 215, 0, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          '&:hover': {
            boxShadow: '0 16px 48px rgba(255, 107, 107, 0.2)',
            transform: 'translateY(-4px) scale(1.02)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            border: '1px solid rgba(255, 107, 107, 0.5)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.95rem',
          padding: '12px 28px',
          boxShadow: 'none',
          position: 'relative',
          overflow: 'hidden',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            transition: 'left 0.5s',
          },
          '&:hover': {
            boxShadow: '0 8px 25px rgba(25, 118, 210, 0.3)',
            transform: 'translateY(-2px)',
            '&:before': {
              left: '100%',
            },
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #5a67d8 30%, #6b46c1 90%)',
            boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 215, 0, 0.5)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(255, 215, 0, 0.8)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FFD700',
          },
          '& .MuiSelect-select': {
            color: '#FFFFFF',
            fontWeight: 500,
          },
          '& .MuiSvgIcon-root': {
            color: '#4ECDC4',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#4ECDC4',
          fontWeight: 600,
          '&.Mui-focused': {
            color: '#FFD700',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '& fieldset': {
              borderColor: 'rgba(255, 215, 0, 0.5)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 215, 0, 0.8)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FFD700',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#4ECDC4',
            fontWeight: 600,
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#FFD700',
          },
          '& .MuiInputBase-input': {
            color: '#FFFFFF',
            fontWeight: 500,
          },
          '& .MuiFormHelperText-root': {
            color: '#FF6B6B',
            fontWeight: 500,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(30, 30, 30, 0.9) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 215, 0, 0.3)',
          borderRadius: 16,
          color: '#FFFFFF',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
        },
        h1: {
          color: '#FFFFFF',
          fontWeight: 800,
        },
        h2: {
          color: '#FFFFFF',
          fontWeight: 700,
        },
        h3: {
          color: '#FFFFFF',
          fontWeight: 700,
        },
        h4: {
          color: '#FFFFFF',
          fontWeight: 600,
        },
        h5: {
          color: '#FFFFFF',
          fontWeight: 600,
        },
        h6: {
          color: '#FFFFFF',
          fontWeight: 600,
        },
        body1: {
          color: '#FFFFFF',
          fontWeight: 500,
        },
        body2: {
          color: '#E0E0E0',
          fontWeight: 500,
        },
        caption: {
          color: '#B0B0B0',
          fontWeight: 500,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          '& .MuiTypography-root': {
            color: '#FFFFFF',
          },
          '& .MuiTypography-h6': {
            color: '#FFD700',
            fontWeight: 700,
          },
          '& .MuiTypography-body2': {
            color: '#4ECDC4',
            fontWeight: 500,
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          '&:hover': {
            backgroundColor: 'rgba(255, 215, 0, 0.2)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(255, 215, 0, 0.3)',
            '&:hover': {
              backgroundColor: 'rgba(255, 215, 0, 0.4)',
            },
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: '#FF6B6B',
          fontWeight: 600,
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          color: '#FFFFFF',
          fontWeight: 600,
        },
      },
    },
  },
});

// Custom category colors
export const categoryColors = {
  Food: { main: '#388E3C', light: '#C8E6C9', dark: '#2E7D32' },
  Stay: { main: '#0288D1', light: '#B3E5FC', dark: '#0277BD' },
  Sightseeing: { main: '#8E24AA', light: '#E1BEE7', dark: '#7B1FA2' },
  Other: { main: '#757575', light: '#E0E0E0', dark: '#616161' },
};

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Navigate to="/add-memory" replace />} />
                <Route path="/add-memory" element={<AddMemory />} />
                <Route path="/memories" element={<Memories />} />
                <Route path="/chat" element={<Chat />} />
              </Routes>
            </Layout>
          </Router>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;