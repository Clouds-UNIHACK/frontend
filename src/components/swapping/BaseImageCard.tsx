import React, { useState } from "react";
import { Paper, Typography, Stack, Button, IconButton, Box, Grid } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import baseImage1 from "../../assets/images/samples/person1_img.png";
import baseImage2 from "../../assets/images/samples/person2_img.png";
import baseImage3 from "../../assets/images/samples/person3_img.png";
import baseImage4 from "../../assets/images/samples/person4_img.png";
import baseImage5 from "../../assets/images/samples/person5_img.png";

// Expanded sample base images (model photos)
const SAMPLE_BASE_IMAGES = [
  baseImage1,
  baseImage2,
  baseImage3,
  baseImage4,
  baseImage5,
];

interface BaseImageCardProps {
  image: string;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCameraOpen: () => void;
  onRemove: () => void;
  onSelectSample: (imageUrl: string) => void;
}

export const BaseImageCard: React.FC<BaseImageCardProps> = ({
  image,
  onFileUpload,
  onCameraOpen,
  onRemove,
  onSelectSample
}) => {
  // State to track which samples are currently visible
  const [sampleStartIndex, setSampleStartIndex] = useState(0);
  const VISIBLE_SAMPLES = 3;
  
  // Calculate the visible samples range
  const visibleSamples = SAMPLE_BASE_IMAGES.slice(
    sampleStartIndex, 
    sampleStartIndex + VISIBLE_SAMPLES
  );
  
  // Check if we can navigate up or down
  const canNavigateUp = sampleStartIndex > 0;
  const canNavigateDown = sampleStartIndex + VISIBLE_SAMPLES < SAMPLE_BASE_IMAGES.length;
  
  // Handle sample navigation
  const handleSampleNavigation = (direction: 'up' | 'down') => {
    if (direction === 'up' && canNavigateUp) {
      setSampleStartIndex(prev => Math.max(0, prev - 1));
    } else if (direction === 'down' && canNavigateDown) {
      setSampleStartIndex(prev => Math.min(
        SAMPLE_BASE_IMAGES.length - VISIBLE_SAMPLES, 
        prev + 1
      ));
    }
  };

  return (
    <Grid container spacing={1}>
      {/* Main image upload card */}
      <Grid item xs={9}>
        <Paper
          elevation={3}
          sx={{
            height: '280px',
            minHeight: '280px',
            width: '100%',
            borderRadius: '12px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: image ? 'transparent' : '#f5f5f5',
            position: 'relative',
            backgroundImage: image ? `url(${image})` : 'none',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            boxSizing: 'border-box',
          }}
        >
          {image ? (
            // Show remove button when there's an image
            <IconButton
              aria-label="remove image"
              onClick={onRemove}
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255,0,0,0.8)',
                },
                width: 32,
                height: 32,
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          ) : (
            // Show upload controls when no image
            <>
              <Typography color="textSecondary" sx={{ mb: 2 }}>
                Upload Base Image
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    bgcolor: '#90EE90',
                    color: '#000',
                    '&:hover': { bgcolor: '#7CCD7C' },
                  }}
                >
                  <CloudUploadIcon sx={{ mr: 1 }} />
                  Upload
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onClick={(event) => {
                      (event.target as HTMLInputElement).value = '';
                    }}
                    onChange={onFileUpload}
                  />
                </Button>
                <Button
                  variant="contained"
                  onClick={onCameraOpen}
                  sx={{
                    bgcolor: '#90EE90',
                    color: '#000',
                    '&:hover': { bgcolor: '#7CCD7C' },
                  }}
                >
                  <CameraAltIcon sx={{ mr: 1 }} />
                  Camera
                </Button>
              </Stack>
            </>
          )}
        </Paper>
      </Grid>

      {/* Simplified samples section */}
      <Grid item xs={3}>
        <Box sx={{ 
          height: '280px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}>
          {/* Sample thumbnails */}
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            gap: 2,
            position: 'relative',
            py: 1
          }}>
            {visibleSamples.map((sampleUrl, index) => (
              <Paper
                key={sampleStartIndex + index}
                elevation={2}
                onClick={() => onSelectSample(sampleUrl)}
                sx={{
                  height: '80px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  backgroundImage: `url(${sampleUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: image === sampleUrl ? '2px solid #39FF14' : 'none',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                  }
                }}
              />
            ))}
            
            {/* Fixed-position navigation buttons */}
            {canNavigateUp && (
              <IconButton 
                size="small"
                onClick={() => handleSampleNavigation('up')}
                sx={{
                  position: 'absolute',
                  top: -12,
                  right: 8,
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  color: 'white',
                  width: 20,
                  height: 20,
                  zIndex: 10,
                  padding: 0,
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.6)',
                  }
                }}
              >
                <KeyboardArrowUpIcon fontSize="small" />
              </IconButton>
            )}
            
            {canNavigateDown && (
              <IconButton 
                size="small"
                onClick={() => handleSampleNavigation('down')}
                sx={{
                  position: 'absolute',
                  bottom: -12,
                  right: 8,
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  color: 'white',
                  width: 20,
                  height: 20,
                  zIndex: 10,
                  padding: 0,
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.6)',
                  }
                }}
              >
                <KeyboardArrowDownIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}; 