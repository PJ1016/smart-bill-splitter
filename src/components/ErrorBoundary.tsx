import React, { Component, type ReactNode } from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { ErrorOutline, Refresh } from '@mui/icons-material';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Card sx={{ maxWidth: 400, mx: 'auto' }}>
            <CardContent>
              <ErrorOutline sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Something went wrong
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                We're sorry, but something unexpected happened. Please try refreshing the page.
              </Typography>
              <Button
                variant="contained"
                startIcon={<Refresh />}
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
            </CardContent>
          </Card>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;