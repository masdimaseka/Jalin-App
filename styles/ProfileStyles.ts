import { StyleSheet } from "react-native";
import { colors } from "../constant/theme";

const profileStyles = StyleSheet.create({
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

export default profileStyles;
