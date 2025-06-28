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
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import cardStyles from "@/styles/CardStyles";
import useFormattedDeadline from "@/hooks/useFormatedDeadline";
import { useUserData } from "@/hooks/useUserData";
import { Ionicons } from "@expo/vector-icons";
import { containerStyles } from "@/styles/ContainerStyles";
import { textStyles } from "@/styles/TextStyles";
import { buttonStyles } from "@/styles/ButtonStyles";
import { colors } from "@/constant/theme";

export default function DetailPekerjaan() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { userData, loadingUserData } = useUserData();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const docRef = doc(db, "jahitan", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const detail = docSnap.data();
          setData(detail);
        } else {
          console.warn("Dokumen tidak ditemukan");
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id && !loadingUserData && userData) {
      fetchDetail();
    }
  }, [id, userData, loadingUserData]);

  const formattedDeadline = useFormattedDeadline(data?.deadline);

  if (loading || loadingUserData) {
    return (
      <View style={containerStyles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

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
          Penjahit :{" "}
        </Text>
        {data?.dataPenjahit.uid ? (
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
        ) : (
          <Text style={[{ marginTop: 8, marginBottom: 20 }]}>
            Belum ada penjahit
          </Text>
        )}

        <Text style={[textStyles.title, { marginTop: 12, marginBottom: 20 }]}>
          Detail Pekerjaan
        </Text>

        <View style={[cardStyles.card2, { gap: 8 }]}>
          <Text style={[textStyles.subTitle]}>Deskripsi pekerjaan</Text>
          <Text>{data?.deskripsi}</Text>
        </View>

        <View style={cardStyles.card2}>
          <Text>
            <Text style={[textStyles.subTitle]}>Status: </Text>
            {data?.status}
          </Text>
        </View>

        <View style={cardStyles.card2}>
          <Text>
            <Text style={[textStyles.subTitle]}>Deadline: </Text>
            {formattedDeadline}
          </Text>
        </View>

        <View style={[cardStyles.card2, { gap: 8 }]}>
          <Text style={[textStyles.subTitle]}>Alamat</Text>
          <Text>{data?.alamat}</Text>
        </View>
      </ScrollView>
      {data?.dataPenjahit.uid && (
        <Pressable style={[buttonStyles.btnPrimary, { marginVertical: 24 }]}>
          <Ionicons name="chatbubble-ellipses" size={16} color="white" />
          <Text style={buttonStyles.btnPrimaryText}>Hubungi Penjahit</Text>
        </Pressable>
      )}
    </View>
  );
}
