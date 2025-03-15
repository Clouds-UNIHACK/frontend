import React, { useState, useRef } from "react";
// Grid is marked as deprecated but still works - will address in future update
import { Grid, Container } from "@mui/material";
import { HeaderText } from "../components/HeaderText";
import { ImageUploadSection } from "../components/swapping/ImageUploadSection";
import { ResultSection } from "../components/swapping/ResultSection";
import { GenerateButton } from "../components/swapping/GenerateButton";
import { CameraModal } from "../components/swapping/CameraModal";

export const SwappingPage: React.FC = () => {
  // State for uploaded images and generated image
  const [baseImage, setBaseImage] = useState<string>("");
  const [itemImages, setItemImages] = useState<string[]>([]);
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  const [generatedImage, setGeneratedImage] = useState<string>("");

  // State and refs for camera modal
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraTarget, setCameraTarget] = useState<"base" | "item" | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, target: "base" | "item") => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        if (target === "base") {
          setBaseImage(imageData);
        } else if (target === "item" && itemImages.length < 3) {
          setItemImages([...itemImages, imageData]);
          setActiveItemIndex(itemImages.length);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  // Handle image removal
  const handleRemoveImage = (target: "base" | "item", index?: number) => {
    if (target === "base") {
      setBaseImage("");
    } else if (target === "item" && typeof index === 'number') {
      const newImages = [...itemImages];
      newImages.splice(index, 1);
      setItemImages(newImages);
      setActiveItemIndex(Math.min(activeItemIndex, Math.max(0, newImages.length - 1)));
    }
  };

  // Navigate between item images
  const handleItemNavigation = (direction: "prev" | "next") => {
    if (itemImages.length <= 1) return;
    
    if (direction === "prev") {
      setActiveItemIndex((prev) => (prev > 0 ? prev - 1 : itemImages.length - 1));
    } else {
      setActiveItemIndex((prev) => (prev < itemImages.length - 1 ? prev + 1 : 0));
    }
  };

  // Open camera and start video stream
  const handleCameraOpen = (target: "base" | "item") => {
    if (target === "item" && itemImages.length >= 3) return;
    
    setCameraTarget(target);
    setIsCameraOpen(true);
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

  // Close camera modal and stop the video stream
  const handleCameraClose = () => {
    setIsCameraOpen(false);
    setCameraTarget(null);
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  // Capture photo from the video stream and update the appropriate image
  const handleCapture = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');
      
      if (cameraTarget === "base") {
        setBaseImage(dataUrl);
      } else if (cameraTarget === "item" && itemImages.length < 3) {
        setItemImages([...itemImages, dataUrl]);
        setActiveItemIndex(itemImages.length);
      }
      
      handleCameraClose();
    }
  };

  // Mock function for generating the swapped image
  // TODO: Implement the actual image generation logic
  const handleGenerate = () => {
    console.log("Generating image from uploaded images");
    setGeneratedImage("https://via.placeholder.com/500x600?text=AI+Generated+Image");
  };

  return (
    <Container maxWidth="xl" sx={{ px: 2 }}>
      <HeaderText page="swapping" />

      <Grid container spacing={4} sx={{ mt: 1 }}>
        {/* Left Side - Upload Section */}
        <Grid xs={12} md={5} item sx={{ width: '100%' }}>
          <ImageUploadSection 
            baseImage={baseImage}
            itemImages={itemImages}
            activeItemIndex={activeItemIndex}
            onFileUpload={handleFileUpload} 
            onCameraOpen={handleCameraOpen}
            onRemoveImage={handleRemoveImage}
            onItemNavigation={handleItemNavigation}
          />
        </Grid>

        {/* Middle - Generate Button */}
        <Grid 
          xs={12} 
          md={2} 
          item
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: '100%'
          }}
        >
          <GenerateButton 
            onClick={handleGenerate} 
            disabled={!baseImage || itemImages.length === 0} 
          />
        </Grid>

        {/* Right Side - Result Section */}
        <Grid xs={12} md={5} item sx={{ width: '100%' }}>
          <ResultSection image={generatedImage} />
        </Grid>
      </Grid>

      {/* Camera Modal */}
      <CameraModal 
        open={isCameraOpen}
        videoRef={videoRef}
        onClose={handleCameraClose}
        onCapture={handleCapture}
      />
    </Container>
  );
};
