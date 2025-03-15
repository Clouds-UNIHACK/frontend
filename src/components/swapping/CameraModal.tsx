import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Button } from "@mui/material";

interface CameraModalProps {
  open: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  onClose: () => void;
  onCapture: () => void;
}

export const CameraModal: React.FC<CameraModalProps> = ({ 
  open, 
  videoRef, 
  onClose, 
  onCapture 
}) => (
  <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
    <DialogTitle>Capture Image</DialogTitle>
    <DialogContent>
      <Box sx={{ position: 'relative', width: '100%', pt: '56.25%' }}>
        <video 
          ref={videoRef}
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover' 
          }} 
          autoPlay 
          muted 
        />
      </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="secondary">
        Cancel
      </Button>
      <Button 
        onClick={onCapture} 
        variant="contained" 
        sx={{
          bgcolor: '#90EE90',
          color: '#000',
          '&:hover': { bgcolor: '#7CCD7C' },
        }}
      >
        Capture
      </Button>
    </DialogActions>
  </Dialog>
); 