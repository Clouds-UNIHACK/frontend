import { Box, Grid2, Typography } from "@mui/material";
import { useState } from "react";
import GalleryModal from "./GalleryModal";
import axios from "../../../api/axios";

const ChatBotSection = () => {
  const [images, setImages] = useState<any[]>([null, null, null, null]);

  const [isOpen, setIsOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const openModal = (index: number) => {
    setIsOpen(true);
    setImageIndex(index);
  };
  const [text, setText] = useState("");
  const [reply, setReply] = useState("haha");
  console.log(reply);

  const onSubmit = async () => {
    try {
      if (images.every((image) => image === null)) {
        alert("Please select at least one image");
        return;
      }
      await axios
        .post(
          "/api/v1/recommend-stylist",
          {
            image_urls: images.filter((image) => image !== null),
            prompt: text,
          },
          {
            headers: {
              Authorization: localStorage.getItem("accessToken"),
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log(response.data);
          setReply(response.data.response.message.content);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ position: "relative", width: "100%", marginBottom: "20px" }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100px",
        }}
      >
        <Typography
          variant="h5"
          sx={{ textAlign: "start", lineHeight: "100px" }}
        >
          YOUR FAVORITES:
        </Typography>

        <Box sx={{ display: "flex", gap: 4 }}>
          <Grid2
            container
            spacing={2}
            sx={{
              position: "relative",
            }}
          >
            {images.map((image, index) => (
              <Grid2
                size={6}
                key={index}
                sx={{
                  position: "relative",
                  bgcolor: "#f3f3f3",
                  borderRadius: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  objectFit: "cover",
                  width: "200px",
                  height: "300px",
                }}
                onClick={() => openModal(index)}
              >
                <Box component="img" src={image} sx={{ width: "100%" }} />
              </Grid2>
            ))}
          </Grid2>

          <Box
            sx={{
              width: "100%",
              maxHeight: "750px",
              bottom: 0,
              padding: "10px",
            }}
          >
            <Typography variant="h6" sx={{ textAlign: "start" }}>
              Ask Stylist:
            </Typography>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "10px",
                gap: 4,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <Box
                  component="textarea"
                  sx={{
                    position: "relative",
                    width: "100%",
                    flexGrow: 1,
                    padding: "10px",
                    borderRadius: "5px",
                    height: "120px",
                  }}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <Box
                  component="button"
                  sx={{
                    position: "absolute",
                    right: 4,
                    bottom: 4,
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={onSubmit}
                >
                  Send
                </Box>
              </Box>

              <Box
                component="textarea"
                disabled
                sx={{
                  position: "relative",
                  width: "100%",
                  flexGrow: 1,
                  padding: "10px",
                  border: "0px",
                  background: "transparent",
                  height: "120px",
                }}
                value={reply}
              />
            </Box>
          </Box>
        </Box>
        <GalleryModal
          open={isOpen}
          setOpen={(b: boolean) => setIsOpen(b)}
          chooseImage={(s: string) =>
            setImages((state) => {
              const newImages = [...state];
              newImages[imageIndex] = s;
              return newImages;
            })
          }
        />
      </Box>
    </Box>
  );
};

export default ChatBotSection;
