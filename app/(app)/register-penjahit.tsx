import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import GlobalStyles from "@/styles/GlobalStyles";
import { useRouter } from "expo-router";
import { Colors } from "@/constant/theme";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { AuthContext } from "@/context/AuthContext";
import { useUserData } from "@/hooks/useUserData";

export default function RegisterPenjahit() {
  const [deskripsi, setDeskripsi] = useState("");
  const [biaya, setBiaya] = useState("");
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
    <View style={GlobalStyles.container}>
      <Text style={[GlobalStyles.subTitle, { marginBottom: 20 }]}>
        Lengkapi form berikut
      </Text>

      <Text style={{ marginBottom: 8 }}>Deskripsi diri kamu</Text>
      <TextInput
        multiline
        numberOfLines={4}
        style={styles.multilineInput}
        placeholder="Deskripsi Pekerjaan"
        value={deskripsi}
        onChangeText={setDeskripsi}
      />

      <Text style={{ marginBottom: 8 }}>Rata-rata biaya jasa</Text>
      <TextInput
        style={styles.input}
        placeholder="Rata-rata Biaya Jasa"
        value={biaya}
        onChangeText={setBiaya}
      />

      <Pressable
        style={[styles.submitButton, { marginTop: 20 }]}
        onPress={handleSubmit}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitText}>Daftar</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    justifyContent: "center",
  },
  multilineInput: {
    width: "100%",
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    textAlignVertical: "top",
    paddingTop: 10,
  },
  submitButton: {
    width: "100%",
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
