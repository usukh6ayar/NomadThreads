import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Sample order data
const orders = [
  {
    id: "1",
    date: "2024-04-23",
    status: "completed",
    total: 149000,
    items: [
      {
        id: "1",
        name: "Торгон дээл",
        quantity: 1,
        price: 149000,
        image: require("../../assets/deel-cover.png"),
      },
    ],
  },
  // Add more orders as needed
];

export default function OrdersScreen() {
  const router = useRouter();

  const renderOrderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={() => router.push(`/settings/orders/${item.id}`)}
    >
      <View style={styles.orderHeader}>
        <Text style={styles.orderDate}>
          {new Date(item.date).toLocaleDateString("mn-MN")}
        </Text>
        <View
          style={[
            styles.statusBadge,
            item.status === "completed"
              ? styles.statusCompleted
              : styles.statusPending,
          ]}
        >
          <Text style={styles.statusText}>
            {item.status === "completed" ? "Хүргэгдсэн" : "Хүлээгдэж буй"}
          </Text>
        </View>
      </View>

      <FlatList
        data={item.items}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: orderItem }) => (
          <View style={styles.orderItem}>
            <Image source={orderItem.image} style={styles.productImage} />
            <Text style={styles.productName} numberOfLines={2}>
              {orderItem.name}
            </Text>
            <Text style={styles.quantity}>x{orderItem.quantity}</Text>
          </View>
        )}
        keyExtractor={(orderItem) => orderItem.id}
      />

      <View style={styles.orderFooter}>
        <Text style={styles.totalLabel}>Нийт дүн:</Text>
        <Text style={styles.totalAmount}>₮{item.total.toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Захиалгын түүх</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.ordersList}
      />
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
  ordersList: {
    padding: 15,
  },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  orderDate: {
    fontSize: 14,
    color: "#666",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusCompleted: {
    backgroundColor: "#E8F5E9",
  },
  statusPending: {
    backgroundColor: "#FFF3E0",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  orderItem: {
    width: 80,
    marginRight: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 5,
  },
  productName: {
    fontSize: 12,
    marginBottom: 2,
  },
  quantity: {
    fontSize: 12,
    color: "#666",
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
  },
  totalLabel: {
    fontSize: 14,
    color: "#666",
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F2994A",
  },
});
