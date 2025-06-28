import {
  View,
  Text,
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import cardStyles from "@/styles/CardStyles";
import useFormattedDeadline from "@/hooks/useFormatedDeadline";
import { useUserData } from "@/hooks/useUserData";
import { containerStyles } from "@/styles/ContainerStyles";
import { textStyles } from "@/styles/TextStyles";
import { buttonStyles } from "@/styles/ButtonStyles";

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
    <View style={containerStyles.container}>
      <ScrollView>
        <Text style={[textStyles.title]}>
          {data?.judul ?? "Tidak ada judul"}
        </Text>

        <Image
          source={{ uri: data?.gambar }}
          style={{
            width: "100%",
            height: 200,
            marginVertical: 10,
            borderRadius: 10,
          }}
          resizeMode="cover"
        />

        <Text style={[textStyles.subTitle, { marginTop: 12 }]}>
          Customer :{" "}
        </Text>
        <View
          style={{
            marginTop: 8,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            marginBottom: 10,
          }}
        >
          <Image
            source={
              data?.dataUser?.profileImg
                ? { uri: data?.dataUser?.profileImg }
                : require("@/assets/images/avatar.png")
            }
            style={{ width: 24, height: 24, borderRadius: 24 }}
          />
          <Text>{data?.dataUser?.nama}</Text>
        </View>

        <Text style={[textStyles.title, { marginTop: 12, marginBottom: 20 }]}>
          Detail Pekerjaan
        </Text>

        <View style={[cardStyles.card2, { gap: 8 }]}>
          <Text style={[textStyles.subTitle]}>Deskripsi pekerjaan</Text>
          <Text>{data?.deskripsi}</Text>
        </View>

        <View style={cardStyles.card2}>
          <Text>
            <Text style={[textStyles.subTitle]}>Status : </Text>
            {data?.status}
          </Text>
        </View>

        <View style={cardStyles.card2}>
          <Text>
            <Text style={[textStyles.subTitle]}>Deadline : </Text>
            {formatedDeadline}
          </Text>
        </View>

        <View style={[cardStyles.card2, { gap: 8 }]}>
          <Text style={[textStyles.subTitle]}>Alamat</Text>
          <Text>{data?.alamat}</Text>
        </View>

        {userData?.role === "penjahit" && data?.status === "pending" && (
          <Pressable style={buttonStyles.btnPrimary} onPress={handleSubmit}>
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={buttonStyles.btnPrimaryText}>Ambil pekerjaan</Text>
            )}
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
}
