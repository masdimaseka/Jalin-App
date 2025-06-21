import { StyleSheet } from "react-native";
import { Colors } from "../constant/theme";

const ProfileStyles = StyleSheet.create({
  profileDescContainer: {
    padding: 24,
    backgroundColor: "#fff",
    borderRadius: 16,
  },
  profileDesc: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileDescText: {
    fontSize: 14,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default ProfileStyles;
