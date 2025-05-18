// app/_layout.js
import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { FavoritesProvider } from "../context/FavoritesContext";

export default function Layout() {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "none",
            }}
          />
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}
