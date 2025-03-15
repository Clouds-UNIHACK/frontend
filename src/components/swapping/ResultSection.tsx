import React, { useState } from "react";
import { Paper, Typography, Box, IconButton, Dialog, DialogTitle, DialogContent, Button, Fade } from "@mui/material";
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
  const navigate = useNavigate();

  const handleLoveClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmLove = () => {
    // Here you would typically send data to your backend about the loved item
    console.log("User loved the item, redirecting to shop recommendations");
    setIsDialogOpen(false);
    // Navigate to the recommendation shops page and pass the current image
    navigate("/rec-shops", { state: { likedImage: image } });
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
          <Typography variant="body1">
            We'll show you the 5 best shops where you can find similar items. Would you like to see them?
          </Typography>
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
          >
            Maybe Later
          </Button>
          <Button
            onClick={handleConfirmLove}
            variant="contained"
            startIcon={<FavoriteIcon />}
            sx={{
              backgroundColor: '#E91E63',
              '&:hover': { backgroundColor: '#C2185B' },
            }}
          >
            Show Me Shops
          </Button>
        </Box>
      </Dialog>
    </>
  );
}; 