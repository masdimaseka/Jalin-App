import { View, Text, FlatList, useWindowDimensions } from "react-native";
import React, { useRef, useEffect } from "react";
import { messageStyles } from "@/styles/MessageStyles";

interface Message {
  id: string;
  text: string;
  senderId: string;
  createdAt: any;
}

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

function formatTime(timestamp: any) {
  if (!timestamp?.toDate) return "";
  const date = timestamp.toDate();
  return `${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}

export default function MessageList({
  messages,
  currentUserId,
}: MessageListProps) {
  const flatListRef = useRef<FlatList>(null);
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const renderItem = ({ item }: { item: Message }) => {
    const isMyMessage = item.senderId === currentUserId;

    return (
      <View
        style={[
          messageStyles.messageContainer,
          isMyMessage
            ? messageStyles.myMessageContainer
            : messageStyles.theirMessageContainer,
        ]}
      >
        <View>
          <View
            style={[
              messageStyles.messageBubble,
              isMyMessage
                ? messageStyles.myMessageBubble
                : messageStyles.theirMessageBubble,
              { maxWidth: width * 0.75 },
            ]}
          >
            <Text
              style={
                isMyMessage
                  ? messageStyles.myMessageText
                  : messageStyles.theirMessageText
              }
            >
              {item.text}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 10,
              color: "#999",
              marginTop: 4,
              alignSelf: "flex-end",
            }}
          >
            {formatTime(item.createdAt)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={messages}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 12 }}
      showsVerticalScrollIndicator={false}
    />
  );
}
