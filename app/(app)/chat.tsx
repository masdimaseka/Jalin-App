import { View, ActivityIndicator, Pressable, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { containerStyles } from "@/styles/ContainerStyles";
import { colors } from "@/constant/theme";
import ChatRoomHeader from "@/components/ChatRoomHeader";
import MessageList from "@/components/MessageList";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useUserData } from "@/hooks/useUserData";

export default function ChatToUser() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");

  const { userData, loadingUserData } = useUserData();

  const [chatPartner, setChatPartner] = useState<any>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const docRef = doc(db, "jahitan", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          console.warn("Dokumen tidak ditemukan");
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  useEffect(() => {
    if (data && userData) {
      if (userData.uid === data.dataUser?.uid) {
        setChatPartner(data.dataPenjahit);
      } else {
        setChatPartner(data.dataUser);
      }
    }
  }, [data, userData]);

  useEffect(() => {
    if (!id) return;
    const messagesRef = collection(db, "jahitan", id, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allMessages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(allMessages);
    });

    return () => unsubscribe();
  }, [id]);

  const handleSend = async () => {
    if (text.trim() === "") return;
    try {
      const messagesRef = collection(db, "jahitan", id, "messages");
      await addDoc(messagesRef, {
        text: text.trim(),
        senderId: userData?.uid,
        nama: userData?.nama || "",
        createdAt: serverTimestamp(),
      });
      setText("");
    } catch (error) {
      console.error("Gagal mengirim pesan: ", error);
    }
  };

  if (loading || loadingUserData) {
    return (
      <View style={containerStyles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[containerStyles.container, { padding: 0 }]}>
      <ChatRoomHeader user={chatPartner} />

      <View style={containerStyles.container}>
        <MessageList messages={messages} currentUserId={userData?.uid} />
      </View>
      <View
        style={{
          flexDirection: "row",
          padding: 12,
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderColor: "#eee",
        }}
      >
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Tulis pesan..."
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            paddingHorizontal: 16,
            paddingVertical: 10,
            marginRight: 8,
            fontSize: 16,
          }}
          multiline
        />
        <Pressable
          onPress={handleSend}
          style={{
            backgroundColor: colors.primary,
            width: 44,
            height: 44,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialCommunityIcons name="send" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  );
}
