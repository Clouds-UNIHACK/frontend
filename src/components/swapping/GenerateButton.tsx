import React from "react";
import { Button, keyframes } from "@mui/material";
import restClient from "../../api/client";
import { useMainFeatureStore } from "../../stores/mainFeatureStore";

// Create a keyframe animation for the gradient movement
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

export const GenerateButton = () => {
  const [disabled, setDisabled] = React.useState(false);

  const { poseImages, itemImages, addGeneratedResult, setGeneratedResults } =
    useMainFeatureStore();

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDisabled(true);

    if (poseImages.length === 0 || itemImages.length === 0 || disabled) {
      alert("Please upload a pose and an item image first.");
      setDisabled(false);
      return;
    }

    try {
      await Promise.all(
        itemImages.map(async (itemImage) => {
          const response = await restClient.post("/api/v1/generate-image", {
            data: {
              human_image: poseImages[0],
              cloth_image: itemImage,
            },
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log(response);
          if (response?.image_url) {
            addGeneratedResult(response.image_url);
          }
          setDisabled(false);
        })
      );
    } catch (error) {
      console.error(error);
      setDisabled(false);
    }
  };

  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      sx={{
        py: 1.5,
        px: 4,
        fontSize: "1.1rem",
        fontWeight: "bold",
        borderRadius: "24px",
        background:
          "linear-gradient(90deg, #9C27B0 0%, #E91E63 50%, #9C27B0 100%)",
        backgroundSize: "200% auto",
        boxShadow:
          "0 0 15px rgba(156, 39, 176, 0.5), 0 0 25px rgba(233, 30, 99, 0.3)",
        color: "white",
        textTransform: "none",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow:
            "0 0 20px rgba(156, 39, 176, 0.6), 0 0 30px rgba(233, 30, 99, 0.4)",
          animation: `${gradientShift} 2s ease infinite`,
        },
        "&:active": {
          transform: "translateY(-1px)",
          boxShadow:
            "0 0 15px rgba(156, 39, 176, 0.5), 0 0 20px rgba(233, 30, 99, 0.3)",
        },
        "&:disabled": {
          background: "linear-gradient(90deg, #9E9E9E 0%, #757575 100%)",
          boxShadow: "none",
          animation: "none",
        },
      }}
    >
      Try on now!
    </Button>
  );
};
