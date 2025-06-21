import { Colors } from "@/constant/theme";
import CardStyles from "@/styles/CardStyles";
import GlobalStyles from "@/styles/GlobalStyles";
import { AntDesign, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { View, Text, Image } from "react-native";

type CardPenjahitProps = {
  namaPenjahit: string;
  lokasiPenjahit: string;
  ratingPenjahit: number;
  tarifJahit: string;
  spesialisasiPenjahit: string[];
};

const CardPenjahit = ({
  namaPenjahit,
  lokasiPenjahit,
  ratingPenjahit,
  tarifJahit,
  spesialisasiPenjahit,
}: CardPenjahitProps) => {
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
        <Text style={CardStyles.cardTitle}>{namaPenjahit}</Text>
        <View style={CardStyles.cardContentContainer}>
          <View style={CardStyles.cardContent}>
            <AntDesign name="star" size={12} color="orange" />
            <Text>{ratingPenjahit}</Text>
          </View>
          <View style={CardStyles.cardContent}>
            <FontAwesome5
              name="money-bill-wave"
              size={12}
              style={{ color: Colors.primary }}
            />
            <Text>{tarifJahit}</Text>
          </View>
        </View>
        <View style={CardStyles.cardContent}>
          <FontAwesome6
            name="location-dot"
            size={12}
            style={{ color: Colors.primary }}
          />
          <Text>{lokasiPenjahit}</Text>
        </View>
        <View style={CardStyles.cardContentContainer}>
          {spesialisasiPenjahit.length > 0 ? (
            spesialisasiPenjahit.map((specialty, index) => (
              <View key={index} style={CardStyles.cardCategory}>
                <Text style={{ fontSize: 12 }}>{specialty}</Text>
              </View>
            ))
          ) : (
            <Text>No specialties available</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default CardPenjahit;
