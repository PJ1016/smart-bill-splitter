import { Box, Paper, Typography, Card, CardContent, Chip } from '@mui/material';
import { categoryColors } from '../App';

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
    };
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: message.isUser ? 'flex-end' : 'flex-start',
        mb: 2,
      }}
    >
      <Paper
        sx={{
          p: 2.5,
          maxWidth: '70%',
          background: message.isUser 
            ? 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)' 
            : 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(30, 30, 30, 0.95) 100%)',
          color: '#FFFFFF',
          borderRadius: 3,
          border: message.isUser ? 'none' : '1px solid rgba(255, 215, 0, 0.3)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <Typography 
          variant="body1"
          sx={{
            color: '#FFFFFF',
            fontWeight: 500,
          }}
        >
          {message.text}
        </Typography>
        
        {message.memories && (
          <Box sx={{ mt: 2 }}>
            {message.memories.map((memory, index) => (
              <Card 
                key={index} 
                sx={{ 
                  mb: 1, 
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(20, 20, 20, 0.9) 100%)',
                  border: '1px solid rgba(78, 205, 196, 0.3)',
                }}
              >
                <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{
                      color: '#FFD700',
                      fontWeight: 700,
                    }}
                  >
                    {memory.placeName}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{
                      color: '#4ECDC4',
                      fontWeight: 600,
                    }}
                  >
                    {memory.city}
                  </Typography>
                  <Chip
                    label={memory.category}
                    size="small"
                    sx={{ mt: 0.5, ...getCategoryChip(memory.category) }}
                  />
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
        
        <Typography 
          variant="caption" 
          sx={{ 
            color: '#B0B0B0',
            fontWeight: 500,
            display: 'block', 
            mt: 1 
          }}
        >
          {message.timestamp.toLocaleTimeString()}
        </Typography>
      </Paper>
    </Box>
  );
};

export default ChatBubble;