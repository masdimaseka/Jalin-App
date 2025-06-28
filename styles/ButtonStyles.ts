import { StyleSheet } from "react-native";
import { colors } from "../constant/theme";

export const buttonStyles = StyleSheet.create({
  btnFull: {
    width: "100%",
  },
  btnPrimary: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
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
    backgroundColor: "white",
    borderColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    flexDirection: "row",
    gap: 8,
  },
  btnSecondaryText: {
    color: colors.primary,
  },
  btnTabContainer: {
    marginBottom: 20,
    flexDirection: "row",
    gap: 8,
  },
  btnTab: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  btnTabActive: {
    backgroundColor: colors.primary,
  },
  btnTabInactive: {
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: "transparent",
  },
  btnTabText: {
    fontWeight: "bold",
  },
  btnTabTextActive: {
    color: "white",
  },
  btnTabTextInactive: {
    color: colors.primary,
  },
  btnTabIconActive: {
    color: "white",
  },
  btnTabIconInactive: {
    color: colors.primary,
  },
  btnFloatBR: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: colors.primary,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignContent: "center",
    gap: 8,
    elevation: 4,
  },
  menuBtn: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    width: "48%",
    padding: 16,
  },
  menuBtnText: {
    color: "white",
    fontWeight: "bold",
  },
});
