import React, { useState } from "react";
// Grid is marked as deprecated but still works - will address in future update
import { Grid, Container } from "@mui/material";
import { HeaderText } from "../components/HeaderText";
import { ImageUploadSection } from "../components/swapping/ImageUploadSection";
import { ResultSection } from "../components/swapping/ResultSection";
import { CameraModal } from "../components/swapping/CameraModal";

export const SwappingPage: React.FC = () => {
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [activeResultIndex, setActiveResultIndex] = useState<number>(0);

  return (
    <Container
      maxWidth="xl"
      sx={{ position: "relative", paddingX: "20px", boxSizing: "border-box" }}
    >
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

      <Grid
        xs={4}
        md={2}
        item
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      ></Grid>

      <CameraModal />
    </Container>
  );
};
