import { Box, Paper } from "@mui/material";

interface MainUploadViewProps {
  imageFile: File | null;
  children?: React.ReactNode;
}

const MainUploadView = ({
  imageFile,
  children,
  ...props
}: MainUploadViewProps) => {
  return (
    <Paper
      {...props}
      elevation={3}
      sx={{
        width: "100%",
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#fcfcfc",
        position: "relative",
        boxSizing: "border-box",
        border: "1px solid #202020",
        aspectRatio: "1/1",
      }}
    >
      {imageFile && (
        <Box
          component="img"
          src={URL.createObjectURL(imageFile)}
          alt="currentImage"
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      )}
      {children}
    </Paper>
  );
};

export default MainUploadView;
