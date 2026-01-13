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
  CardMedia,
} from '@mui/material';
import { Search, FolderOpen, Add, LocationOn } from '@mui/icons-material';
import { categoryColors } from '../theme';
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
      border: 'none',
    };
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 10 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{
            fontWeight: 800,
            color: 'text.primary',
            mb: 1.5,
            letterSpacing: '-0.03em',
          }}
        >
          Your Memories
        </Typography>
        <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ fontWeight: 400, maxWidth: 600, mx: 'auto' }}
          >
            Relive your incredible travel adventures and specific details.
          </Typography>
      </Box>

      <TextField
        fullWidth
        placeholder="Search for a memory..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search color="action" />
            </InputAdornment>
          ),
        }}
        sx={{ 
            maxWidth: 600, 
            mx: 'auto',
            display: 'block',
            mb: 6,
            '& .MuiOutlinedInput-root': {
                bgcolor: 'white',
                boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)',
                '&:hover': {
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                },
                '&.Mui-focused': {
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                }
            }
        }}
      />

      {isLoading ? (
        <Grid container spacing={3}>
          {[1, 2, 3].map((n) => (
            <Grid item xs={12} sm={6} md={4} key={n}>
              <Card elevation={0} sx={{ height: '100%', borderRadius: 3 }}>
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" width="60%" height={32} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="40%" height={24} sx={{ mb: 2 }} />
                  <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 1 }} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : filteredMemories.length === 0 ? (
        <Card 
            elevation={0}
          sx={{ 
            textAlign: 'center', 
            py: 8,
            maxWidth: 500,
            mx: 'auto',
            bgcolor: 'transparent',
            cursor: allMemories.length === 0 ? 'pointer' : 'default',
          }}
          onClick={() => allMemories.length === 0 && navigate('/add-memory')}
        >
          <CardContent>
            <Avatar sx={{ 
              width: 80, 
              height: 80, 
              mx: 'auto', 
              mb: 3,
              bgcolor: 'primary.light',
              color: 'primary.main',
            }}>
              {allMemories.length === 0 ? <Add sx={{ fontSize: 40 }} /> : <FolderOpen sx={{ fontSize: 40 }} />}
            </Avatar>
            <Typography variant="h5" color="text.primary" gutterBottom fontWeight={700}>
              {searchTerm ? 'No results found' : 'Start your collection'}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              {searchTerm 
                ? `We couldn't find any memories matching "${searchTerm}"` 
                : "You haven't added any memories yet. Capture your first journey now!"}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {filteredMemories.map((memory: Memory) => (
            <Grid item xs={12} sm={6} md={4} key={memory.id}>
              <Card 
                elevation={0}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  bgcolor: 'white',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'grey.200',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    borderColor: 'primary.light',
                  },
                }}
              >
                {memory.imageUrl && (
                    <CardMedia
                        component="img"
                        height="200"
                        image={`http://localhost:3001${memory.imageUrl}`}
                        alt={memory.placeName}
                        sx={{ objectFit: 'cover' }}
                    />
                )}
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ mb: 2, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography 
                            variant="h6" 
                            component="h2"
                            sx={{ fontWeight: 700, lineHeight: 1.2, mb: 0.5 }}
                        >
                            {memory.placeName}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', gap: 0.5 }}>
                            <LocationOn sx={{ fontSize: 16 }} />
                            <Typography variant="body2" fontWeight={500}>
                                {memory.city}
                            </Typography>
                        </Box>
                    </Box>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={memory.category}
                      size="small"
                      sx={getCategoryChip(memory.category)}
                    />
                  </Box>

                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      mb: 2,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      lineHeight: 1.6,
                    }}
                  >
                    {memory.notes}
                  </Typography>
                  
                  <Typography variant="caption" color="text.disabled" fontWeight={500} sx={{ mt: 'auto', display: 'block' }}>
                    Added on {new Date(memory.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })}
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
