import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton = ({ onClick, ...props }: CloseButtonProps) => {
  return (
    <IconButton
      onClick={onClick}
      {...props}
      sx={{
        backgroundColor: "rgba(0,0,0,0.6)",
        color: "white",
        "&:hover": {
          backgroundColor: "rgba(255,0,0,0.8)",
        },
        width: 32,
        height: 32,
      }}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );
};

export default CloseButton;
