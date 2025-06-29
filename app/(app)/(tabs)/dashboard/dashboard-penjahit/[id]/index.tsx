import {
  View,
  Text,
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebase";
import cardStyles from "@/styles/CardStyles";
import useFormattedDeadline from "@/hooks/useFormatedDeadline";
import { useUserData } from "@/hooks/useUserData";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { containerStyles } from "@/styles/ContainerStyles";
import { textStyles } from "@/styles/TextStyles";
import { buttonStyles } from "@/styles/ButtonStyles";
import { colors } from "@/constant/theme";

export default function DetailPekerjaan() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { userData, loadingUserData } = useUserData();

  const router = useRouter();

  useEffect(() => {
    if (!id || loadingUserData || !userData) return;

    const docRef = doc(db, "jahitan", id);

    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          console.warn("Dokumen tidak ditemukan");
        }
        setLoading(false);
      },
      (error) => {
        console.error("Gagal mengambil data:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [id, userData, loadingUserData]);

  const formattedDeadline = useFormattedDeadline(data?.deadline);

  let formattedFinished = "";
  if (data?.status === "selesai") {
    formattedFinished = useFormattedDeadline(data?.finishedAt);
  }

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

        {data?.status === "selesai" && (
          <View>
            <Text
              style={[textStyles.title, { marginTop: 12, marginBottom: 20 }]}
            >
              Pekerjaan Telah Selesai
            </Text>
            <Image
              source={{ uri: data?.imageSelesai }}
              style={{
                width: "100%",
                height: 200,
                marginVertical: 10,
                borderRadius: 10,
              }}
              resizeMode="cover"
            />
            <View style={cardStyles.card2}>
              <Text>
                <Text style={[textStyles.subTitle]}>Tanggal selesai : </Text>
                {formattedFinished}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {data?.status !== "selesai" && (
        <View style={{ marginTop: 20 }}>
          <Pressable
            style={[buttonStyles.btnPrimary]}
            onPress={() => {
              router.push({
                pathname: "/(app)/chat",
                params: { id },
              });
            }}
          >
            <Ionicons name="chatbubble-ellipses" size={16} color="white" />
            <Text style={buttonStyles.btnPrimaryText}>Hubungi Customer</Text>
          </Pressable>
          <Pressable
            style={[buttonStyles.btnSuccess]}
            onPress={() => {
              router.push({
                pathname:
                  "/(app)/(tabs)/dashboard/dashboard-penjahit/[id]/finish-jahitan",
                params: { id },
              });
            }}
          >
            <FontAwesome name="check-circle" size={16} color="white" />
            <Text style={buttonStyles.btnSuccessText}>Pekerjaan Selesai?</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
