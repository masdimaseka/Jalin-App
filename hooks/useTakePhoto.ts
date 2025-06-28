import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export const useTakePhoto = () => {
  const [image, setImage] = useState<string | null>(null);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Izin akses kamera dibutuhkan!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  return { image, setImage, takePhoto };
};
