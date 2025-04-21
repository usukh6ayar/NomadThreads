// app/login.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    if (!emailOrPhone || !password) {
      alert("И-мэйл/утас болон нууц үг оруулна уу.");
      return;
    }

    try {
      await AsyncStorage.setItem("user", JSON.stringify({ emailOrPhone }));
      router.replace("/shop");
    } catch (error) {
      console.error("Login error:", error);
      alert("Нэвтрэхэд алдаа гарлаа.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/deel-cover.png")}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.innerContainer}>
        <Text style={styles.title}>Тавтай морилно уу!</Text>

        <TextInput
          style={styles.input}
          placeholder="Email Хаяг / Утасны Дугаар"
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Нууц үг"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons
              name={passwordVisible ? "eye-off" : "eye"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Нууц үгээ мартсан уу?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <LinearGradient
            colors={["#FFC107", "#D32F2F"]}
            style={styles.gradientButton}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.loginText}>Нэвтрэх</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={styles.registerText}>Бүртгүүлэх</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>Эсвэл</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../../assets/google.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../../assets/facebook.png")}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  image: { width: "100%", height: 200 },
  innerContainer: { padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, marginTop: 30 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  passwordContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    marginBottom: 8,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
  },
  forgotBtn: { alignItems: "flex-end", marginBottom: 16 },
  forgotText: { color: "#007BFF", fontSize: 13 },
  loginButton: { marginBottom: 20 },
  gradientButton: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  loginText: {
    color: "#fff",
    fontFamily: "Inter",
    fontWeight: "semibold",
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  orText: {
    marginHorizontal: 10,
    color: "#888",
    fontSize: 14,
    fontFamily: "Inter",
    fontWeight: "semibold",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 20,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  socialIcon: {
    width: 48,
    height: 48,
  },
  registerText: {
    textAlign: "center",
    color: "#007BFF",
    fontSize: 15,
    marginBottom: 10,
    fontFamily: "Inter",
    fontWeight: "semibold",
  },
});
