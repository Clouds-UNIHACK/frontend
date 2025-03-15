import axios from "./axios";
import { API_URLS } from "./apiUrls";

interface UploadResponse {
  success: boolean;
  message: string;
  data?: any; // Adjust according to the API response
}

export async function uploadImages(
  human_image: File | Blob,
  clothes_image: File | Blob
): Promise<UploadResponse> {
  try {
    const formData = new FormData();
    formData.append("human_image", human_image);
    formData.append("clothes_image", clothes_image);

    const response = await axios.post<UploadResponse>(
      API_URLS.generateImageUrl,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error uploading images:", error);
    return {
      success: false,
      message: "Failed to upload images",
    };
  }
}

import { jwtDecode } from "jwt-decode";

export function getAccessToken() {
  const token = sessionStorage.getItem("accessToken");
  if (!token) {
    return null;
  }

  try {
    const expTime = jwtDecode(token).exp;
    const currTime = Date.now() / 1000;
    console.log("Exp -", expTime, "Curr -", currTime);
    if (expTime === undefined || expTime < currTime) {
      return null;
    } else {
      return token;
    }
  } catch (error) {
    return null;
  }
}

export default getAccessToken;
