import React, { useState } from "react";
// Grid is marked as deprecated but still works - will address in future update
import { Grid, Box } from "@mui/material";
import { HeaderText } from "../components/HeaderText";
import { ImageUploadSection } from "../components/swapping/ImageUploadSection";
import { ResultSection } from "../components/swapping/ResultSection";
import { CameraModal } from "../components/swapping/CameraModal";
import ChatBotSection from "./SwappingPage/ChatBotSection";

export const SwappingPage: React.FC = () => {
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [activeResultIndex, setActiveResultIndex] = useState<number>(0);

  return (
    <Box sx={{ position: "relative", boxSizing: "border-box" }}>
      <HeaderText page="swapping" />

      <Grid container spacing={6}>
        <Grid xs={8} item sx={{ width: "100%" }}>
          <ImageUploadSection />
        </Grid>
        <Grid xs={4} item sx={{ width: "100%" }}>
          <ResultSection
            image={generatedImages[activeResultIndex] || ""}
            resultIndex={activeResultIndex}
            totalResults={generatedImages.length}
          />
        </Grid>
      </Grid>
      <ChatBotSection />
      <CameraModal />
    </Box>
  );
};
