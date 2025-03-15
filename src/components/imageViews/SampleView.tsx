import { Box, IconButton, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
interface SampleViewProps {
  onClick: () => void;
  imageSrc: File | string | null;
  alt?: string;
  isChosen?: boolean;
  onDelete?: () => void;
}

const SampleView = ({
  onClick,
  imageSrc,
  alt,
  isChosen,
  onDelete,
  ...props
}: SampleViewProps) => {
  return (
    <Paper
      elevation={2}
      onClick={onClick}
      sx={{
        position: "relative",
        aspectRatio: "1/1",
        borderRadius: "8px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.2s ease",
        border: isChosen ? "2px solid #39FF14" : "none",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        },
      }}
      {...props}
    >
      <IconButton
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          padding: "3px",
          backgroundColor: "rgba(0,0,0,0.6)",
          color: "white",
          "&:hover": {
            backgroundColor: "rgba(255,0,0,0.6)",
          },
        }}
        onClick={(e) => {
          e.stopPropagation();
          onDelete && onDelete();
        }}
      >
        <DeleteIcon sx={{ fontSize: 18 }} />
      </IconButton>
      <Box
        component="img"
        src={
          typeof imageSrc === "string"
            ? imageSrc
            : imageSrc
            ? URL.createObjectURL(imageSrc)
            : ""
        }
        alt={alt}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          transition: "all 0.2s ease",
          filter: isChosen ? "brightness(0.8)" : "none",
        }}
      />
    </Paper>
  );
};

export default SampleView;
