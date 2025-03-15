import React, { useState } from "react";
import { Paper, Typography, Box, IconButton, Dialog, DialogTitle, DialogContent, Button, Fade, CircularProgress } from "@mui/material";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from "react-router-dom";

interface ResultSectionProps {
  image: string;
  hasMultipleResults?: boolean;
  resultIndex?: number;
  totalResults?: number;
  onNavigate?: (direction: "prev" | "next") => void;
}

export const ResultSection: React.FC<ResultSectionProps> = ({ 
  image, 
  hasMultipleResults = false,
  resultIndex = 0,
  totalResults = 0,
  onNavigate
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoveClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmLove = async () => {
    // Set loading state but DON'T close the dialog yet
    setIsLoading(true);

    try {
      // Convert image data URL to blob
      let imageBlob: Blob;
      
      if (image.startsWith('data:')) {
        // Convert data URL to Blob
        const response = await fetch(image);
        imageBlob = await response.blob();
      } else {
        // If it's already a URL to an image, fetch it first
        const response = await fetch(image);
        imageBlob = await response.blob();
      }

      // Create a FormData object
      const formData = new FormData();
      formData.append('image', imageBlob, 'image.png');
      
      const response = await fetch('http://localhost:8000/api/ai-recommend-shops', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error ${response.status}: ${errorText}`);
        throw new Error(`Failed to get shop recommendations: ${response.status} ${response.statusText}`);
      }

      const recommendations = await response.json();
      console.log('Shop recommendations:', recommendations);
      
      // Only close the dialog after successful API call
      setIsDialogOpen(false);
      
      // Navigate to recommendations page with both the image and recommendations
      navigate("/rec-shops", { state: { likedImage: image, recommendations: recommendations } });
    } catch (error) {
      console.error('Error fetching shop recommendations:', error);
      // Keep the dialog open to show error (you could add error state handling here)
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelLove = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Paper
        elevation={4}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        sx={{
          width: '100%',
          height: '580px',
          minHeight: '580px',
          borderRadius: '16px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: image ? 'transparent' : '#f5f5f5',
          backgroundImage: image ? `url(${image})` : 'none',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        {!image && (
          <Typography color="textSecondary" sx={{ px: 4, textAlign: 'center' }}>
            Upload base and item images, then click Generate to see the AI-swapped results
          </Typography>
        )}
        
        {/* Navigation controls - only visible when multiple results */}
        {image && hasMultipleResults && onNavigate && (
          <>
            {/* Left navigation */}
            <IconButton
              aria-label="previous result"
              onClick={() => onNavigate("prev")}
              sx={{
                position: 'absolute',
                left: 16,
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
              aria-label="next result"
              onClick={() => onNavigate("next")}
              sx={{
                position: 'absolute',
                right: 16,
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
            
            {/* Result counter */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 16,
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: 'white',
                padding: '4px 12px',
                borderRadius: 8,
                fontSize: '0.875rem',
                fontWeight: 'bold',
              }}
            >
              Result {resultIndex + 1} of {totalResults}
            </Box>
          </>
        )}
        
        {/* Love button - only visible when hovering and there's an image */}
        {image && (
          <Fade in={isHovering}>
            <Box
              sx={{
                position: 'absolute',
                bottom: 16,
                right: 16,
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <IconButton
                aria-label="love this style"
                onClick={handleLoveClick}
                sx={{
                  backgroundColor: 'rgba(233, 30, 99, 0.9)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(233, 30, 99, 1)',
                    transform: 'scale(1.1)',
                  },
                  transition: 'all 0.2s ease',
                  width: 56,
                  height: 56,
                }}
              >
                <FavoriteIcon fontSize="large" />
              </IconButton>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'white', 
                  backgroundColor: 'rgba(0,0,0,0.6)', 
                  padding: '2px 8px',
                  borderRadius: 4,
                  fontWeight: 'bold',
                }}
              >
                Love it
              </Typography>
            </Box>
          </Fade>
        )}
      </Paper>
      
      {/* Love confirmation dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={handleCancelLove}
        PaperProps={{
          sx: {
            borderRadius: 3,
            padding: 1,
            maxWidth: '400px'
          }
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Love this style?
        </DialogTitle>
        <DialogContent>
          {isLoading ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 2 }}>
              <CircularProgress size={50} sx={{ color: '#E91E63' }} />
              <Typography variant="body1" sx={{ textAlign: 'center' }}>
                Finding the best shops for this style...
              </Typography>
            </Box>
          ) : (
            <Typography variant="body1">
              We'll show you the 5 best shops where you can find similar items. Would you like to see them?
            </Typography>
          )}
        </DialogContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 2,
          }}
        >
          <Button
            onClick={handleCancelLove}
            sx={{
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
              marginRight: 1,
            }}
            disabled={isLoading}
          >
            Maybe Later
          </Button>
          <Button
            onClick={handleConfirmLove}
            variant="contained"
            startIcon={!isLoading && <FavoriteIcon />}
            sx={{
              backgroundColor: '#E91E63',
              '&:hover': { backgroundColor: '#C2185B' },
            }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : "Show Me Shops"}
          </Button>
        </Box>
      </Dialog>
    </>
  );
}; 