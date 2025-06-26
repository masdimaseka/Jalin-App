import { StyleSheet } from "react-native";
import { colors } from "../constant/theme";

export const textStyles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  title2: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  titlePrimary: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: colors.primary,
  },
});
