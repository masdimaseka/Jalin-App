import { useRouter } from "expo-router";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { db } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { Colors } from "@/constant/theme";
import { AuthContext } from "@/context/AuthContext";
import * as Location from "expo-location";

export default function CreateProfile() {
  const router = useRouter();
  const { user, loading } = useContext(AuthContext);

  const [nama, setNama] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [alamat, setAlamat] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Izin lokasi ditolak");
        return;
      }

      const lokasiSaatIni = await Location.getCurrentPositionAsync({});
      const geo = await Location.reverseGeocodeAsync({
        latitude: lokasiSaatIni.coords.latitude,
        longitude: lokasiSaatIni.coords.longitude,
      });

      if (geo.length > 0) {
        const g = geo[0];
        const alamatLengkap = `${g.street || g.name || ""}, ${
          g.city || g.subregion || ""
        }`;
        setAlamat(alamatLengkap);
      }
    })();
  }, []);

  const handleSignUp = async () => {
    if (!nama || !noTelp || !alamat) {
      alert("Peringatan: Semua field harus diisi termasuk foto");
      return;
    }

    setIsSubmitting(true);
    try {
      if (!user?.uid) {
        alert("User belum login");
        return;
      }

      await updateDoc(doc(db, "users", user.uid), {
        nama,
        noTelp,
        lokasi: alamat,
        createdAt: new Date().toISOString(),
      });

      alert("Akun berhasil dibuat!");
      router.push("/(auth)/login");
    } catch (error: any) {
      console.error("Error registering:", error);
      alert("Gagal daftar: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Profile</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nama"
          value={nama}
          onChangeText={setNama}
        />
        <TextInput
          style={styles.input}
          placeholder="No Telepon"
          value={noTelp}
          onChangeText={setNoTelp}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Alamat Lokasi"
          value={alamat}
          onChangeText={setAlamat}
        />

        <Pressable style={styles.signupButton} onPress={handleSignUp}>
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.signupText}>Simpan</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    marginTop: 80,
    marginBottom: 20,
    textAlign: "center",
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  signupButton: {
    width: "100%",
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  signupText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: "#eee",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
});
