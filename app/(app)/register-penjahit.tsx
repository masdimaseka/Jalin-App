import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { colors } from "@/constant/theme";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useUserData } from "@/hooks/useUserData";
import { containerStyles } from "@/styles/ContainerStyles";
import { textStyles } from "@/styles/TextStyles";
import { inputStyles } from "@/styles/InputStyles";
import { buttonStyles } from "@/styles/ButtonStyles";
import { useTakePhoto } from "@/hooks/useTakePhoto";
import Checkbox from "expo-checkbox";

export default function RegisterPenjahit() {
  const [deskripsi, setDeskripsi] = useState("");
  const [biaya, setBiaya] = useState("");
  const [kemampuan, setKemampuan] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecked, setChecked] = useState(false);

  const { image, takePhoto } = useTakePhoto();
  const { userData, loadingUserData } = useUserData();

  const router = useRouter();

  const handleSubmit = async () => {
    if (!deskripsi || !biaya || !image || isChecked === false) {
      alert("Peringatan: Semua field, foto, dan ketentuan harus diisi");
      return;
    }

    setIsSubmitting(true);
    try {
      const docRef = doc(db, "users", userData?.uid || "");
      await updateDoc(docRef, {
        role: "penjahit",
        dataPenjahit: {
          deskripsi,
          rataRataBiaya: biaya,
          kemampuan,
          buktiPenjahit: image,
          accWithTNC: isChecked,
        },
      });

      Alert.alert("Selamat!", "Pendaftaran penjahit berhasil!");
      router.push("/(app)/(tabs)");
    } catch (error: any) {
      console.error("Error creating post:", error);
      alert("Gagal daftar: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingUserData) {
    return (
      <View style={containerStyles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={containerStyles.container}>
      <ScrollView>
        <Text style={[textStyles.subTitle, { marginBottom: 20 }]}>
          Lengkapi form berikut
        </Text>

        <Text style={{ marginBottom: 8 }}>Deskripsi diri kamu</Text>
        <TextInput
          multiline
          numberOfLines={4}
          style={inputStyles.multilineInput}
          placeholder="Saya adalah penjahit..."
          value={deskripsi}
          onChangeText={setDeskripsi}
        />

        <Text style={{ marginBottom: 8 }}>Rata-rata biaya jasa</Text>
        <TextInput
          style={inputStyles.input}
          placeholder="xx.xxx - xxx.xxx"
          value={biaya}
          onChangeText={setBiaya}
        />

        <Text style={{ marginBottom: 8 }}>Kemampuan khusus</Text>
        <TextInput
          style={inputStyles.input}
          placeholder="jas, baju, celana, dll"
          value={kemampuan}
          onChangeText={setKemampuan}
        />

        <Text style={{ marginBottom: 8 }}>Bukti sebagai penjahit</Text>
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

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            marginTop: 30,
            marginBottom: 16,
          }}
        >
          <Checkbox
            style={{ width: 16, height: 16 }}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? colors.primary : undefined}
          />
          <Text>Menyetujui syarat dan ketentuan</Text>
        </View>

        <Pressable style={[buttonStyles.btnPrimary]} onPress={handleSubmit}>
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={buttonStyles.btnPrimaryText}>Daftar</Text>
          )}
        </Pressable>
      </ScrollView>
    </View>
  );
}
