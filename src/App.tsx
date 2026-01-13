import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import Layout from './components/Layout';
import AddMemory from './pages/AddMemory';
import Memories from './pages/Memories';
import Chat from './pages/Chat';
import Home from './pages/Home';
import ErrorBoundary from './components/ErrorBoundary';
import { store } from './features/memories/store';
import { theme } from './theme';

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
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
