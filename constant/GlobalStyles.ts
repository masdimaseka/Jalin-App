import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

const GlobalStyles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: Colors.bg,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  titlePrimary: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: Colors.primary,
  },
  btnPrimary: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    flexDirection: "row",
    gap: 8,
  },
  btnPrimaryText: {
    color: "white",
    fontWeight: "bold",
  },
  btnSecondary: {
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    flexDirection: "row",
    gap: 8,
  },
  btnSecondaryText: {
    color: Colors.primary,
  },
});

export default GlobalStyles;
