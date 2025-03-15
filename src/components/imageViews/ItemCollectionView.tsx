import { useMainFeatureStore } from "../../stores/mainFeatureStore";
import { Box, Grid2 } from "@mui/material";
import SampleView from "./SampleView";

const ItemCollectionView = () => {
  const { prevItemImages, deletePrevItemImage } = useMainFeatureStore();

  return (
    <Box sx={{ position: "relative", width: "100%", aspectRatio: "1/1" }}>
      <Grid2 container spacing={2}>
        {prevItemImages.map((itemImage, index) => (
          <Grid2 size={4} key={index}>
            <SampleView
              imageSrc={itemImage}
              onClick={() => {}}
              onDelete={() => deletePrevItemImage(index)}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default ItemCollectionView;
