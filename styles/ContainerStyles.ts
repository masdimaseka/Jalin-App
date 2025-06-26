import { StyleSheet } from "react-native";
import { colors } from "../constant/theme";

export const containerStyles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: colors.bg,
  },
  formContainer: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
