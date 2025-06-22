import CardPekerjaan from "@/components/CardPekerjaan";
import CardPenjahit from "@/components/CardPenjahit";
import GlobalStyles from "@/styles/GlobalStyles";
import { DataItemPekerjaan, PEKERJAAN_DATA } from "@/data/DataPekerjaanDummy";
import { PENJAHIT_DATA } from "@/data/DataPenjahitDummy";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import ProfileStyles from "@/styles/ProfileStyles";

export default function DetailPenjahit() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [showDesc, setShowDesc] = useState(false);

  const router = useRouter();

  const detailData = PENJAHIT_DATA.find((item) => item.idPenjahit === id);
  const pekerjaanData = PEKERJAAN_DATA.filter(
    (item) => item.dataPenjahit.idPenjahit === id
  );

  if (!detailData) {
    return (
      <Text style={{ textAlign: "center", marginTop: 20 }}>
        Data tidak ditemukan
      </Text>
    );
  }

  if (!pekerjaanData) {
    return (
      <Text style={{ textAlign: "center", marginTop: 20 }}>
        Data tidak ditemukan
      </Text>
    );
  }

  const handleShowDesc = () => {
    setShowDesc((prev) => !prev);
  };

  return (
    <View style={GlobalStyles.container}>
      <ScrollView>
        <CardPenjahit
          namaPenjahit={detailData.namaPenjahit}
          lokasiPenjahit={detailData.lokasiPenjahit}
          ratingPenjahit={detailData.ratingPenjahit}
          tarifJahit={detailData.tarifJahit}
          spesialisasiPenjahit={detailData.spesialisasiPenjahit}
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
                {detailData.deskripsiPenjahit}
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
