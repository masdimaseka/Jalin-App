import { View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Header = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Image
        source={require("@/assets/images/jalin-biru.png")}
        style={{ width: 70, height: 40 }}
      />
      <Link href="/login" asChild>
        <TouchableOpacity>
          <Image
            source={require("@/assets/images/avatar.png")}
            style={{ width: 32, height: 32 }}
          />
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Header;
