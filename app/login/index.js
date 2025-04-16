import { View, Text, TextInput, Button, Pressable } from "react-native";
import { useState } from "react";
import { saveData } from "../../lib/storage";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (email && password) {
      await saveData("user", { email });
      router.push("/brands");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Нэвтрэх
      </Text>
      <TextInput
        placeholder="И-мэйл"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Нууц үг"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />
      <Button title="Нэвтрэх" onPress={handleLogin} />
      <Pressable
        onPress={() => router.push("/login/register")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ color: "blue" }}>Бүртгүүлэх</Text>
      </Pressable>
    </View>
  );
}
