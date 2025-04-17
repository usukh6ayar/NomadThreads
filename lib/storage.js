// lib/storage.js
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    console.error("Error saving data: ", error);
    return false;
  }
};

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Error getting data: ", error);
    return null;
  }
};

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error("Error removing data: ", error);
    return false;
  }
};

export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error("Error clearing all data: ", error);
    return false;
  }
};
