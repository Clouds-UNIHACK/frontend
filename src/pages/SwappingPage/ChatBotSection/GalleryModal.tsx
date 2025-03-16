import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "../../../api/axios";
import { Grid2, Box } from "@mui/material";

export default function GalleryModal({
  open,
  setOpen,
  chooseImage,
}: {
  open: boolean;
  setOpen: (b: boolean) => void;
  chooseImage: (url: string) => void;
}) {
  const [gallery, setGallery] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("/api/v1/saved-images", {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
          withCredentials: true,
        });

        response?.data && setGallery(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (open) {
      fetchImages();
    }
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Choose your fit</DialogTitle>
      <DialogContent>
        <Grid2
          container
          spacing={2}
          sx={{ position: "relative", width: "100%" }}
        >
          {gallery.map((image, index) => (
            <Grid2
              size={3}
              key={index}
              sx={{ position: "relative", "&:hover": { scale: "110%" } }}
              onClick={() => {
                chooseImage(image.url);
                handleClose();
              }}
            >
              <Box component="img" src={image.url} sx={{ width: "100%" }} />
            </Grid2>
          ))}
        </Grid2>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
