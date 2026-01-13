import { Box, Paper, Typography, Card, CardContent, Chip } from '@mui/material';
import { categoryColors } from '../theme';

interface Memory {
  placeName: string;
  city: string;
  category: string;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  memories?: Memory[];
}

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble = ({ message }: ChatBubbleProps) => {
  const getCategoryChip = (category: string) => {
    const colors = categoryColors[category as keyof typeof categoryColors] || categoryColors.Other;
    return {
      backgroundColor: colors.light,
      color: colors.dark,
      fontWeight: 600,
      border: 'none',
    };
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: message.isUser ? 'flex-end' : 'flex-start',
        mb: 3,
      }}
    >
      <Box sx={{ maxWidth: '75%' }}>
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            bgcolor: message.isUser ? 'primary.main' : 'white',
            color: message.isUser ? 'primary.contrastText' : 'text.primary',
            borderRadius: 3,
            borderTopLeftRadius: message.isUser ? 12 : 0,
            borderTopRightRadius: message.isUser ? 0 : 12,
            border: message.isUser ? 'none' : '1px solid',
            borderColor: 'grey.200',
            boxShadow: message.isUser ? '0 4px 6px -1px rgba(37, 99, 235, 0.2)' : '0 1px 2px 0 rgba(0,0,0,0.05)',
          }}
        >
          <Typography 
            variant="body1"
            sx={{
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            {message.text}
          </Typography>
          
          {message.memories && (
            <Box sx={{ mt: 2.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {message.memories.map((memory, index) => (
                <Card 
                  key={index} 
                  elevation={0}
                  sx={{ 
                    bgcolor: message.isUser ? 'rgba(255,255,255,0.1)' : 'grey.50',
                    border: '1px solid',
                    borderColor: message.isUser ? 'rgba(255,255,255,0.2)' : 'grey.200',
                  }}
                >
                  <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                    <Typography 
                      variant="subtitle2" 
                      sx={{
                        color: message.isUser ? 'white' : 'text.primary',
                        fontWeight: 700,
                      }}
                    >
                      {memory.placeName}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{
                        color: message.isUser ? 'rgba(255,255,255,0.9)' : 'text.secondary',
                        mb: 1,
                      }}
                    >
                      {memory.city}
                    </Typography>
                    <Chip
                      label={memory.category}
                      size="small"
                      sx={getCategoryChip(memory.category)}
                    />
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
          
          <Typography 
            variant="caption" 
            sx={{ 
              color: message.isUser ? 'rgba(255,255,255,0.7)' : 'text.secondary',
              display: 'block', 
              mt: 1,
              textAlign: 'right',
            }}
          >
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default ChatBubble;
