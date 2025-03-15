import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import restClient from "../../api/client";
const GalleryPage = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await restClient.get("/api/v1/saved-images", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, []);

  return <Box></Box>;
};

export default GalleryPage;
