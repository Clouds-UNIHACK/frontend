import { Button } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import BurstModeIcon from "@mui/icons-material/BurstMode";

interface MultipleToggleProps {
  isMultiple: boolean;
  onToggle: () => void;
}

const MultipleToggle = ({ isMultiple, onToggle }: MultipleToggleProps) => {
  return (
    <Button
      variant="contained"
      component="label"
      sx={{
        bgcolor: "rgba(0,0,0,0)",
        color: "#000",
        "&:hover": { bgcolor: "#7CCD7C" },
      }}
      onClick={onToggle}
    >
      {isMultiple ? <BurstModeIcon /> : <ImageIcon />}
    </Button>
  );
};

export default MultipleToggle;
