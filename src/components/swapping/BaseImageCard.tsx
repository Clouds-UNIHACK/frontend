import { Typography, Stack, Box } from "@mui/material";

import CloseButton from "../buttons/CloseButton";
import { useMainFeatureStore } from "../../stores/mainFeatureStore";
import MainUploadView from "../imageViews/MainUploadView";
import UploadFileButton from "../buttons/UploadFileButton";
import { useCameraModalStore } from "../../stores/cameraModalStore";
import TakePictureButton from "../buttons/TakePictureButton";
import PoseCollectionView from "../imageViews/PoseCollectionView";
import PoseActionBar from "../PoseActionBar";

export const BaseImageCard = () => {
  const { poseImages, addPoseImage, addPrevPoseImage } = useMainFeatureStore();

  const { openModal } = useCameraModalStore();

  const onUpload = (file: File) => {
    addPoseImage(file);
    addPrevPoseImage(file);
  };

  const onRemove = () => {
    // Clear the pose images array
    useMainFeatureStore.getState().clearPoseImages();
  };

  return (
    <Stack sx={{ width: "100%", maxWidth: "400px" }} spacing={2}>
      <Typography
        color="textSecondary"
        sx={{ mb: 2, fontWeight: 800 }}
        variant="h5"
      >
        1. Upload Poses
      </Typography>
      <MainUploadView imageFile={poseImages?.[0]}>
        {poseImages.length > 0 && (
          // Show remove button when there's an image
          <Box sx={{ position: "absolute", top: 8, left: 8 }}>
            <CloseButton onClick={onRemove} aria-label="remove image" />
          </Box>
        )}
      </MainUploadView>
      <PoseActionBar />
      <Typography color="textSecondary" variant="h6">
        Your Collection
      </Typography>

      <PoseCollectionView />
    </Stack>
  );
};
