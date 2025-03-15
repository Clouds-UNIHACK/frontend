import React from "react";
import { Stack, Box } from "@mui/material";
import { BaseImageCard } from "./BaseImageCard";
import { ItemImageCard } from "./ItemImageCard";

interface ImageUploadSectionProps {
  baseImage: string;
  itemImages: string[];
  activeItemIndex: number;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>, target: "base" | "item") => void;
  onCameraOpen: (target: "base" | "item") => void;
  onRemoveImage: (target: "base" | "item", index?: number) => void;
  onItemNavigation: (direction: "prev" | "next") => void;
}

export const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({
  baseImage,
  itemImages,
  activeItemIndex,
  onFileUpload,
  onCameraOpen,
  onRemoveImage,
  onItemNavigation
}) => {
  return (
    <Box sx={{ 
      width: '100%', 
      height: '580px',
      display: 'flex',
      justifyContent: 'center' // Center the stack horizontally
    }}>
      <Stack 
        spacing={3} 
        sx={{ 
          height: '100%', 
          width: { xs: '100%', md: '80%' }, // Reduce width on medium+ screens
          maxWidth: '400px', // Add maximum width constraint
        }}
      >
        {/* Base Image Card */}
        <BaseImageCard 
          image={baseImage}
          onFileUpload={(e) => onFileUpload(e, "base")}
          onCameraOpen={() => onCameraOpen("base")}
          onRemove={() => onRemoveImage("base")}
        />
        
        {/* Item Image Card */}
        <ItemImageCard
          images={itemImages}
          activeIndex={activeItemIndex}
          onFileUpload={(e: React.ChangeEvent<HTMLInputElement>) => onFileUpload(e, "item")}
          onCameraOpen={() => onCameraOpen("item")}
          onRemove={(index: number) => onRemoveImage("item", index)}
          onNavigate={onItemNavigation}
        />
      </Stack>
    </Box>
  );
}; 