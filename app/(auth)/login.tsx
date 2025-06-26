import { useRouter, Redirect } from "expo-router";
import { useContext, useState } from "react";
import { auth } from "@/config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Pressable,
  Image,
} from "react-native";
import { AuthContext } from "@/context/AuthContext";
import { containerStyles } from "@/styles/ContainerStyles";
import { textStyles } from "@/styles/TextStyles";
import { inputStyles } from "@/styles/InputStyles";
import { buttonStyles } from "@/styles/ButtonStyles";
import { colors } from "@/constant/theme";
import Loading from "@/components/Loading";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const { user, loading } = useContext(AuthContext);

  const router = useRouter();

  if (user?.emailVerified) {
    return <Redirect href="/(app)/(tabs)" />;
  }

  const handleLogin = async () => {
    if (!email || !password) {
      alert(`Lengkapi email dan password`);
      return;
    }

    setLoginLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        alert(
          "Email belum diverifikasi. Silakan cek email dan klik link verifikasi."
        );
        await auth.signOut();
        return;
      }

      console.log("Login sukses:", user);
      router.replace("/(app)/(tabs)");
    } catch (error: any) {
      console.error("Login gagal:", error);
      alert("Gagal login: " + error.message);
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <View style={containerStyles.container}>
      <View style={containerStyles.formContainer}>
        <Text style={[textStyles.title]}>Log In</Text>
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
          onPress={handleLogin}
        >
          <Text style={buttonStyles.btnPrimaryText}>
            {loginLoading ? <ActivityIndicator color="#fff" /> : "Masuk"}
          </Text>
        </Pressable>

        <Text>
          Belum punya akun?{" "}
          <Text
            onPress={() => router.push("/(auth)/signup")}
            style={{ color: colors.primary, fontWeight: "bold" }}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}
