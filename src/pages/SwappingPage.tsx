import { 
  Box, Typography, Grid, Paper, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions 
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { HeaderText } from "../components/HeaderText";
import { useState, useRef } from "react";

export const SwappingPage = () => {
  // State to hold the two uploaded images for the left side
  const [leftImages, setLeftImages] = useState<string[]>(["", ""]);
  // State to hold the AI generated image on the right side
  const [generatedImage, setGeneratedImage] = useState<string>("");
  
  // State to control camera modal visibility and which image index to update
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraIndex, setCameraIndex] = useState<number | null>(null);
  // State to store the MediaStream so we can stop it when closing the modal
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  // Ref for the video element inside the camera modal
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Function to handle file uploads (for the Upload button)
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImages = [...leftImages];
        newImages[index] = e.target?.result as string;
        setLeftImages(newImages);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  // Function to open the camera modal and start the video stream
  const openCamera = (index: number) => {
    setCameraIndex(index);
    setIsCameraOpen(true);
    // Request video stream from the user's webcam
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((s) => {
        setStream(s);
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          videoRef.current.play();
        }
      })
      .catch((err) => {
        console.error("Error accessing camera:", err);
      });
  };

  // Function to close the camera modal and stop the video stream
  const closeCamera = () => {
    setIsCameraOpen(false);
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  // Function to capture a photo from the video stream
  const capturePhoto = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      // Create a canvas to capture the current frame
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');
      // Update the corresponding image slot
      if (cameraIndex !== null) {
        const newImages = [...leftImages];
        newImages[cameraIndex] = dataUrl;
        setLeftImages(newImages);
      }
      closeCamera();
    }
  };

  // Mock generate function for AI swapping
  const handleGenerate = () => {
    console.log("Generating image from uploaded images");
    setGeneratedImage("https://via.placeholder.com/500x600?text=AI+Generated+Image");
  };

  return (
    <Box sx={{ padding: '0', maxWidth: '1280px', margin: '0 auto' }}>
      <HeaderText page="swapping" />

      <Grid container spacing={4} sx={{ mt: 1, px: 4 }}>
        {/* Left Side - Two vertical image containers */}
        <Grid item xs={12} md={5}>
          <Stack spacing={3} sx={{ height: '580px' }}>
            {[0, 1].map((index) => (
              <Paper 
                key={index}
                elevation={3}
                sx={{
                  height: 'calc((100% - 24px) / 2)', // Total height minus gap divided by 2
                  borderRadius: '12px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: leftImages[index] ? 'transparent' : '#f5f5f5',
                  position: 'relative',
                  backgroundImage: leftImages[index] ? `url(${leftImages[index]})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {/* Display prompt text if no image is uploaded */}
                {!leftImages[index] && (
                  <Typography color="textSecondary" sx={{ mb: 2 }}>
                    {index === 0 ? "Upload Base Image" : "Upload Item Image"}
                  </Typography>
                )}
                
                {/* Button group for Upload and Camera */}
                <Stack 
                  direction="row" 
                  spacing={2}
                  sx={{ 
                    position: leftImages[index] ? 'absolute' : 'relative',
                    bottom: leftImages[index] ? '16px' : 'auto',
                    backgroundColor: leftImages[index] ? 'rgba(0,0,0,0.6)' : 'transparent',
                    padding: leftImages[index] ? '8px 16px' : '0',
                    borderRadius: '24px'
                  }}
                >
                  {/* Upload Button */}
                  <Button
                    variant="contained"
                    component="label"
                    sx={{
                      bgcolor: '#90EE90',
                      color: '#000',
                      '&:hover': {
                        bgcolor: '#7CCD7C',
                      },
                    }}
                  >
                    <CloudUploadIcon sx={{ mr: 1 }} />
                    Upload
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, index)}
                    />
                  </Button>
                  
                  {/* Camera Button triggers the custom camera modal */}
                  <Button
                    variant="contained"
                    onClick={() => openCamera(index)}
                    sx={{
                      bgcolor: '#90EE90',
                      color: '#000',
                      '&:hover': {
                        bgcolor: '#7CCD7C',
                      },
                    }}
                  >
                    <CameraAltIcon sx={{ mr: 1 }} />
                    Camera
                  </Button>
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Grid>

        {/* Middle - Generate Swap Button */}
        <Grid 
          item 
          xs={12} 
          md={2} 
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Button
            variant="contained"
            onClick={handleGenerate}
            disabled={!leftImages[0] || !leftImages[1]}
            sx={{
              py: 1.5,
              px: 4,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              borderRadius: '24px',
              background: 'linear-gradient(90deg, #9C27B0 0%, #E91E63 100%)',
              boxShadow: '0 0 15px rgba(156, 39, 176, 0.5), 0 0 25px rgba(233, 30, 99, 0.3)',
              color: 'white',
              textTransform: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'linear-gradient(90deg, #8E24AA 0%, #D81B60 100%)',
                transform: 'translateY(-3px)',
                boxShadow: '0 0 20px rgba(156, 39, 176, 0.6), 0 0 30px rgba(233, 30, 99, 0.4)',
              },
              '&:disabled': {
                background: 'linear-gradient(90deg, #9E9E9E 0%, #757575 100%)',
                boxShadow: 'none',
              }
            }}
          >
            Generate Swap
          </Button>
        </Grid>
        
        {/* Right Side - AI Generated Image */}
        <Grid item xs={12} md={5}>
          <Paper
            elevation={4}
            sx={{
              width: '100%',
              height: '580px',
              borderRadius: '16px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: generatedImage ? 'transparent' : '#f5f5f5',
              backgroundImage: generatedImage ? `url(${generatedImage})` : 'none',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {!generatedImage && (
              <Typography color="textSecondary" sx={{ px: 4, textAlign: 'center' }}>
                Upload two images and click Generate to see the AI-swapped result
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Camera Modal for capturing image via webcam */}
      <Dialog open={isCameraOpen} onClose={closeCamera} maxWidth="sm" fullWidth>
        <DialogTitle>Capture Image</DialogTitle>
        <DialogContent>
          {/* Video element to show live webcam feed */}
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
          {/* Cancel button to close modal */}
          <Button onClick={closeCamera} color="secondary">
            Cancel
          </Button>
          {/* Capture button to take snapshot */}
          <Button onClick={capturePhoto} variant="contained" color="primary">
            Capture
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
