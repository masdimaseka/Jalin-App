import { useRouter } from "expo-router";
import {
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useState } from "react";
import { auth, db } from "@/config/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { containerStyles } from "@/styles/ContainerStyles";
import { textStyles } from "@/styles/TextStyles";
import { inputStyles } from "@/styles/InputStyles";
import { buttonStyles } from "@/styles/ButtonStyles";
import { colors } from "@/constant/theme";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleSignUp = async () => {
    if (!email || !password || !username) {
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
        role: "user",
        createdAt: new Date().toISOString(),
      });

      await sendEmailVerification(user);

      alert(
        "Akun berhasil dibuat! Silakan verifikasi melalui email & lengkapi profile."
      );
      router.push("/(auth)/create-profile");
    } catch (error: any) {
      console.error("Error registering:", error);
      alert("Gagal daftar: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={containerStyles.container}>
      <View style={containerStyles.formContainer}>
        <Text style={textStyles.title}>Sign Up</Text>
        <TextInput
          style={inputStyles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={inputStyles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={inputStyles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Pressable
          style={[buttonStyles.btnPrimary, buttonStyles.btnFull]}
          onPress={handleSignUp}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={buttonStyles.btnPrimaryText}>Daftar</Text>
          )}
        </Pressable>

        <Text>
          Sudah punya akun?{" "}
          <Text
            onPress={() => router.push("/(auth)/login")}
            style={{ color: colors.primary, fontWeight: "bold" }}
          >
            Log In
          </Text>
        </Text>
      </View>
    </View>
  );
}
