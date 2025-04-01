import { View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const Header = () => {
  const router = useRouter();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
      }}
    >
      <Image
        source={require("@/assets/images/jalin-biru.png")}
        style={{ width: 70, height: 40 }}
      />
      <TouchableOpacity onPress={() => router.push("/login")}>
        <Image
          source={require("@/assets/images/avatar.png")}
          style={{ width: 32, height: 32 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
