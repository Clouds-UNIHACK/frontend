import React, { useState, useRef } from "react";
// Grid is marked as deprecated but still works - will address in future update
import { Grid, Container } from "@mui/material";
import { HeaderText } from "../components/HeaderText";
import { ImageUploadSection } from "../components/swapping/ImageUploadSection";
import { ResultSection } from "../components/swapping/ResultSection";
import { GenerateButton } from "../components/swapping/GenerateButton";
import { CameraModal } from "../components/swapping/CameraModal";
import SampleGeneratedImage1 from "../assets/images/samples/sample_generated1_img.png";
import SampleGeneratedImage2 from "../assets/images/samples/sample_generated2_img.png";
import SampleGeneratedImage3 from "../assets/images/samples/sample_generated3_img.png";

export const SwappingPage: React.FC = () => {
  // State for uploaded images
  const [baseImage, setBaseImage] = useState<string>("");
  const [itemImages, setItemImages] = useState<string[]>([]);
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  
  // State for generated results
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [activeResultIndex, setActiveResultIndex] = useState<number>(0);

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

  // Generate results for each item image
  const handleGenerate = () => {
    console.log("Generating images from uploaded images");
    
    // Map each item image to a sample generated result
    // In a real app, you would call your API for each combination of base + item
    const sampleResults = [
      SampleGeneratedImage1, 
      SampleGeneratedImage2, 
      SampleGeneratedImage3
    ];
    
    // Generate results based on the number of item images
    const results = itemImages.map((_, index) => {
      // Use the corresponding sample image or fallback to the first one
      return sampleResults[index % sampleResults.length];
    });
    
    setGeneratedImages(results);
    setActiveResultIndex(0); // Reset to show the first result
  };

  // Navigate between result images
  const handleResultNavigation = (direction: "prev" | "next") => {
    if (generatedImages.length <= 1) return;
    
    if (direction === "prev") {
      setActiveResultIndex((prev) => (prev > 0 ? prev - 1 : generatedImages.length - 1));
    } else {
      setActiveResultIndex((prev) => (prev < generatedImages.length - 1 ? prev + 1 : 0));
    }
  };

  // Handle sample image selection
  const handleSelectSample = (imageUrl: string, target: "base" | "item") => {
    if (target === "base") {
      setBaseImage(imageUrl);
    } else if (target === "item" && itemImages.length < 3) {
      // Check if this item is already in the array
      if (!itemImages.includes(imageUrl)) {
        setItemImages([...itemImages, imageUrl]);
        setActiveItemIndex(itemImages.length);
      }
    }
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
            onSelectSample={handleSelectSample}
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
          <ResultSection 
            image={generatedImages[activeResultIndex] || ""}
            hasMultipleResults={generatedImages.length > 1}
            resultIndex={activeResultIndex}
            totalResults={generatedImages.length}
            onNavigate={handleResultNavigation}
          />
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
