import {
  View,
  Text,
  ActivityIndicator,
  Image,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import GlobalStyles from "@/styles/GlobalStyles";
import CardStyles from "@/styles/CardStyles";
import useFormattedDeadline from "@/hooks/useFormatedDeadline";
import { useUserData } from "@/hooks/useUserData";
import { Ionicons } from "@expo/vector-icons";

export default function DetailPekerjaan() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState<"user" | "penjahit" | null>(null);

  const { userData, loadingUserData } = useUserData();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const docRef = doc(db, "jahitan", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const detail = docSnap.data();
          setData(detail);

          if (userData?.uid) {
            if (detail?.dataUser?.uid === userData.uid) {
              setShow("user");
            } else if (detail?.dataPenjahit?.uid === userData.uid) {
              setShow("penjahit");
            }
          }
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

  if (loading || loadingUserData || !show) {
    return <ActivityIndicator style={{ marginTop: 40 }} />;
  }

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
          <Text style={[GlobalStyles.subTitle]}>Status: </Text>
          {data?.status}
        </Text>
      </View>

      <View style={CardStyles.card2}>
        <Text>
          <Text style={[GlobalStyles.subTitle]}>Deadline: </Text>
          {formattedDeadline}
        </Text>
      </View>

      <View style={[CardStyles.card2, { gap: 8 }]}>
        <Text style={[GlobalStyles.subTitle]}>Alamat</Text>
        <Text>{data?.alamat}</Text>
      </View>

      {show === "user" && (
        <Pressable style={[GlobalStyles.btnPrimary, { marginVertical: 24 }]}>
          <Ionicons name="chatbubble-ellipses" size={16} color="white" />
          <Text style={GlobalStyles.btnPrimaryText}>Hubungi Penjahit</Text>
        </Pressable>
      )}

      {show === "penjahit" && (
        <Pressable style={[GlobalStyles.btnPrimary, { marginTop: 24 }]}>
          <Ionicons name="chatbubble-ellipses" size={16} color="white" />
          <Text style={GlobalStyles.btnPrimaryText}>Hubungi Customer</Text>
        </Pressable>
      )}
    </View>
  );
}
