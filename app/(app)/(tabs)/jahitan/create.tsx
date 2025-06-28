import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Platform,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { doc, setDoc } from "firebase/firestore";

import { db } from "@/config/firebase";
import { useUserData } from "@/hooks/useUserData";
import { uploadImageToCloudinary } from "@/service/cloudinaryService";
import { containerStyles } from "@/styles/ContainerStyles";
import { buttonStyles } from "@/styles/ButtonStyles";
import { inputStyles } from "@/styles/InputStyles";
import { textStyles } from "@/styles/TextStyles";
import { useGetLocation } from "@/hooks/useGetLocation";
import { usePickImage } from "@/hooks/usePickImage";
import { useGetDateAndTime } from "@/hooks/useGetDateAndTime";

export default function Create() {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { alamat, setAlamat } = useGetLocation();
  const { image, pickImage } = usePickImage();
  const { userData, loadingUserData } = useUserData();
  const router = useRouter();

  const {
    date: tenggat,
    time: jam,
    showDatePicker,
    showTimePicker,
    setShowDatePicker,
    setShowTimePicker,
    onDateChange: handleDateChange,
    onTimeChange: handleTimeChange,
  } = useGetDateAndTime();

  const handleSubmit = async () => {
    if (!judul || !deskripsi || !tenggat || !jam || !alamat) {
      alert("Peringatan: Semua field harus diisi");
      return;
    }

    const deadline = `${tenggat}T${jam}:00`;
    setIsSubmitting(true);

    try {
      let imageUrl = "";

      if (image) {
        imageUrl = await uploadImageToCloudinary(
          image,
          "jahitan",
          `gambar_${new Date().getTime()}`
        );
      }

      await setDoc(doc(db, "jahitan", new Date().getTime().toString()), {
        judul,
        deskripsi,
        deadline,
        alamat,
        status: "pending",
        gambar: imageUrl || null,
        dataUser: {
          uid: userData?.uid,
          nama: userData?.nama || "",
          email: userData?.email || "",
          noTelp: userData?.noTelp || "",
          alamat: userData?.alamat || "",
          profileImg: userData?.profileImg || null,
        },
        dataPenjahit: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      Alert.alert("Berhasil", "Jahitan telah berhasil diunggah");
      router.back();
    } catch (error: any) {
      console.error("Error creating post:", error);
      alert("Gagal daftar: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingUserData)
    return <ActivityIndicator style={{ marginTop: 40 }} size="large" />;

  return (
    <View style={containerStyles.container}>
      <ScrollView>
        <Text style={[textStyles.subTitle, { marginBottom: 20 }]}>
          Lengkapi form berikut
        </Text>

        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: "100%",
              height: 200,
              marginVertical: 10,
              borderRadius: 10,
            }}
            resizeMode="cover"
          />
        )}

        <Text style={{ marginBottom: 8 }}>Unggah gambar</Text>
        <Pressable style={buttonStyles.btnSecondary} onPress={pickImage}>
          <Text style={buttonStyles.btnSecondaryText}>
            {image ? "Ganti Gambar" : "Pilih Gambar"}
          </Text>
        </Pressable>

        <Text style={{ marginBottom: 8 }}>Judul pekerjaan</Text>
        <TextInput
          style={inputStyles.input}
          placeholder="Judul Pekerjaan"
          value={judul}
          onChangeText={setJudul}
        />

        <Text style={{ marginBottom: 8 }}>Deskripsi pekerjaan</Text>
        <TextInput
          multiline
          numberOfLines={4}
          style={inputStyles.multilineInput}
          placeholder="Deskripsi Pekerjaan"
          value={deskripsi}
          onChangeText={setDeskripsi}
        />

        <Text style={{ marginBottom: 8 }}>Tenggat Pengerjaan</Text>
        <Pressable
          onPress={() => setShowDatePicker(true)}
          style={inputStyles.input}
        >
          <Text
            style={{
              color: tenggat ? "#000" : "#aaa",
              fontSize: 16,
              marginTop: 12,
            }}
          >
            {tenggat ? tenggat : "Pilih tanggal"}
          </Text>
        </Pressable>
        {showDatePicker && (
          <DateTimePicker
            value={tenggat ? new Date(tenggat) : new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
            minimumDate={new Date()}
          />
        )}

        <Text style={{ marginBottom: 8 }}>Batas Waktu Pengerjaan</Text>
        <Pressable
          onPress={() => setShowTimePicker(true)}
          style={inputStyles.input}
        >
          <Text
            style={{
              color: jam ? "#000" : "#aaa",
              fontSize: 16,
              marginTop: 12,
            }}
          >
            {jam ? jam : "Pilih waktu"}
          </Text>
        </Pressable>
        {showTimePicker && (
          <DateTimePicker
            value={jam ? new Date(`1970-01-01T${jam}:00`) : new Date()}
            mode="time"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleTimeChange}
          />
        )}

        <Text style={{ marginBottom: 8 }}>Alamat pengambilan jahitan</Text>
        <TextInput
          style={inputStyles.input}
          placeholder="Alamat"
          value={alamat}
          onChangeText={setAlamat}
        />

        <Pressable style={buttonStyles.btnPrimary} onPress={handleSubmit}>
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={buttonStyles.btnPrimaryText}>Kirim</Text>
          )}
        </Pressable>
      </ScrollView>
    </View>
  );
}
