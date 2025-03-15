import { Typography, Stack, Box, IconButton } from "@mui/material";
import CloseButton from "../buttons/CloseButton";
import UploadFileButton from "../buttons/UploadFileButton";
import { useMainFeatureStore } from "../../stores/mainFeatureStore";
import { useCameraModalStore } from "../../stores/cameraModalStore";
import TakePictureButton from "../buttons/TakePictureButton";
import MainUploadView from "../imageViews/MainUploadView";
import ItemCollectionView from "../imageViews/ItemCollectionView";
import ActionBar from "../ActionBar";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export const ItemImageCard = () => {
  const {
    itemImages,
    addItemImage,
    deleteItemImage,
    addPrevItemImage,
    currentItemIndex,
    increaseCurrentItemIndex,
    decreaseCurrentItemIndex,
  } = useMainFeatureStore();

  const { openModal } = useCameraModalStore();

  const onUpload = (file: File) => {
    addItemImage(file);
    addPrevItemImage(file);
  };

  return (
    <Stack sx={{ width: "100%", maxWidth: "400px" }} spacing={2}>
      <MainUploadView imageFile={itemImages?.[currentItemIndex]}>
        {itemImages?.length > 0 ? (
          <>
            <Box sx={{ position: "absolute", top: 8, left: 8 }}>
              <CloseButton onClick={() => deleteItemImage()} />
            </Box>

            <Box
              sx={{
                position: "absolute",
                bottom: 8,
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "rgba(0,0,0,0.6)",
                color: "white",
                padding: "4px 8px",
                borderRadius: 8,
                fontSize: "0.75rem",
                fontWeight: "bold",
              }}
            >
              {currentItemIndex + 1} / {itemImages?.length}
            </Box>
            {itemImages?.length > 1 && (
              <>
                <IconButton
                  onClick={() => {
                    decreaseCurrentItemIndex();
                  }}
                  sx={{
                    position: "absolute",
                    left: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.8)",
                    },
                  }}
                >
                  <NavigateBeforeIcon />
                </IconButton>

                {/* Right navigation */}
                <IconButton
                  aria-label="next result"
                  onClick={() => {
                    increaseCurrentItemIndex();
                  }}
                  sx={{
                    position: "absolute",
                    right: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(0,0,0,0.6)",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.8)",
                    },
                  }}
                >
                  <NavigateNextIcon />
                </IconButton>
              </>
            )}

            <Box
              sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
                display: "flex",
                gap: 1,
              }}
            >
              <UploadFileButton onUpload={onUpload} />
              <TakePictureButton onClick={() => openModal("item")} />
            </Box>
          </>
        ) : (
          // Show upload controls when no images
          <>
            <Typography color="textSecondary" sx={{ mb: 2 }} variant="h5">
              Upload Item Image (Max 3)
            </Typography>
            <Stack direction="row" spacing={2}>
              <UploadFileButton onUpload={onUpload} />
              <TakePictureButton onClick={() => openModal("item")} />
            </Stack>
          </>
        )}
      </MainUploadView>
      <ActionBar />

      <ItemCollectionView />
    </Stack>
  );
};
