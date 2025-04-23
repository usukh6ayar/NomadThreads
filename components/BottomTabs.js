import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function BottomTabs() {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    {
      name: "Нүүр",
      path: "/shop",
      icon: "home-outline",
      activeIcon: "home",
    },
    {
      name: "Дэлгүүр",
      path: "/brands",
      icon: "storefront-outline",
      activeIcon: "storefront",
    },
    {
      name: "Ангилал",
      path: "/categories",
      icon: "grid-outline",
      activeIcon: "grid",
    },
    {
      name: "Профайл",
      path: "/settings",
      icon: "person-outline",
      activeIcon: "person",
    },
  ];

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.path;
        return (
          <TouchableOpacity
            key={tab.path}
            style={[styles.tabItem, isActive && styles.activeTab]}
            onPress={() => router.push(tab.path)}
          >
            <Ionicons
              name={isActive ? tab.activeIcon : tab.icon}
              size={24}
              color={isActive ? "#F2994A" : "#999"}
            />
            <Text style={isActive ? styles.activeTabText : styles.tabText}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  tabItem: {
    alignItems: "center",
    flex: 1,
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
