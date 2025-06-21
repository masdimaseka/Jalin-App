import { useRouter, Redirect } from "expo-router";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useState, useContext } from "react";
import { auth, db } from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Colors } from "@/constant/theme";
import { AuthContext } from "@/context/AuthContext";

export default function Signup() {
  const router = useRouter();
  const { user, loading } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [noHp, setNoHp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (loading) return null;

  const handleSignUp = async () => {
    if (!email || !password || !username || !noHp) {
      alert("Peringatan: Semua field harus diisi");
      return;
    }

    setIsSubmitting(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: username });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email,
        username,
        noHp,
        createdAt: new Date().toISOString(),
      });

      await sendEmailVerification(user);

      alert("Akun berhasil dibuat! Silakan verifikasi melalui email.");
      router.push("/(auth)/login");
    } catch (error: any) {
      console.error("Error registering:", error);
      alert("Gagal daftar: " + error.message);
    } finally {
      setIsSubmitting(false);
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
          autoCapitalize="none"
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
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.signupText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.loginText}>
          Already have an account?{" "}
          <Text
            style={styles.loginLink}
            onPress={() => router.push("/(auth)/login")}
          >
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
