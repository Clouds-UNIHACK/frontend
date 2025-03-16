import { Button } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

interface TakePictureButtonProps {
  onClick: () => void;
}

const TakePictureButton = ({ onClick }: TakePictureButtonProps) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        bgcolor: "rgba(0,0,0,0)",
        color: "#000",
        "&:hover": { bgcolor: "#7CCD7C" },
      }}
    >
      <AddAPhotoIcon />
    </Button>
  );
};

export default TakePictureButton;
