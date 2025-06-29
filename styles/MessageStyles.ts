import { colors } from "@/constant/theme";
import { StyleSheet } from "react-native";

export const messageStyles = StyleSheet.create({
  messageContainer: {
    flexDirection: "row",
    marginVertical: 4,
  },
  myMessageContainer: {
    justifyContent: "flex-end",
  },
  theirMessageContainer: {
    justifyContent: "flex-start",
  },
  messageBubble: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  myMessageBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 0,
  },
  theirMessageBubble: {
    backgroundColor: "#e5e5e5",
    borderBottomLeftRadius: 0,
  },
  myMessageText: {
    color: "#fff",
    fontSize: 16,
  },
  theirMessageText: {
    color: "#000",
    fontSize: 16,
  },
});
