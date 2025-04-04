import CardPenjahit from "@/components/CardPenjahit";
import { PENJAHIT_DATA } from "@/constant/DataDummy";
import GlobalStyles from "@/constant/GlobalStyles";
import { AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function DetailPenjahit() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [showDesc, setShowDesc] = useState(false);

  const detailData = PENJAHIT_DATA.find((item) => item.id === id);

  if (!detailData) {
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
          name={detailData.name}
          location={detailData.location}
          rating={detailData.rating}
          paymentRate={detailData.paymentRate}
          specialties={detailData.specialties}
        />
        <View style={GlobalStyles.profileDescContainer}>
          <Pressable onPress={handleShowDesc} style={GlobalStyles.profileDesc}>
            <Text style={GlobalStyles.profileDescText}>
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
              <Text style={{ textAlign: "justify" }}>{detailData.desc}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
