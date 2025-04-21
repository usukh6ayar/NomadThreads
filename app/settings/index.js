// app/settings/index.js
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useAuth from "../../hooks/useAuth";
import { Stack } from "expo-router";

const menuItems = [
  {
    id: "profile",
    title: "Хувийн мэдээлэл",
    icon: "person-outline",
    onPress: () => {},
  },
  {
    id: "orders",
    title: "Захиалгын түүх",
    icon: "receipt-outline",
    onPress: () => {},
  },
  {
    id: "payment",
    title: "Төлбөрийн мэдээлэл",
    icon: "card-outline",
    onPress: () => {},
  },
  {
    id: "address",
    title: "Хүргэлтийн хаяг",
    icon: "location-outline",
    onPress: () => {},
  },
  {
    id: "notifications",
    title: "Мэдэгдлийн тохиргоо",
    icon: "notifications-outline",
    onPress: () => {},
  },
  {
    id: "logout",
    title: "Гарах",
    icon: "log-out-outline",
    onPress: () => {},
  },
];

export default function Settings() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Тохиргоо</Text>
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.profileSection}>
            <View style={styles.profileImageWrapper}>
              <Image
                source={require("../../assets/profile.png")}
                style={styles.profileImage}
                resizeMode="cover"
              />
              <TouchableOpacity style={styles.editButton}>
                <Ionicons name="pencil" size={16} color="white" />
              </TouchableOpacity>
            </View>
            <Text style={styles.profileName}>Usukhbayar</Text>
            <Text style={styles.profileUsername}>@usukh6ayar</Text>
          </View>

          <View style={styles.menuSection}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={item.onPress}
              >
                <View style={styles.menuItemContent}>
                  <Ionicons name={item.icon} size={24} color="#333" />
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#ccc" />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View style={styles.tabBar}>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => router.push("/shop")}
          >
            <Ionicons name="home-outline" size={24} color="#999" />
            <Text style={styles.tabText}>Нүүр</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => router.push("/brands")}
          >
            <Ionicons name="storefront-outline" size={24} color="#999" />
            <Text style={styles.tabText}>Дэлгүүр</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/categories")}
            style={styles.tabItem}
          >
            <Ionicons name="grid-outline" size={24} color="#999" />
            <Text style={styles.tabText}>Ангилал</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tabItem, styles.activeTab]}>
            <Ionicons name="person" size={24} color="#F2994A" />
            <Text style={styles.activeTabText}>Профайл</Text>
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
  scrollView: {
    flex: 1,
  },
  profileSection: {
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  profileImageContainer: {
    position: "relative",
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    backgroundColor: "#f0f0f0",
    overflow: "hidden",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  profileUsername: {
    fontSize: 14,
    color: "#666",
  },
  menuSection: {
    padding: 15,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 15,
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
  profileImageWrapper: {
    position: "relative",
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    backgroundColor: "#f0f0f0",
  },

  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },

  editButton: {
    position: "absolute",
    bottom: -5,
    right: -5,
    backgroundColor: "#2B78E4",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
});
