import { Box, Button, keyframes } from "@mui/material";
import React from "react";

import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { GenerateButton } from "./GenerateButton";
import { useMainFeatureStore } from "../../stores/mainFeatureStore";
import restClient from "../../api/client";
import axios from "../../api/axios";
const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;
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
    console.log(`Bearer ${localStorage.getItem("accessToken")}`);

    try {
      const response = await axios.post(
        "/api/v1/save-image",
        {
          kling_url: generatedResults[currentResultIndex],
        },
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
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
      <Button
        onClick={saveImage}
        sx={{
          py: 1.5,
          px: 4,
          fontSize: "1.1rem",
          fontWeight: "bold",
          borderRadius: "24px",
          background:
            "linear-gradient(90deg, #34a0a4 0%, #52b69a 50%, #34a0a4 100%)",
          backgroundSize: "200% auto",
          boxShadow:
            "0 0 15px rgba(96, 235, 173, 0.85), 0 0 25px rgba(81, 217, 140, 0.85)",
          color: "white",
          textTransform: "none",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow:
              "0 0 20px rgba(96, 235, 173, 0.85), 0 0 25px rgba(81, 217, 140, 0.85)",
            animation: `${gradientShift} 2s ease infinite`,
          },
          "&:active": {
            transform: "translateY(-1px)",
            boxShadow:
              "0 0 15px rgba(96, 235, 173, 0.855), 0 0 25px rgba(81, 217, 140, 0.85)",
          },
          "&:disabled": {
            background: "linear-gradient(90deg, #9E9E9E 0%, #757575 100%)",
            boxShadow: "none",
            animation: "none",
          },
        }}
      >
        Save to Gallery
      </Button>
    </Box>
  );
};

export default GenerateActionBar;
