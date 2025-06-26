import { StyleSheet } from "react-native";
import { colors } from "../constant/theme";

export const inputStyles = StyleSheet.create({
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  multilineInput: {
    width: "100%",
    height: 100,
    backgroundColor: "#fff",
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    textAlignVertical: "top",
    paddingTop: 10,
  },
});
