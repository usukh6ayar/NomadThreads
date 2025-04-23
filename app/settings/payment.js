import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const paymentMethods = [
  {
    id: "1",
    type: "card",
    last4: "4242",
    brand: "Visa",
    expiry: "12/25",
  },
  {
    id: "2",
    type: "card",
    last4: "8888",
    brand: "Mastercard",
    expiry: "08/24",
  },
];

export default function PaymentScreen() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0]?.id);

  const handleDeleteCard = (id) => {
    Alert.alert("Карт устгах", "Та энэ картыг устгахдаа итгэлтэй байна уу?", [
      {
        text: "Үгүй",
        style: "cancel",
      },
      {
        text: "Тийм",
        style: "destructive",
        onPress: () => {
          // Delete card logic here
          console.log("Deleting card:", id);
        },
      },
    ]);
  };

  const renderPaymentMethod = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.paymentCard,
        selectedMethod === item.id && styles.selectedCard,
      ]}
      onPress={() => setSelectedMethod(item.id)}
    >
      <View style={styles.cardInfo}>
        <Ionicons
          name={item.brand.toLowerCase() === "visa" ? "card" : "card-outline"}
          size={24}
          color="#333"
        />
        <View style={styles.cardDetails}>
          <Text style={styles.cardNumber}>**** **** **** {item.last4}</Text>
          <Text style={styles.cardExpiry}>Хүчинтэй хугацаа: {item.expiry}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteCard(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color="#FF3B30" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Төлбөрийн мэдээлэл</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={paymentMethods}
        renderItem={renderPaymentMethod}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.paymentList}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/settings/payment/add")}
      >
        <Ionicons name="add" size={24} color="white" />
        <Text style={styles.addButtonText}>Карт нэмэх</Text>
      </TouchableOpacity>
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
  paymentList: {
    padding: 15,
  },
  paymentCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  selectedCard: {
    borderColor: "#F2994A",
    borderWidth: 2,
  },
  cardInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardDetails: {
    marginLeft: 15,
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  cardExpiry: {
    fontSize: 14,
    color: "#666",
  },
  deleteButton: {
    padding: 8,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2994A",
    margin: 15,
    padding: 15,
    borderRadius: 12,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
