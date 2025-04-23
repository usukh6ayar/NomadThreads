import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function NotificationsScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    orderUpdates: true,
    promotions: true,
    newArrivals: false,
    priceDrops: true,
    newsletter: false,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Мэдэгдлийн тохиргоо</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Захиалга</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Захиалгын шинэчлэлт</Text>
              <Text style={styles.settingDescription}>
                Захиалгын төлөв өөрчлөгдөх үед мэдэгдэл авах
              </Text>
            </View>
            <Switch
              value={settings.orderUpdates}
              onValueChange={() => toggleSetting("orderUpdates")}
              trackColor={{ false: "#767577", true: "#F2994A" }}
              thumbColor={settings.orderUpdates ? "#fff" : "#f4f3f4"}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Маркетинг</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Урамшуулал</Text>
              <Text style={styles.settingDescription}>
                Хямдрал, урамшууллын мэдээлэл авах
              </Text>
            </View>
            <Switch
              value={settings.promotions}
              onValueChange={() => toggleSetting("promotions")}
              trackColor={{ false: "#767577", true: "#F2994A" }}
              thumbColor={settings.promotions ? "#fff" : "#f4f3f4"}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Шинэ бүтээгдэхүүн</Text>
              <Text style={styles.settingDescription}>
                Шинэ бүтээгдэхүүний мэдээлэл авах
              </Text>
            </View>
            <Switch
              value={settings.newArrivals}
              onValueChange={() => toggleSetting("newArrivals")}
              trackColor={{ false: "#767577", true: "#F2994A" }}
              thumbColor={settings.newArrivals ? "#fff" : "#f4f3f4"}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Үнийн өөрчлөлт</Text>
              <Text style={styles.settingDescription}>
                Таны сонирхсон бүтээгдэхүүний үнэ буурахад мэдэгдэх
              </Text>
            </View>
            <Switch
              value={settings.priceDrops}
              onValueChange={() => toggleSetting("priceDrops")}
              trackColor={{ false: "#767577", true: "#F2994A" }}
              thumbColor={settings.priceDrops ? "#fff" : "#f4f3f4"}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Бусад</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Имэйл мэдээ</Text>
              <Text style={styles.settingDescription}>
                7 хоног тутмын шинэ мэдээ хүлээн авах
              </Text>
            </View>
            <Switch
              value={settings.newsletter}
              onValueChange={() => toggleSetting("newsletter")}
              trackColor={{ false: "#767577", true: "#F2994A" }}
              thumbColor={settings.newsletter ? "#fff" : "#f4f3f4"}
            />
          </View>
        </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: "#666",
  },
});
