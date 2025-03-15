import React from "react";
import { Paper, Typography, Stack, Button, Box, IconButton, Grid } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloseIcon from '@mui/icons-material/Close';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import itemImage1 from "../../assets/images/samples/item1_img.png";
import itemImage2 from "../../assets/images/samples/item2_img.png";
import itemImage3 from "../../assets/images/samples/item3_img.png";

// Sample clothing items
const SAMPLE_ITEM_IMAGES = [
  itemImage1,
  itemImage2,
  itemImage3,
];

interface ItemImageCardProps {
  images: string[];
  activeIndex: number;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCameraOpen: () => void;
  onRemove: (index: number) => void;
  onNavigate: (direction: "prev" | "next") => void;
  onSelectSample: (imageUrl: string) => void;
}

export const ItemImageCard: React.FC<ItemImageCardProps> = ({
  images,
  activeIndex,
  onFileUpload,
  onCameraOpen,
  onRemove,
  onNavigate,
  onSelectSample
}) => {
  const MAX_IMAGES = 3;
  const canAddMore = images.length < MAX_IMAGES;
  const currentImage = images[activeIndex];
  const hasMultipleImages = images.length > 1;

  return (
    <Grid container spacing={1}>
      {/* Main item image card */}
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
            bgcolor: currentImage ? 'transparent' : '#f5f5f5',
            position: 'relative',
            backgroundImage: currentImage ? `url(${currentImage})` : 'none',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            boxSizing: 'border-box',
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
                      onClick={(event) => {
                        (event.target as HTMLInputElement).value = '';
                      }}
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

      {/* Samples section */}
      <Grid item xs={3}>
        <Box sx={{ 
          height: '280px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 1
        }}>
          {SAMPLE_ITEM_IMAGES.map((sampleUrl, index) => (
            <Paper
              key={index}
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
                border: images.includes(sampleUrl) ? '2px solid #39FF14' : 'none',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                }
              }}
            />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
}; 