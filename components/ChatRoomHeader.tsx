// components/ChatRoomHeader.tsx
import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { textStyles } from "@/styles/TextStyles";

export default function ChatRoomHeader({ user }: any) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: "white",
        padding: 16,
      }}
    >
      <Image
        source={{ uri: user?.profileImg }}
        style={{ width: 38, height: 38, borderRadius: 40 }}
      />
      <Text style={textStyles.subTitle}>{user?.nama}</Text>
    </View>
  );
}
