import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import axios from "../../api/axios";
const GalleryPage = () => {
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("/api/v1/saved-images", {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
          withCredentials: true,
        });

        response?.data && setImages(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImages();
  }, []);

  console.log(images);
  return (
    <Box>
      <h1>Gallery</h1>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {images.map((image, index) => (
          <Box key={index} sx={{ width: "200px", margin: "8px" }}>
            <img
              src={image.url}
              alt="gallery"
              style={{ width: "100%", height: "100%" }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default GalleryPage;
