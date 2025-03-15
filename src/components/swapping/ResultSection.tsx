import React from "react";
import { Paper, Typography, Box, IconButton } from "@mui/material";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

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
  return (
    <Paper
      elevation={4}
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
    </Paper>
  );
}; 