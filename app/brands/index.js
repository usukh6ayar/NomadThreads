import { View, Text, FlatList, Pressable } from "react-native";
import { useRouter } from "expo-router";

const brands = [
  { id: "borgolj", name: "Бөргөлжин", short: "Үндэсний хувцас үйлдвэрлэгч" },
  { id: "zaya", name: "Заяа", short: "Гоёл чимэглэл" },
];

export default function BrandListScreen() {
  const router = useRouter();

  return (
    <FlatList
      data={brands}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => router.push(`/brands/${item.id}`)}
          style={{ padding: 20, borderBottomWidth: 1 }}
        >
          <Text style={{ fontSize: 18 }}>{item.name}</Text>
          <Text style={{ color: "gray" }}>{item.short}</Text>
        </Pressable>
      )}
    />
  );
}
