import {
  View,
  Text,
  Image,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useTakePhoto } from "@/hooks/useTakePhoto";
import { buttonStyles } from "@/styles/ButtonStyles";
import { containerStyles } from "@/styles/ContainerStyles";
import { uploadImageToCloudinary } from "@/service/cloudinaryService";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useLocalSearchParams, useRouter } from "expo-router";
import { getFormatedDate } from "@/hooks/useFormatedDate";

export default function FinishJahitan() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { image, takePhoto } = useTakePhoto();

  const router = useRouter();

  const handleSubmit = async () => {
    if (!image) {
      alert("Peringatan: Semua field harus diisi");
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = "";

      if (image) {
        imageUrl = await uploadImageToCloudinary(
          image,
          "jahitan-selesai",
          `gambar_${new Date().getTime()}`
        );
      }

      const docRef = doc(db, "jahitan", id);
      await updateDoc(docRef, {
        status: "selesai",
        imageSelesai: imageUrl || null,
        finishedAt: getFormatedDate(),
      });

      Alert.alert("Berhasil", "Jahitan telah berhasil diunggah");
      router.back();
    } catch (error: any) {
      console.error("Error creating post:", error);
      alert("Gagal daftar: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={containerStyles.container}>
      <Text style={{ marginBottom: 8 }}>
        Bukti Telah Menyelesaikan Pekerjaan
      </Text>
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: "100%",
            height: 300,
            borderRadius: 10,
            marginTop: 15,
          }}
        />
      )}
      <Pressable
        style={[buttonStyles.btnSecondary, { marginTop: 20 }]}
        onPress={takePhoto}
      >
        <Text style={buttonStyles.btnSecondaryText}>
          Ambil Foto Bukti Penjahit
        </Text>
      </Pressable>

      <Pressable style={buttonStyles.btnPrimary} onPress={handleSubmit}>
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={buttonStyles.btnPrimaryText}>Kirim</Text>
        )}
      </Pressable>
    </View>
  );
}
