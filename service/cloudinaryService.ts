const CLOUDINARY_URL = process.env.EXPO_PUBLIC_CLOUDINARY_URL;
const UPLOAD_PRESET = "ml_default";

if (!CLOUDINARY_URL) {
  throw new Error("EXPO_PUBLIC_CLOUDINARY_URL is not configured");
}

export const uploadImageToCloudinary = async (
  imageUri: string,
  folderName = "default_folder",
  fileName = "uploaded_image"
): Promise<string> => {
  try {
    const formData = new FormData();

    const fileType = imageUri.split(".").pop()?.toLowerCase() || "jpg";
    const mimeType = fileType === "png" ? "image/png" : "image/jpeg";

    formData.append("file", {
      uri: imageUri,
      type: mimeType,
      name: `${fileName}.${fileType}`,
    } as any);

    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", folderName);
    formData.append("public_id", fileName);

    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok && data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error(data.error?.message || "Upload gagal.");
    }
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};
