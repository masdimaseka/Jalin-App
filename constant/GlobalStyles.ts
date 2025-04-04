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
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
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
  tabBarPenjahit: {
    flexDirection: "row",
    gap: 8,
    marginVertical: 24,
  },
});

export default GlobalStyles;
