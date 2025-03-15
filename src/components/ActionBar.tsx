import { Box } from "@mui/material";
import MultipleToggle from "./buttons/MultipleToggle";
import { useMainFeatureStore } from "../stores/mainFeatureStore";
import UploadFileButton from "./buttons/UploadFileButton";
import TakePictureButton from "./buttons/TakePictureButton";
import { useCameraModalStore } from "../stores/cameraModalStore";

const ActionBar = () => {
  const { multipleItems, toggleMultipleItems, addItemImage, addPrevItemImage } =
    useMainFeatureStore();

  const { openModal } = useCameraModalStore();
  const onUpload = (file: File) => {
    addItemImage(file);
    addPrevItemImage(file);
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
        padding: 2,
        boxSizing: "border-box",
      }}
    >
      <MultipleToggle
        isMultiple={multipleItems}
        onToggle={toggleMultipleItems}
      />
      <UploadFileButton onUpload={onUpload} />
      <TakePictureButton onClick={() => openModal("item")} />
    </Box>
  );
};

export default ActionBar;
