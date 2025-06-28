import { useRouter } from "expo-router";
import {
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Pressable,
  Image,
  Alert,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { db } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { AuthContext } from "@/context/AuthContext";
import * as Location from "expo-location";
import { containerStyles } from "@/styles/ContainerStyles";
import { textStyles } from "@/styles/TextStyles";
import { inputStyles } from "@/styles/InputStyles";
import { buttonStyles } from "@/styles/ButtonStyles";
import { usePickImage } from "@/hooks/usePickImage";
import { useGetLocation } from "@/hooks/useGetLocation";
import { uploadImageToCloudinary } from "@/service/cloudinaryService";

export default function CreateProfile() {
  const router = useRouter();

  const [nama, setNama] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, loading } = useContext(AuthContext);
  const { image, pickImage } = usePickImage();
  const { alamat, setAlamat } = useGetLocation();

  const handleSignUp = async () => {
    if (!nama || !noTelp || !alamat) {
      alert("Peringatan: Semua field harus diisi termasuk foto");
      return;
    }

    setIsSubmitting(true);
    try {
      if (!user?.uid) {
        alert("User belum login");
        return;
      }

      let imageUrl = "";
      if (image) {
        imageUrl = await uploadImageToCloudinary(
          image,
          "profile",
          `profile_${user.uid}`
        );
      }

      await updateDoc(doc(db, "users", user.uid), {
        nama,
        noTelp,
        alamat,
        profileImg: imageUrl || null,
        createdAt: new Date().toISOString(),
      });

      Alert.alert(
        "Akun berhasil dibuat!",
        "Pastikan sudah verifikasi email agar dapat login."
      );
      router.push("/(auth)/login");
    } catch (error: any) {
      console.error("Error registering:", error);
      alert("Gagal daftar: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return null;

  return (
    <View style={containerStyles.container}>
      <View style={containerStyles.formContainer}>
        <Text style={textStyles.title}>Buat Profile</Text>

        <View style={{ width: "100%" }}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{
                width: 120,
                height: 120,
                marginVertical: 10,
                borderRadius: 100,
                alignSelf: "center",
              }}
              resizeMode="cover"
            />
          )}

          <Text style={{ marginBottom: 8 }}>Unggah gambar</Text>
          <Pressable
            style={[buttonStyles.btnSecondary, buttonStyles.btnFull]}
            onPress={pickImage}
          >
            <Text style={buttonStyles.btnSecondaryText}>
              {image ? "Ganti Gambar" : "Pilih Gambar"}
            </Text>
          </Pressable>
        </View>

        <View style={{ width: "100%" }}>
          <Text style={{ marginBottom: 8 }}>Nama Lengkap</Text>
          <TextInput
            style={inputStyles.input}
            placeholder="Nama"
            value={nama}
            onChangeText={setNama}
          />
        </View>

        <View style={{ width: "100%" }}>
          <Text style={{ marginBottom: 8 }}>No Telepon</Text>
          <TextInput
            style={inputStyles.input}
            placeholder="08xx-xxxx-xxxx"
            value={noTelp}
            onChangeText={setNoTelp}
            keyboardType="phone-pad"
          />
        </View>

        <View style={{ width: "100%" }}>
          <Text style={{ marginBottom: 8 }}>Alamat</Text>
          <TextInput
            style={inputStyles.input}
            placeholder="Alamat Lokasi"
            value={alamat}
            onChangeText={setAlamat}
          />
        </View>

        <Pressable
          style={[buttonStyles.btnPrimary, buttonStyles.btnFull]}
          onPress={handleSignUp}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={buttonStyles.btnPrimaryText}>Simpan</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}
