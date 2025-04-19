import { Colors } from "@/constant/Colors";
import CardStyles from "@/styles/CardStyles";
import GlobalStyles from "@/styles/GlobalStyles";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

const profile = () => {
  const router = useRouter();

  return (
    <View style={GlobalStyles.container}>
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
          <Text style={CardStyles.cardTitle}>Primakara University</Text>
          <View style={CardStyles.cardContentContainer}>
            <View style={CardStyles.cardContent}>
              <FontAwesome
                name="phone"
                size={16}
                style={{ color: Colors.primary }}
              />
              <Text>62123456780</Text>
            </View>
            <View style={CardStyles.cardContent}>
              <FontAwesome6
                name="location-dot"
                size={12}
                style={{ color: Colors.primary }}
              />
              <Text>Jl. Tukad Badung</Text>
            </View>
          </View>
        </View>
      </View>
      <Pressable
        style={[
          GlobalStyles.btnPrimary,
          { marginTop: 12, backgroundColor: "lightgray" },
        ]}
      >
        <Text style={GlobalStyles.btnPrimaryText}>Edit Profile</Text>
      </Pressable>
      <Pressable
        style={[
          GlobalStyles.btnPrimary,
          { marginTop: 2, backgroundColor: "red" },
        ]}
        onPress={() => router.push("/login")}
      >
        <Text style={GlobalStyles.btnPrimaryText}>Log Out</Text>
      </Pressable>
    </View>
  );
};

export default profile;
