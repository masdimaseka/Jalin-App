import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import GlobalStyles from "@/constant/GlobalStyles";

const Header = () => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Image
        source={require("@/assets/images/jalin-biru.png")}
        style={{ width: 70, height: 40 }}
      />
      <Link href="/login" asChild>
        <Pressable style={GlobalStyles.btnPrimary}>
          <FontAwesome name="user-circle" size={18} color="white" />
          <Text style={GlobalStyles.btnPrimaryText}>Log In</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default Header;
