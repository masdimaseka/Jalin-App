import { StyleSheet } from "react-native";
import { Colors } from "../constant/Colors";

const CardStyles = StyleSheet.create({
  card: {
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    padding: 24,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
  },
  cardContentContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardCategory: {
    borderWidth: 1,
    borderRadius: 100,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderColor: Colors.primary,
  },
});

export default CardStyles;
