// src/store/asyncStorage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistStorage, StateStorage } from "zustand/middleware";

// Định nghĩa adapter cho AsyncStorage
const asyncStorage: PersistStorage<any> = {
  getItem: async (name: string) => {
    const item = await AsyncStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  },
  setItem: async (name: string, value: any) => {
    await AsyncStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: async (name: string) => {
    await AsyncStorage.removeItem(name);
  },
};

export default asyncStorage;
