import { Box, Button } from "@mui/material";
import React from "react";

import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { GenerateButton } from "./GenerateButton";
import { useMainFeatureStore } from "../../stores/mainFeatureStore";
import restClient from "../../api/client";

const GenerateActionBar = () => {
  const { generatedResults, currentResultIndex } = useMainFeatureStore();

  const saveImage = async () => {
    console.log(currentResultIndex);
    console.log(generatedResults);
    if (currentResultIndex === -1 || generatedResults.length === 0) {
      alert("No image to save");
      return;
    }

    const image = generatedResults[currentResultIndex];

    try {
      const response = await restClient.post("/api/v1/save-image", {
        data: {
          data_request: {
            kling_url: image,
          },
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
        config: {
          withCredentials: true,
        },
      });
      console.log(response);
      alert("Image saved successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to save image");
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 4,
      }}
    >
      <GenerateButton />
      <Button onClick={saveImage} variant="contained" color="primary">
        Save to Gallery
      </Button>
    </Box>
  );
};

export default GenerateActionBar;
