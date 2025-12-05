import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
  Container,
  FormHelperText,
} from '@mui/material';
import DropzoneUpload from '../components/DropzoneUpload';
import ProgressStepper from '../components/ProgressStepper';
import {
  useUploadImageMutation,
  useExtractDetailsMutation,
  useSaveMemoryMutation,
} from '../features/memories/memoriesApi';

interface MemoryData {
  placeName: string;
  city: string;
  category: string;
  notes: string;
}

const AddMemory = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [memoryData, setMemoryData] = useState<MemoryData>({
    placeName: '',
    city: '',
    category: '',
    notes: '',
  });
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('Memory saved successfully!');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [errors, setErrors] = useState<Partial<MemoryData>>({});

  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();
  const [extractDetails, { isLoading: isExtracting }] = useExtractDetailsMutation();
  const [saveMemory, { isLoading: isSaving }] = useSaveMemoryMutation();

  const getActiveStep = () => {
    if (!selectedFile) return 0;
    if (isUploading || isExtracting) return 1;
    if (selectedFile && !isExtracting) return 2;
    return 0;
  };

  const currentStep = getActiveStep();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      try {
        // Upload image to server
        const formData = new FormData();
        formData.append('image', file);
        const uploadResult = await uploadImage(formData).unwrap();
        setImageUrl(uploadResult.imageUrl);
        
        // Auto-extract after upload
        const extractResult = await extractDetails({ imageUrl: uploadResult.imageUrl }).unwrap();
        setMemoryData(extractResult);
      } catch (error) {
        console.error('Upload or extraction failed:', error);
        // Reset file selection on error
        setSelectedFile(null);
        setImageUrl('');
      }
    }
  };



  const handleInputChange = (field: keyof MemoryData, value: string) => {
    setMemoryData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const newErrors: Partial<MemoryData> = {};
    if (!memoryData.placeName.trim()) newErrors.placeName = 'Place name is required';
    if (!memoryData.city.trim()) newErrors.city = 'City is required';
    if (!memoryData.category) newErrors.category = 'Category is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    try {
      await saveMemory({
        ...memoryData,
        imageUrl,
      }).unwrap();
      
      setSnackbarMessage('Memory saved successfully!');
      setSnackbarSeverity('success');
      setShowSnackbar(true);
      setTimeout(() => {
        navigate('/memories');
      }, 1500);
    } catch (error) {
      console.error('Failed to save memory:', error);
      // Show error message to user
      setSnackbarMessage('Failed to save memory. Please try again.');
      setSnackbarSeverity('error');
      setShowSnackbar(true);
    }
  };

  const isFormValid = memoryData.placeName && memoryData.city && memoryData.category;

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
          border: '1px solid rgba(255, 215, 0, 0.3)',
        }}
      >
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(45deg, #FFD700, #FF6B6B, #4ECDC4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
          }}
        >
          🎨 Add Travel Memory
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#4ECDC4',
            fontWeight: 600,
          }}
        >
          Capture and preserve your amazing travel moments
        </Typography>
      </Box>
      
      <ProgressStepper activeStep={currentStep} />

      {/* Upload Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{
              color: '#FFD700',
              fontWeight: 700,
            }}
          >
            📸 Upload Screenshot
          </Typography>
          <DropzoneUpload onFileSelect={handleFileSelect} />
        </CardContent>
      </Card>

      {/* Image Preview */}
      {imageUrl && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{
                color: '#4ECDC4',
                fontWeight: 700,
              }}
            >
              🖼️ Image Preview
            </Typography>
            <Box sx={{ textAlign: 'center' }}>
              <img
                src={`http://localhost:3001${imageUrl}`}
                alt="Preview"
                style={{ 
                  maxWidth: '100%', 
                  maxHeight: '300px', 
                  objectFit: 'contain',
                  borderRadius: '8px',
                }}
              />
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Extracted Details Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{
              background: 'linear-gradient(45deg, #FFD700, #4ECDC4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
              mb: 3,
            }}
          >
            ✨ Extracted Details
          </Typography>
          
          {(isUploading || isExtracting) ? (
            <Box display="flex" alignItems="center" gap={2} sx={{ py: 4 }}>
              <CircularProgress size={20} sx={{ color: '#4ECDC4' }} />
              <Typography sx={{ color: '#4ECDC4', fontWeight: 600 }}>
                {isUploading ? 'Uploading image...' : 'Extracting details from image...'}
              </Typography>
            </Box>
          ) : (
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Place Name"
                value={memoryData.placeName}
                onChange={(e) => {
                  handleInputChange('placeName', e.target.value);
                  if (errors.placeName) setErrors(prev => ({ ...prev, placeName: undefined }));
                }}
                required
                fullWidth
                disabled={!selectedFile}
                error={!!errors.placeName}
                helperText={errors.placeName}
                sx={{
                  '& .MuiInputBase-input': {
                    color: '#FFFFFF !important',
                    fontWeight: 600,
                  },
                  '& .MuiInputLabel-root': {
                    color: '#4ECDC4 !important',
                    fontWeight: 700,
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#FFD700 !important',
                    },
                  },
                }}
              />
              
              <TextField
                label="City / Location"
                value={memoryData.city}
                onChange={(e) => {
                  handleInputChange('city', e.target.value);
                  if (errors.city) setErrors(prev => ({ ...prev, city: undefined }));
                }}
                required
                fullWidth
                disabled={!selectedFile}
                error={!!errors.city}
                helperText={errors.city}
                sx={{
                  '& .MuiInputBase-input': {
                    color: '#FFFFFF !important',
                    fontWeight: 600,
                  },
                  '& .MuiInputLabel-root': {
                    color: '#4ECDC4 !important',
                    fontWeight: 700,
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#FFD700 !important',
                    },
                  },
                }}
              />
              
              <FormControl 
                fullWidth 
                required 
                disabled={!selectedFile} 
                error={!!errors.category}
                sx={{
                  '& .MuiInputLabel-root': {
                    color: '#4ECDC4 !important',
                    fontWeight: 700,
                  },
                  '& .MuiSelect-select': {
                    color: '#FFFFFF !important',
                    fontWeight: 600,
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#FFD700 !important',
                  },
                }}
              >
                <InputLabel>Category</InputLabel>
                <Select
                  value={memoryData.category}
                  label="Category"
                  onChange={(e) => {
                    handleInputChange('category', e.target.value);
                    if (errors.category) setErrors(prev => ({ ...prev, category: undefined }));
                  }}
                >
                  <MenuItem value="Food">🍽️ Food</MenuItem>
                  <MenuItem value="Stay">🏨 Stay</MenuItem>
                  <MenuItem value="Sightseeing">👁️ Sightseeing</MenuItem>
                  <MenuItem value="Other">📍 Other</MenuItem>
                </Select>
                {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
              </FormControl>
              
              <TextField
                label="Notes / Caption"
                value={memoryData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                multiline
                rows={3}
                fullWidth
                disabled={!selectedFile}
                sx={{
                  '& .MuiInputBase-input': {
                    color: '#FFFFFF !important',
                    fontWeight: 600,
                  },
                  '& .MuiInputLabel-root': {
                    color: '#4ECDC4 !important',
                    fontWeight: 700,
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: '#FFD700 !important',
                    },
                  },
                }}
              />
              
              <Button
                variant="contained"
                onClick={handleSave}
                disabled={!isFormValid || isSaving}
                size="large"
                sx={{ 
                  mt: 4,
                  py: 2,
                  px: 6,
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  borderRadius: 4,
                  background: 'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)',
                  boxShadow: '0 8px 25px rgba(255, 107, 107, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #FF5252 30%, #26C6DA 90%)',
                    boxShadow: '0 12px 35px rgba(255, 107, 107, 0.4)',
                    transform: 'translateY(-2px)',
                  },
                  '&:disabled': {
                    background: 'rgba(255, 255, 255, 0.3)',
                    color: 'rgba(255, 255, 255, 0.5)',
                  },
                }}
              >
                ✨ Save Memory 🎆
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert severity={snackbarSeverity}>{snackbarMessage}</Alert>
      </Snackbar>
    </Container>
  );
};

export default AddMemory;