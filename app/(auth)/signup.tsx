import { useRouter } from "expo-router";
import { TouchableOpacity, Text, TextInput, View, Dimensions, StyleSheet, ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";
import { Colors } from "@/constant/Colors";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [noHp, setNoHp] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const handleSignUp = async () => {
    if (!email || !password || !username || !noHp) {
      alert('Peringatan: Semua field harus diisi');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update displayName di Firebase Auth
      await updateProfile(user, { displayName: username });

      // Simpan info tambahan ke Firestore
      await setDoc(doc(FIREBASE_DB, "users", user.uid), {
        uid: user.uid,
        email,
        username,
        noHp,
        createdAt: new Date(),
      });

      // Kirim email verifikasi
      await sendEmailVerification(user);

      console.log("User registered:", user);
      alert("Sukses! Akun berhasil dibuat. Silakan cek email untuk verifikasi.");

      // Redirect ke halaman login
      router.push("/(auth)/login");
    } catch (error: any) {
      console.error("Error registering:", error);
      alert("Gagal daftar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Nomor HP"
          value={noHp}
          onChangeText={setNoHp}
          keyboardType="phone-pad"
        />

        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.signupText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.loginText}>
          Already have an account?{" "}
          <Text style={styles.loginLink} onPress={() => router.push("/(auth)/login")}>
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    marginTop: 200,
    marginBottom: 40,
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
  loginText: {
    fontSize: 14,
    color: "#444",
    marginTop: 10,
    textAlign: "center",
  },
  loginLink: {
    color: Colors.primary,
    fontWeight: "bold",
  },
});
