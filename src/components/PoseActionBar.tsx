import { useMainFeatureStore } from "../stores/mainFeatureStore";
import { useCameraModalStore } from "../stores/cameraModalStore";
import { Box } from "@mui/material";
import UploadFileButton from "./buttons/UploadFileButton";
import TakePictureButton from "./buttons/TakePictureButton";

const PoseActionBar = () => {
  const { addPoseImage, addPrevPoseImage } = useMainFeatureStore();

  const { openModal } = useCameraModalStore();
  const onUpload = (file: File) => {
    addPoseImage(file);
    addPrevPoseImage(file);
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignContent: "center",
        justifyContent: "start",
        gap: 2,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <UploadFileButton onUpload={onUpload} />
      <TakePictureButton onClick={() => openModal("item")} />
    </Box>
  );
};

export default PoseActionBar;
