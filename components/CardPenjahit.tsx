import { colors } from "@/constant/theme";
import cardStyles from "@/styles/CardStyles";
import { FontAwesome5, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { View, Text, Image } from "react-native";

type CardPenjahitProps = {
  nama: string;
  lokasi: string;
  dataPenjahit: any;
};

const CardPenjahit = ({ nama, lokasi, dataPenjahit }: CardPenjahitProps) => {
  return (
    <View style={cardStyles.card}>
      <View>
        <Image
          source={require("@/assets/images/avatar.png")}
          style={{
            width: 80,
            height: 80,
          }}
        />
      </View>
      <View>
        <Text style={cardStyles.cardTitle}>{nama}</Text>
        <View style={cardStyles.cardContent}>
          <MaterialIcons
            name="handyman"
            size={12}
            style={{ color: colors.primary }}
          />
          <Text>{dataPenjahit.kemampuan}</Text>
        </View>
        <View style={cardStyles.cardContent}>
          <FontAwesome5
            name="money-bill-wave"
            size={12}
            style={{ color: colors.primary }}
          />
          <Text>{dataPenjahit.rataRataBiaya}</Text>
        </View>
        <View style={cardStyles.cardContent}>
          <FontAwesome6
            name="location-dot"
            size={12}
            style={{ color: colors.primary }}
          />
          <Text>{lokasi}</Text>
        </View>
      </View>
    </View>
  );
};

export default CardPenjahit;
