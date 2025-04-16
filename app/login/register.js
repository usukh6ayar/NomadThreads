import { View, Text, TextInput, Button } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleRegister = () => {
    if (email && password && password === confirmPassword) {
      // Имэйл баталгаажуулалт руу шилжүүлнэ
      router.push({ pathname: "/login/verify", params: { email } });
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Бүртгүүлэх
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
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Нууц үгээ давт"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />
      <Button title="Бүртгүүлэх" onPress={handleRegister} />
    </View>
  );
}
