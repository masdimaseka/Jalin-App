import GlobalStyles from "@/constant/GlobalStyles";
import { View, Text, Image, TouchableOpacity } from "react-native";

type CardPenjahitProps = {
  name: string;
  location: string;
  rating: number;
  paymentRate: string;
  specialties: string[];
  onPress?: () => void;
};

const CardPenjahit = ({
  name,
  location,
  rating,
  paymentRate,
  specialties,
  onPress,
}: CardPenjahitProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={GlobalStyles.card}>
      <View style={GlobalStyles.cardContainer}>
        <Image
          source={require("@/assets/images/avatar.png")}
          style={{
            width: 64,
            height: 64,
          }}
        />
      </View>
      <View style={GlobalStyles.cardContainer}>
        <Text style={GlobalStyles.cardTitle}>{name}</Text>
        <View style={GlobalStyles.cardContentContainer}>
          <Text>{location}</Text>
          <Text>{rating}</Text>
          <Text>{paymentRate}</Text>
        </View>
        <View style={GlobalStyles.cardContentContainer}>
          {specialties.length > 0 ? (
            specialties.map((specialty, index) => (
              <Text key={index}>{specialty}</Text>
            ))
          ) : (
            <Text>No specialties available</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardPenjahit;
