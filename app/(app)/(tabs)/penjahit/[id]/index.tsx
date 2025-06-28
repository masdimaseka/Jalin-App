import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { AntDesign, Fontisto, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import CardPenjahit from "@/components/CardPenjahit";
import profileStyles from "@/styles/ProfileStyles";
import { db } from "@/config/firebase";
import { containerStyles } from "@/styles/ContainerStyles";
import { buttonStyles } from "@/styles/ButtonStyles";
import { colors } from "@/constant/theme";

export default function DetailPenjahit() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showDesc, setShowDesc] = useState(false);

  const router = useRouter();

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
    return (
      <View style={containerStyles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!data || !data.dataPenjahit) {
    return (
      <View style={containerStyles.container}>
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Data penjahit tidak ditemukan.
        </Text>
      </View>
    );
  }

  return (
    <View style={containerStyles.container}>
      <ScrollView>
        <CardPenjahit
          nama={data.nama}
          alamat={data.alamat}
          dataPenjahit={data.dataPenjahit}
          profileImg={data.profileImg}
        />

        <View style={profileStyles.profileDescContainer}>
          <Pressable onPress={handleShowDesc} style={profileStyles.profileDesc}>
            <Text style={profileStyles.profileDescText}>
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

        <Pressable
          style={[buttonStyles.btnPrimary, { marginTop: 12, marginBottom: 12 }]}
          onPress={() =>
            router.push({
              pathname: "/(app)/(tabs)/penjahit/[id]/riwayat",
              params: { id: data.uid },
            })
          }
        >
          <Fontisto name="history" size={16} color="white" />
          <Text style={buttonStyles.btnPrimaryText}>Riwayat Pekerjaan</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
