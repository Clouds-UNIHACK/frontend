import { useMainFeatureStore } from "../../stores/mainFeatureStore";
import { Box, Grid2 } from "@mui/material";
import SampleView from "./SampleView";

const PoseCollectionView = () => {
  const { prevPoseImages, deletePrevPoseImage } = useMainFeatureStore();

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        aspectRatio: "1/1",
        backgroundColor: "rgba(150,150,150,0.1)",
      }}
    >
      <Grid2 container spacing={2}>
        {prevPoseImages.map((poseImage, index) => (
          <Grid2 size={4} key={index}>
            <SampleView
              imageSrc={poseImage}
              onClick={() => {}}
              onDelete={() => deletePrevPoseImage(index)}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default PoseCollectionView;
