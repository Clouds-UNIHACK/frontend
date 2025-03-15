import React from "react";
import { Paper, Typography, Stack, Button, IconButton } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloseIcon from '@mui/icons-material/Close';

interface BaseImageCardProps {
  image: string;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCameraOpen: () => void;
  onRemove: () => void;
}

export const BaseImageCard: React.FC<BaseImageCardProps> = ({
  image,
  onFileUpload,
  onCameraOpen,
  onRemove
}) => {
  return (
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
  );
}; 