// app/brands/index.js
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";

// Брэндийн жагсаалт
const brands = [
  { id: "borgolj", name: "Бөргөлжин", short: "Үндэсний хувцас үйлдвэрлэгч" },
  { id: "zaya", name: "Заяа", short: "Гоёл чимэглэл" },
  { id: "munkhjin", name: "Мөнхжин", short: "Монгол гутал" },
  { id: "uyanga", name: "Уянга", short: "Үндэсний дээл" },
  { id: "nomad", name: "Номад", short: "Монгол гэр ба эдлэл" },
  { id: "gobi", name: "Говь", short: "Ноолуур эдлэл" },
];

export default function Brands() {
  const router = useRouter();

  const renderBrandItem = ({ item }) => (
    <TouchableOpacity
      style={styles.brandCard}
      onPress={() => router.push(`/brands/${item.id}`)}
    >
      <View style={styles.brandInfo}>
        <Text style={styles.brandName}>{item.name}</Text>
        <Text style={styles.brandDescription}>{item.short}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Брэндүүд</Text>
        </View>

        <FlatList
          data={brands}
          renderItem={renderBrandItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.brandList}
        />

        <View style={styles.tabBar}>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => router.push("/shop")}
          >
            <Ionicons name="home-outline" size={24} color="#999" />
            <Text style={styles.tabText}>Нүүр</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tabItem, styles.activeTab]}>
            <Ionicons name="shop" size={24} color="#F2994A" />
            <Text style={styles.activeTabText}>Дэлгүүр</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => router.push("/categories")}
          >
            <Ionicons name="grid-outline" size={24} color="#999" />
            <Text style={styles.tabText}>Ангилал</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => router.push("/settings")}
          >
            <Ionicons name="person-outline" size={24} color="#999" />
            <Text style={styles.tabText}>Профайл</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
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
  brandList: {
    padding: 15,
  },
  brandCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  brandInfo: {
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
