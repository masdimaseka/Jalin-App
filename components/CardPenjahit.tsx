import { colors } from "@/constant/theme";
import cardStyles from "@/styles/CardStyles";
import { FontAwesome5, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { View, Text, Image } from "react-native";

type CardPenjahitProps = {
  nama: string;
  alamat: string;
  dataPenjahit: any;
  profileImg: string;
};

const CardPenjahit = ({
  nama,
  alamat,
  dataPenjahit,
  profileImg,
}: CardPenjahitProps) => {
  return (
    <View style={cardStyles.card}>
      <View>
        <Image
          source={
            profileImg
              ? { uri: profileImg }
              : require("@/assets/images/avatar.png")
          }
          style={{
            width: 80,
            height: 80,
            borderRadius: 80,
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
        <View style={[cardStyles.cardContent, { alignItems: "flex-start" }]}>
          <FontAwesome6
            name="location-dot"
            size={12}
            style={{ color: colors.primary }}
          />
          <Text>{alamat}</Text>
        </View>
      </View>
    </View>
  );
};

export default CardPenjahit;
