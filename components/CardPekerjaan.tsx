import { View, Text, Image } from "react-native";
import React from "react";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import cardStyles from "@/styles/CardStyles";
import { colors } from "@/constant/theme";
import useFormatedDeadline from "@/hooks/useFormatedDeadline";

type CardPekerjaanProps = {
  dataUser: any;
  judul: string;
  deadline: string;
  alamat: string;
};

const CardPekerjaan = ({
  judul,
  deadline,
  dataUser,
  alamat,
}: CardPekerjaanProps) => {
  const formatedDeadline = useFormatedDeadline(deadline);

  return (
    <View style={[cardStyles.card2]}>
      <View>
        <Text style={cardStyles.cardTitle2}>{judul}</Text>
        <View style={cardStyles.cardContent2}>
          <MaterialIcons name="calendar-month" size={12} color="red" />
          <Text>{formatedDeadline}</Text>
        </View>
        <View style={cardStyles.cardContent2}>
          <FontAwesome6
            name="map-location-dot"
            size={12}
            style={{ color: colors.primary }}
          />
          <Text>{alamat}</Text>
        </View>
        <View
          style={{
            borderTopWidth: 0.5,
            borderColor: "gray",
            marginTop: 16,
            paddingTop: 16,
          }}
        >
          <Text style={{ fontWeight: "bold", marginBottom: 8 }}>
            Customer :{" "}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Image
              source={require("@/assets/images/avatar.png")}
              style={{ width: 24, height: 24 }}
            />
            <Text>{dataUser.nama}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CardPekerjaan;
