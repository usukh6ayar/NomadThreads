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

const addresses = [
  {
    id: "1",
    name: "Гэр",
    address: "БЗД, 4-р хороо, 34-р байр, 56 тоот",
    phone: "99112233",
    isDefault: true,
  },
  {
    id: "2",
    name: "Ажил",
    address: "СБД, 1-р хороо, Шангри-Ла Оффис, 505 тоот",
    phone: "99112233",
    isDefault: false,
  },
];

export default function AddressScreen() {
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState(
    addresses.find((addr) => addr.isDefault)?.id
  );

  const handleDeleteAddress = (id) => {
    Alert.alert("Хаяг устгах", "Та энэ хаягийг устгахдаа итгэлтэй байна уу?", [
      {
        text: "Үгүй",
        style: "cancel",
      },
      {
        text: "Тийм",
        style: "destructive",
        onPress: () => {
          // Delete address logic here
          console.log("Deleting address:", id);
        },
      },
    ]);
  };

  const renderAddress = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.addressCard,
        selectedAddress === item.id && styles.selectedAddress,
      ]}
      onPress={() => setSelectedAddress(item.id)}
    >
      <View style={styles.addressInfo}>
        <View style={styles.addressHeader}>
          <Text style={styles.addressName}>{item.name}</Text>
          {item.isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultText}>Үндсэн</Text>
            </View>
          )}
        </View>
        <Text style={styles.addressText}>{item.address}</Text>
        <Text style={styles.phoneText}>{item.phone}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push(`/settings/address/edit/${item.id}`)}
        >
          <Ionicons name="pencil" size={20} color="#F2994A" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteAddress(item.id)}
        >
          <Ionicons name="trash-outline" size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Хүргэлтийн хаяг</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={addresses}
        renderItem={renderAddress}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.addressList}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/settings/address/add")}
      >
        <Ionicons name="add" size={24} color="white" />
        <Text style={styles.addButtonText}>Шинэ хаяг нэмэх</Text>
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
  addressList: {
    padding: 15,
  },
  addressCard: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  selectedAddress: {
    borderColor: "#F2994A",
    borderWidth: 2,
  },
  addressInfo: {
    flex: 1,
  },
  addressHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  addressName: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  defaultBadge: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultText: {
    color: "#4CAF50",
    fontSize: 12,
    fontWeight: "500",
  },
  addressText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  phoneText: {
    fontSize: 14,
    color: "#666",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  editButton: {
    padding: 8,
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
