import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { colors } from "@/constant/theme";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useUserData } from "@/hooks/useUserData";
import { containerStyles } from "@/styles/ContainerStyles";
import { textStyles } from "@/styles/TextStyles";
import { inputStyles } from "@/styles/InputStyles";
import { buttonStyles } from "@/styles/ButtonStyles";

export default function RegisterPenjahit() {
  const [deskripsi, setDeskripsi] = useState("");
  const [biaya, setBiaya] = useState("");
  const [kemampuan, setKemampuan] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { userData, loadingUserData } = useUserData();

  const router = useRouter();

  const handleSubmit = async () => {
    if (!deskripsi || !biaya) {
      alert("Peringatan: Semua field harus diisi");
      return;
    }

    setIsSubmitting(true);
    try {
      const docRef = doc(db, "users", userData?.uid || "");
      await updateDoc(docRef, {
        role: "penjahit",
        dataPenjahit: {
          deskripsi: deskripsi,
          rataRataBiaya: biaya,
          kemampuan: kemampuan,
        },
      });

      console.log("Berhasil daftar sebagai penjahit!");
      router.push("/(app)/(tabs)");
    } catch (error: any) {
      console.error("Error creating post:", error);
      alert("Gagal daftar: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingUserData)
    return <ActivityIndicator style={{ marginTop: 40 }} size="large" />;

  return (
    <View style={containerStyles.container}>
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

      <Pressable
        style={[buttonStyles.btnPrimary, { marginTop: 20 }]}
        onPress={handleSubmit}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={buttonStyles.btnPrimaryText}>Daftar</Text>
        )}
      </Pressable>
    </View>
  );
}
