import { useState } from 'react';
import {
  Typography,
  TextField,
  Card,
  CardContent,
  Box,
  Chip,
  Grid,
  Container,
  InputAdornment,
  Avatar,
  Skeleton,
} from '@mui/material';
import { Search, FolderOpen, Add } from '@mui/icons-material';
import { categoryColors } from '../App';
import { useNavigate } from 'react-router-dom';
import { useGetMemoriesQuery, useSearchMemoriesQuery } from '../features/memories/memoriesApi';
import type { Memory } from '../features/memories/types';



const Memories = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Use RTK Query hooks
  const { data: allMemories = [], isLoading: isLoadingAll } = useGetMemoriesQuery();
  const { data: searchResults = [], isLoading: isSearching } = useSearchMemoriesQuery(searchTerm, {
    skip: !searchTerm.trim(),
  });
  
  const memories = searchTerm.trim() ? searchResults : allMemories;
  const isLoading = searchTerm.trim() ? isSearching : isLoadingAll;
  
  const filteredMemories = memories; // RTK Query already handles filtering

  const getCategoryChip = (category: string) => {
    const colors = categoryColors[category as keyof typeof categoryColors] || categoryColors.Other;
    return {
      backgroundColor: colors.light,
      color: colors.dark,
      fontWeight: 600,
    };
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Box
        sx={{
          textAlign: 'center',
          mb: 6,
          p: 4,
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(30, 30, 30, 0.9) 100%)',
          backdropFilter: 'blur(20px)',
          borderRadius: 4,
          border: '1px solid rgba(255, 107, 107, 0.3)',
        }}
      >
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(45deg, #FF6B6B, #FFD700, #4ECDC4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
          }}
        >
          🌎 Your Memories
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#FF6B6B',
            fontWeight: 600,
          }}
        >
          Relive your incredible travel adventures
        </Typography>
      </Box>

      <TextField
        fullWidth
        placeholder="Search memories (e.g., 'Ghevar', 'Jaipur')"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search sx={{ color: '#4ECDC4' }} />
            </InputAdornment>
          ),
        }}
        sx={{ 
          mb: 3,
          '& .MuiInputBase-input::placeholder': {
            color: '#4ECDC4',
            fontWeight: 500,
          },
        }}
      />

      {isLoading ? (
        <Grid container spacing={2}>
          {[1, 2, 3].map((n) => (
            <Grid item xs={12} sm={6} md={4} key={n}>
              <Card>
                <CardContent>
                  <Skeleton variant="text" width="80%" height={32} />
                  <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1 }} />
                  <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1, mb: 1 }} />
                  <Skeleton variant="text" width="100%" height={20} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : filteredMemories.length === 0 ? (
        <Card 
          sx={{ 
            textAlign: 'center', 
            py: 8,
            cursor: allMemories.length === 0 ? 'pointer' : 'default',
            '&:hover': allMemories.length === 0 ? {
              boxShadow: 4,
              transform: 'translateY(-2px)',
            } : {},
          }}
          onClick={() => allMemories.length === 0 && navigate('/add-memory')}
        >
          <CardContent>
            <Avatar sx={{ 
              width: 80, 
              height: 80, 
              mx: 'auto', 
              mb: 2,
              bgcolor: allMemories.length === 0 ? 'primary.main' : 'grey.300',
            }}>
              {allMemories.length === 0 ? <Add sx={{ fontSize: 40 }} /> : <FolderOpen sx={{ fontSize: 40 }} />}
            </Avatar>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{
                color: '#4ECDC4',
                fontWeight: 600,
              }}
            >
              {searchTerm ? 'No memories found matching your search.' : 'No memories yet. Start your journey!'}
            </Typography>
            {allMemories.length === 0 && (
              <Typography 
                variant="body2" 
                sx={{ 
                  mt: 1,
                  color: '#FFD700',
                  fontWeight: 600,
                }}
              >
                Click here to add your first memory
              </Typography>
            )}
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={2}>
          {filteredMemories.map((memory: Memory) => (
            <Grid item xs={12} sm={6} md={4} key={memory.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 3,
                  '&:hover': {
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                    transform: 'translateY(-8px) scale(1.03)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  },
                }}
              >
                {memory.imageUrl && (
                  <Box sx={{ height: 120, overflow: 'hidden' }}>
                    <img
                      src={`http://localhost:3001${memory.imageUrl}`}
                      alt={memory.placeName}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                )}
                <CardContent>
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    noWrap
                    sx={{
                      color: '#FFD700',
                      fontWeight: 700,
                    }}
                  >
                    {memory.placeName}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    gutterBottom
                    sx={{
                      color: '#4ECDC4',
                      fontWeight: 600,
                    }}
                  >
                    📍 {memory.city}
                  </Typography>
                  <Box sx={{ mb: 1 }}>
                    <Chip
                      label={memory.category}
                      size="small"
                      sx={getCategoryChip(memory.category)}
                    />
                  </Box>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mb: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      color: '#FFFFFF',
                      fontWeight: 500,
                    }}
                  >
                    {memory.notes}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{
                      color: '#FF6B6B',
                      fontWeight: 600,
                    }}
                  >
                    {new Date(memory.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Memories;