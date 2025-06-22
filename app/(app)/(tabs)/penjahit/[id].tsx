import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import CardPenjahit from "@/components/CardPenjahit";
import GlobalStyles from "@/styles/GlobalStyles";
import ProfileStyles from "@/styles/ProfileStyles";
import { db } from "@/config/firebase";

export default function DetailPenjahit() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showDesc, setShowDesc] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "users", id);
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

    fetchDetail();
  }, [id]);

  const handleShowDesc = () => setShowDesc((prev) => !prev);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 40 }} size="large" />;
  }

  if (!data || !data.dataPenjahit) {
    return (
      <View style={GlobalStyles.container}>
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Data penjahit tidak ditemukan.
        </Text>
      </View>
    );
  }

  return (
    <View style={GlobalStyles.container}>
      <ScrollView>
        <CardPenjahit
          nama={data.nama}
          lokasi={data.lokasi}
          dataPenjahit={data.dataPenjahit}
        />

        <View style={ProfileStyles.profileDescContainer}>
          <Pressable onPress={handleShowDesc} style={ProfileStyles.profileDesc}>
            <Text style={ProfileStyles.profileDescText}>
              Lihat Deskripsi Penjahit
            </Text>
            {showDesc ? (
              <AntDesign name="down" size={12} color="black" />
            ) : (
              <AntDesign name="right" size={12} color="black" />
            )}
          </Pressable>

          {showDesc && (
            <View style={{ marginTop: 12 }}>
              <Text style={{ textAlign: "justify" }}>
                {data.dataPenjahit.deskripsi ||
                  "Deskripsi penjahit belum tersedia."}
              </Text>
            </View>
          )}
        </View>

        <Pressable style={[GlobalStyles.btnPrimary, { marginVertical: 24 }]}>
          <Ionicons name="chatbubble-ellipses" size={16} color="white" />
          <Text style={GlobalStyles.btnPrimaryText}>Hubungi Penjahit</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
