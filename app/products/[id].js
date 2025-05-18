import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

export default function ProductFullScreen() {
  const { id } = useLocalSearchParams();
  // TODO: Replace with real product fetch
  const product = {
    id,
    name: "Торгон дээл",
    price: 149000,
    image: require("../../assets/deel-cover.png"),
    description: "Figma дээрх Product Full дэлгэцийн мэдээлэл энд орно.",
  };

  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Image source={product.image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>₮{product.price.toLocaleString()}</Text>
        <Text style={styles.desc}>{product.description}</Text>
        {/* Figma дээрх бусад UI-г энд нэмнэ */}
        <TouchableOpacity style={styles.button} onPress={() => router.push("/shop/checkout")}>
          <Text style={styles.buttonText}>Сагслах</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  image: { width: "100%", height: 320, resizeMode: "cover" },
  info: { padding: 20 },
  name: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  price: { fontSize: 20, color: "#F2994A", fontWeight: "bold", marginBottom: 12 },
  desc: { fontSize: 16, color: "#444", marginBottom: 24 },
  button: {
    backgroundColor: "#F2994A",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});