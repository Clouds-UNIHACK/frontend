import { Box } from "@mui/material";
import { BaseImageCard } from "./BaseImageCard";
import { ItemImageCard } from "./ItemImageCard";

export const ImageUploadSection = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        gap: 6,
        justifyContent: "center",
      }}
    >
      {/* Base Image Card */}
      <BaseImageCard />

      {/* Item Image Card */}
      <ItemImageCard />
    </Box>
  );
};
