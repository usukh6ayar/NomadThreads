import AsyncStorage from "@react-native-async-storage/async-storage";

const CACHE_EXPIRY = 1000 * 60 * 60; // 1 hour

export const cache = {
  async set(key, value, expiryTime = CACHE_EXPIRY) {
    const item = {
      value,
      timestamp: Date.now(),
      expiryTime,
    };
    try {
      await AsyncStorage.setItem(key, JSON.stringify(item));
      return true;
    } catch (error) {
      console.error("Cache set error:", error);
      return false;
    }
  },

  async get(key) {
    try {
      const item = await AsyncStorage.getItem(key);
      if (!item) return null;

      const { value, timestamp, expiryTime } = JSON.parse(item);
      const isExpired = Date.now() - timestamp > expiryTime;

      if (isExpired) {
        await AsyncStorage.removeItem(key);
        return null;
      }

      return value;
    } catch (error) {
      console.error("Cache get error:", error);
      return null;
    }
  },

  async remove(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error("Cache remove error:", error);
      return false;
    }
  },
};
