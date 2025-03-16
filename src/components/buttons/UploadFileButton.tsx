import { Input, Button } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import React from "react";
interface UploadFileButtonProps {
  onUpload: (file: File) => void;
}

const UploadFileButton = ({ onUpload }: UploadFileButtonProps) => {
  return (
    <Button
      variant="contained"
      component="label"
      sx={{
        bgcolor: "rgba(0,0,0,0)",
        color: "#000",
        "&:hover": { bgcolor: "#7CCD7C" },
      }}
    >
      <UploadFileIcon />
      <Input
        type="file"
        sx={{ display: "none" }}
        onClick={(event) => {
          (event.target as HTMLInputElement).value = "";
        }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            onUpload(files[0]);
          }
        }}
      />
    </Button>
  );
};

export default UploadFileButton;
