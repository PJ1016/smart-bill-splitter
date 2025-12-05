import { useState } from 'react';
import {
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  Container,
} from '@mui/material';
import { Send } from '@mui/icons-material';
import ChatBubble from '../components/ChatBubble';
import { useChatQueryMutation } from '../features/memories/memoriesApi';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  memories?: Array<{
    placeName: string;
    city: string;
    category: string;
  }>;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I can help you find your travel memories. Try asking me something like "Show me food places in Jaipur" or "What sightseeing did I do?"',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [chatQuery, { isLoading }] = useChatQueryMutation();

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const messageText = inputText;
    setInputText('');

    try {
      const response = await chatQuery({ message: messageText }).unwrap();
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.responseText,
        isUser: false,
        timestamp: new Date(),
        memories: response.matches,
      };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Chat query failed:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Box
        sx={{
          textAlign: 'center',
          mb: 4,
          p: 4,
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(30, 30, 30, 0.9) 100%)',
          backdropFilter: 'blur(20px)',
          borderRadius: 4,
          border: '1px solid rgba(78, 205, 196, 0.3)',
        }}
      >
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(45deg, #4ECDC4, #FFD700, #FF6B6B)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
          }}
        >
          🤖 Travel AI Chat
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#4ECDC4',
            fontWeight: 600,
          }}
        >
          Ask me anything about your travel memories
        </Typography>
      </Box>

      <Box sx={{ height: '60vh', display: 'flex', flexDirection: 'column' }}>
        {/* Chat Messages */}
        <Paper
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            mb: 2,
            p: 3,
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(20, 20, 20, 0.8) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(78, 205, 196, 0.3)',
            borderRadius: 3,
          }}
        >
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
        </Paper>

        {/* Input Area */}
        <Paper 
          sx={{ 
            p: 3,
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(30, 30, 30, 0.9) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            borderRadius: 3,
          }}
        >
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              placeholder="Ask about your travel memories..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              multiline
              maxRows={3}
              sx={{
                '& .MuiInputBase-input::placeholder': {
                  color: '#4ECDC4',
                  fontWeight: 500,
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoading}
              sx={{ minWidth: 'auto', px: 2 }}
            >
              <Send />
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Chat;