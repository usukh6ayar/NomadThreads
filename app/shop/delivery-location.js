import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import MapView, { Marker } from "react-native-maps";

export default function DeliveryLocationScreen() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [marker, setMarker] = useState({
    latitude: 47.9188731, // Улаанбаатар default
    longitude: 106.917701,
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Хүргэлтийн байршлаа сонгоно уу</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: marker.latitude,
          longitude: marker.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={(e) => {
          setMarker(e.nativeEvent.coordinate);
        }}
      >
        <Marker coordinate={marker} />
      </MapView>
      <TextInput
        style={styles.input}
        placeholder="Дэлгэрэнгүй хаяг (жишээ: байр, орц, давхар...)"
        value={location}
        onChangeText={setLocation}
      />
      <TouchableOpacity
        style={[styles.button, !location && { backgroundColor: "#ccc" }]}
        disabled={!location}
        onPress={() => {
          // Байршил болон хаягийг илгээж болно
          router.replace("/shop/confirmation");
        }}
      >
        <Text style={styles.buttonText}>Баталгаажуулах</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  title: { fontSize: 20, fontWeight: "bold", margin: 24, textAlign: "center" },
  map: {
    width: "90%",
    height: 250,
    alignSelf: "center",
    borderRadius: 12,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 14,
    marginHorizontal: 24,
    marginBottom: 24,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#F2994A",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 24,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});