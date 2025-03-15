import React from "react";
import { Paper, Typography, Stack, Button, Box, IconButton } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloseIcon from '@mui/icons-material/Close';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface ItemImageCardProps {
  images: string[];
  activeIndex: number;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCameraOpen: () => void;
  onRemove: (index: number) => void;
  onNavigate: (direction: "prev" | "next") => void;
}

export const ItemImageCard: React.FC<ItemImageCardProps> = ({
  images,
  activeIndex,
  onFileUpload,
  onCameraOpen,
  onRemove,
  onNavigate
}) => {
  const MAX_IMAGES = 3;
  const canAddMore = images.length < MAX_IMAGES;
  const currentImage = images[activeIndex];
  const hasMultipleImages = images.length > 1;

  return (
    <Paper
      elevation={3}
      sx={{
        height: 'calc((100% - 24px) / 2)',
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: currentImage ? 'transparent' : '#f5f5f5',
        position: 'relative',
        backgroundImage: currentImage ? `url(${currentImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {images.length > 0 ? (
        <>
          {/* Remove button */}
          <IconButton
            aria-label="remove image"
            onClick={() => onRemove(activeIndex)}
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
              zIndex: 2,
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

          {/* Navigation controls - only visible when multiple images */}
          {hasMultipleImages && (
            <>
              {/* Left navigation */}
              <IconButton
                aria-label="previous image"
                onClick={() => onNavigate("prev")}
                sx={{
                  position: 'absolute',
                  left: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                  },
                }}
              >
                <NavigateBeforeIcon />
              </IconButton>

              {/* Right navigation */}
              <IconButton
                aria-label="next image"
                onClick={() => onNavigate("next")}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                  },
                }}
              >
                <NavigateNextIcon />
              </IconButton>
            </>
          )}

          {/* Image counter */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 8,
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0,0,0,0.6)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: 8,
              fontSize: '0.75rem',
              fontWeight: 'bold',
            }}
          >
            {activeIndex + 1} / {images.length}
          </Box>

          {/* Add more button - only visible when fewer than max images */}
          {canAddMore && (
            <Box
              sx={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                display: 'flex',
                gap: 1,
              }}
            >
              <Button
                variant="contained"
                component="label"
                size="small"
                sx={{
                  bgcolor: 'rgba(144, 238, 144, 0.8)',
                  color: '#000',
                  '&:hover': { bgcolor: 'rgba(124, 205, 124, 0.9)' },
                }}
              >
                <CloudUploadIcon fontSize="small" />
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={onFileUpload}
                />
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={onCameraOpen}
                sx={{
                  bgcolor: 'rgba(144, 238, 144, 0.8)',
                  color: '#000',
                  '&:hover': { bgcolor: 'rgba(124, 205, 124, 0.9)' },
                }}
              >
                <CameraAltIcon fontSize="small" />
              </Button>
            </Box>
          )}
        </>
      ) : (
        // Show upload controls when no images
        <>
          <Typography color="textSecondary" sx={{ mb: 2 }}>
            Upload Item Image (Max 3)
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
  );
}; 