// app/brands/index.js
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const brands = [
  { id: "borgolj", name: "Бөргөлжин", short: "Үндэсний хувцас үйлдвэрлэгч" },
  { id: "zaya", name: "Заяа", short: "Гоёл чимэглэл" },
  { id: "munkhjin", name: "Мөнхжин", short: "Монгол гутал" },
  { id: "uyanga", name: "Уянга", short: "Үндэсний дээл" },
  { id: "nomad", name: "Номад", short: "Монгол гэр ба эдлэл" },
  { id: "gobi", name: "Говь", short: "Ноолуур эдлэл" },
];

export default function BrandListScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Брэндүүд</Text>
      </View>

      <FlatList
        data={brands}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/brands/${item.id}`)}
            style={styles.brandItem}
          >
            <View style={styles.brandContent}>
              <Text style={styles.brandName}>{item.name}</Text>
              <Text style={styles.brandDescription}>{item.short}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
          </Pressable>
        )}
      />

      <View style={styles.tabBar}>
        <Pressable style={styles.tabItem} onPress={() => router.push("/shop")}>
          <Ionicons name="home-outline" size={24} color="#999" />
          <Text style={styles.tabText}>Нүүр</Text>
        </Pressable>
        <Pressable style={[styles.tabItem, styles.activeTab]}>
          <Ionicons name="shopping-bag" size={24} color="#F2994A" />
          <Text style={styles.activeTabText}>Дэлгүүр</Text>
        </Pressable>
        <Pressable style={styles.tabItem}>
          <Ionicons name="grid-outline" size={24} color="#999" />
          <Text style={styles.tabText}>Ангилал</Text>
        </Pressable>
        <Pressable
          style={styles.tabItem}
          onPress={() => router.push("/settings")}
        >
          <Ionicons name="person-outline" size={24} color="#999" />
          <Text style={styles.tabText}>Профайл</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  brandItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  brandContent: {
    flex: 1,
  },
  brandName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  brandDescription: {
    fontSize: 14,
    color: "#666",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    paddingVertical: 10,
  },
  tabItem: {
    alignItems: "center",
  },
  activeTab: {
    borderTopColor: "#F2994A",
  },
  tabText: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  activeTabText: {
    fontSize: 12,
    color: "#F2994A",
    fontWeight: "bold",
    marginTop: 2,
  },
});
