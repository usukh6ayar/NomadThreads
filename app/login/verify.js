import { View, Text, TextInput, Button } from "react-native";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function VerifyScreen() {
  const { email } = useLocalSearchParams();
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleVerify = () => {
    if (code.length === 6) {
      router.replace("/login");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Имэйл баталгаажуулах
      </Text>
      <Text style={{ marginBottom: 20 }}>
        {email} хаяг руу баталгаажуулах код илгээлээ
      </Text>
      <TextInput
        placeholder="6 оронтой код"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        maxLength={6}
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />
      <Button title="Баталгаажуулах" onPress={handleVerify} />
    </View>
  );
}
