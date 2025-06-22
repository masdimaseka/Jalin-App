import { Colors } from "@/constant/theme";
import CardStyles from "@/styles/CardStyles";
import { FontAwesome5, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { View, Text, Image } from "react-native";

type CardPenjahitProps = {
  nama: string;
  lokasi: string;
  dataPenjahit: any;
};

const CardPenjahit = ({ nama, lokasi, dataPenjahit }: CardPenjahitProps) => {
  return (
    <View style={CardStyles.card}>
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
        <Text style={CardStyles.cardTitle}>{nama}</Text>
        <View style={CardStyles.cardContent}>
          <MaterialIcons
            name="handyman"
            size={12}
            style={{ color: Colors.primary }}
          />
          <Text>{dataPenjahit.kemampuan}</Text>
        </View>
        <View style={CardStyles.cardContent}>
          <FontAwesome5
            name="money-bill-wave"
            size={12}
            style={{ color: Colors.primary }}
          />
          <Text>{dataPenjahit.rataRataBiaya}</Text>
        </View>
        <View style={CardStyles.cardContent}>
          <FontAwesome6
            name="location-dot"
            size={12}
            style={{ color: Colors.primary }}
          />
          <Text>{lokasi}</Text>
        </View>
      </View>
    </View>
  );
};

export default CardPenjahit;
