import {
  View,
  Text,
  ActivityIndicator,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import GlobalStyles from "@/styles/GlobalStyles";
import CardStyles from "@/styles/CardStyles";
import useFormattedDeadline from "@/hooks/useFormatedDeadline";
import { Colors } from "@/constant/theme";
import { useUserData } from "@/hooks/useUserData";

export default function DetailPekerjaan() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { userData, loadingUserData } = useUserData();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const docRef = doc(db, "jahitan", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          console.warn("Dokumen tidak ditemukan");
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDetail();
  }, [id]);

  const formatedDeadline = useFormattedDeadline(data?.deadline);

  const handleSubmit = async () => {
    if (!id) return;
    setIsSubmitting(true);

    try {
      const docRef = doc(db, "jahitan", id);
      await updateDoc(docRef, {
        status: "diproses",
        dataPenjahit: {
          uid: userData?.uid,
          nama: userData?.nama || "",
          email: userData?.email || "",
          noTelp: userData?.noTelp || "",
          lokasi: userData?.lokasi || "",
        },
      });

      setData((prev: any) => ({
        ...prev,
        status: "diproses",
        idPenjahit: userData?.uid,
      }));

      console.log("Pekerjaan berhasil diambil!");
    } catch (error) {
      console.error("Gagal memperbarui status:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;

  return (
    <View style={GlobalStyles.container}>
      <Text style={[GlobalStyles.title]}>
        {data?.judul ?? "Tidak ada judul"}
      </Text>

      <View
        style={{
          marginTop: 8,
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          marginBottom: 20,
        }}
      >
        <Image
          source={require("@/assets/images/avatar.png")}
          style={{ width: 24, height: 24 }}
        />
        <Text>{data?.dataUser?.nama}</Text>
      </View>

      <View style={[CardStyles.card2, { gap: 8 }]}>
        <Text style={[GlobalStyles.subTitle]}>Deskripsi pekerjaan</Text>
        <Text>{data?.deskripsi}</Text>
      </View>

      <View style={CardStyles.card2}>
        <Text>
          <Text style={[GlobalStyles.subTitle]}>Status : </Text>
          {data?.status}
        </Text>
      </View>

      <View style={CardStyles.card2}>
        <Text>
          <Text style={[GlobalStyles.subTitle]}>Deadline : </Text>
          {formatedDeadline}
        </Text>
      </View>

      <View style={[CardStyles.card2, { gap: 8 }]}>
        <Text style={[GlobalStyles.subTitle]}>Alamat</Text>
        <Text>{data?.alamat}</Text>
      </View>

      {userData?.role === "penjahit" && data?.status === "pending" && (
        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>Ambil pekerjaan</Text>
          )}
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
