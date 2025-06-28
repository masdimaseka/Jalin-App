import { View, Image, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useUserData } from "@/hooks/useUserData";

const Header = () => {
  const { userData, loadingUserData } = useUserData();
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
      <Pressable onPress={() => router.push("/profile")}>
        {loadingUserData ? (
          <Image
            source={require("@/assets/images/avatar.png")}
            style={{ width: 40, height: 40, borderRadius: 40 }}
          />
        ) : (
          <Image
            source={
              userData?.profileImg
                ? { uri: userData.profileImg }
                : require("@/assets/images/avatar.png")
            }
            style={{ width: 40, height: 40, borderRadius: 40 }}
          />
        )}
      </Pressable>
    </View>
  );
};

export default Header;
