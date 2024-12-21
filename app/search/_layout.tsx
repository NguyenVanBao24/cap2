import React from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAuthStore } from "@/store/authStore";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: "modal",
        animation: "slide_from_bottom",
      }}
    >
      <Stack.Screen name="food/[id]" />
      <Stack.Screen name="ingredient/[id]" />
      <Stack.Screen name="meal/[id]" />
      <Stack.Screen name="FilterSearch" />
      <Stack.Screen name="SeachBottom" />
      <Stack.Screen name="Favorites" />
      <Stack.Screen name="EditPlan" />
      <Stack.Screen name="NavigateAll" />
    </Stack>
  );
};

export default Layout;
