// app/shop/checkout.js
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";

// Mock data for the cart
const CART_ITEMS = [
  {
    id: "1",
    name: "Торгон дээл",
    price: 149000,
    quantity: 1,
    size: "M",
    color: "#69445c",
  },
];

export default function CheckoutScreen() {
  const router = useRouter();
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const subtotal = CART_ITEMS.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee = 5000;
  const total = subtotal + deliveryFee;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Төлбөр хийх</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Захиалгын мэдээлэл</Text>
          {CART_ITEMS.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <View style={styles.productImageContainer}>
                <Image
                  source={require("../../assets/deel-cover.png")}
                  style={styles.productImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <View style={styles.productOptions}>
                  <View style={styles.optionChip}>
                    <Text style={styles.optionText}>Хэмжээ: {item.size}</Text>
                  </View>
                  <View style={styles.optionChip}>
                    <View
                      style={[styles.colorDot, { backgroundColor: item.color }]}
                    />
                    <Text style={styles.optionText}>Өнгө</Text>
                  </View>
                </View>
                <View style={styles.priceRow}>
                  <Text style={styles.productPrice}>
                    ₮{item.price.toLocaleString()}
                  </Text>
                  <View style={styles.quantityBadge}>
                    <Text style={styles.quantityText}>{item.quantity}x</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Хүргэлтийн хаяг</Text>
          <TextInput
            style={styles.addressInput}
            placeholder="Хаягаа оруулна уу"
            value={deliveryAddress}
            onChangeText={setDeliveryAddress}
            multiline
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Төлбөрийн арга</Text>
          <View style={styles.paymentMethods}>
            <TouchableOpacity
              style={[
                styles.paymentMethod,
                paymentMethod === "card" && styles.selectedPayment,
              ]}
              onPress={() => setPaymentMethod("card")}
            >
              <Feather
                name="credit-card"
                size={24}
                color={paymentMethod === "card" ? "#F2994A" : "#666"}
              />
              <Text
                style={[
                  styles.paymentText,
                  paymentMethod === "card" && styles.selectedPaymentText,
                ]}
              >
                Карт
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.paymentMethod,
                paymentMethod === "qr" && styles.selectedPayment,
              ]}
              onPress={() => setPaymentMethod("qr")}
            >
              <Feather
                name="smartphone"
                size={24}
                color={paymentMethod === "qr" ? "#F2994A" : "#666"}
              />
              <Text
                style={[
                  styles.paymentText,
                  paymentMethod === "qr" && styles.selectedPaymentText,
                ]}
              >
                QR код
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.paymentMethod,
                paymentMethod === "cash" && styles.selectedPayment,
              ]}
              onPress={() => setPaymentMethod("cash")}
            >
              <Feather
                name="dollar-sign"
                size={24}
                color={paymentMethod === "cash" ? "#F2994A" : "#666"}
              />
              <Text
                style={[
                  styles.paymentText,
                  paymentMethod === "cash" && styles.selectedPaymentText,
                ]}
              >
                Бэлнээр
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Захиалгын дүн</Text>
          <View style={styles.priceBreakdown}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Нийт дүн</Text>
              <Text style={styles.priceValue}>
                ₮{subtotal.toLocaleString()}
              </Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Хүргэлтийн төлбөр</Text>
              <Text style={styles.priceValue}>
                ₮{deliveryFee.toLocaleString()}
              </Text>
            </View>
            <View style={[styles.priceRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Нийт төлөх</Text>
              <Text style={styles.totalValue}>₮{total.toLocaleString()}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => {
            // Here you would process the order
            router.replace("/shop/confirmation");
          }}
        >
          <Text style={styles.confirmButtonText}>Захиалга баталгаажуулах</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
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
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  cartItem: {
    flexDirection: "row",
    marginBottom: 15,
  },
  productImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
    marginRight: 15,
  },
  productImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  productOptions: {
    flexDirection: "row",
    marginBottom: 5,
  },
  optionChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  optionText: {
    fontSize: 12,
    color: "#666",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F2994A",
  },
  quantityBadge: {
    backgroundColor: "#F2994A",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  quantityText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 12,
  },
  addressInput: {
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 8,
    padding: 12,
    height: 80,
    textAlignVertical: "top",
  },
  paymentMethods: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  paymentMethod: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    marginHorizontal: 5,
  },
  selectedPayment: {
    borderColor: "#F2994A",
    backgroundColor: "rgba(242, 153, 74, 0.1)",
  },
  paymentText: {
    marginTop: 8,
    color: "#666",
  },
  selectedPaymentText: {
    color: "#F2994A",
    fontWeight: "bold",
  },
  priceBreakdown: {
    marginTop: 10,
  },
});
