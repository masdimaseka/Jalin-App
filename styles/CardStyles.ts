import { StyleSheet } from "react-native";
import { colors } from "../constant/theme";

const cardStyles = StyleSheet.create({
  card: {
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    padding: 24,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 0.5,
    borderColor: "lightgray",
  },
  cardContentContainer: {
    padding: 24,
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
    borderColor: colors.primary,
  },

  card2: {
    gap: 16,
    padding: 24,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 0.5,
    borderColor: "lightgray",
  },
  cardTitle2: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardContentContainer2: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  cardContent2: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
});

export default cardStyles;
