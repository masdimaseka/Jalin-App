import { View, Text, Image } from "react-native";
import React from "react";
import GlobalStyles from "@/constant/GlobalStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { DataItemUser } from "@/data/DataUserDummy";
import { DataItemPenjahit } from "@/data/DataPenjahitDummy";

type CardPekerjaanProps = {
  dataUser?: DataItemUser;
  dataPenjahit?: DataItemPenjahit;
  judulPekerjaan: string;
  deadlinePengerjaan: string;
  statusPekerjaan: "pending" | "proses" | "selesai";
};

const CardPekerjaan = ({
  dataUser,
  dataPenjahit,
  judulPekerjaan,
  deadlinePengerjaan,
  statusPekerjaan,
}: CardPekerjaanProps) => {
  return (
    <View
      style={[
        GlobalStyles.card,
        { borderWidth: 0.5, borderColor: "lightgray" },
      ]}
    >
      <View>
        <Image
          source={require("@/assets/images/banner.png")}
          style={{ width: 280, height: 150, borderRadius: 8 }}
          resizeMode="cover"
        />
      </View>
      <View>
        <Text style={GlobalStyles.cardTitle}>{judulPekerjaan}</Text>
        <View style={GlobalStyles.cardContentContainer}>
          <View style={GlobalStyles.cardContent}>
            <MaterialIcons name="work" size={12} color="lightgreen" />
            <Text>{statusPekerjaan}</Text>
          </View>
          <View style={GlobalStyles.cardContent}>
            <MaterialIcons name="calendar-month" size={12} color="red" />
            <Text>{deadlinePengerjaan}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CardPekerjaan;
