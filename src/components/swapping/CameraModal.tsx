import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
} from "@mui/material";
import { useCameraModalStore } from "../../stores/cameraModalStore";
import { useMainFeatureStore } from "../../stores/mainFeatureStore";

export const CameraModal = () => {
  const { isOpen, target, closeModal } = useCameraModalStore();
  const { addPoseImage, addItemImage, addPrevItemImage, addPrevPoseImage } =
    useMainFeatureStore();
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const onCapture = () => {
    const video = videoRef.current;
    if (video) {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            // Create a file from the blob
            const file = new File([blob], "captured-image.png", {
              type: "image/png",
            });

            // Call the saveImage function, which should handle saving the file
            saveImage(file);
          }
        }, "image/png");
        onClose();
      }
    }
  };

  const saveImage = (file: File) => {
    // Save the image file
    if (target === "pose") {
      addPoseImage(file);
      addPrevPoseImage(file);
    } else if (target === "item") {
      addItemImage(file);
      addPrevItemImage(file);
    }
    closeModal();
  };

  const onClose = () => {
    closeModal();
  };

  React.useEffect(() => {
    let stream: MediaStream | null = null;

    if (!isOpen) {
      return;
    }
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((mediaStream) => {
        stream = mediaStream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });

    // Cleanup function
    return () => {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop()); // Stop all tracks
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null; // Clear the video source
      }
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Capture Image</DialogTitle>
      <DialogContent>
        <Box sx={{ position: "relative", width: "100%", pt: "56.25%" }}>
          <video
            ref={videoRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
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
            bgcolor: "#90EE90",
            color: "#000",
            "&:hover": { bgcolor: "#7CCD7C" },
          }}
        >
          Capture
        </Button>
      </DialogActions>
    </Dialog>
  );
};
