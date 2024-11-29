import React from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAuthStore } from "@/store/authStore";

const Layout = () => {
  const { logout } = useAuthStore();

  return (
    <SafeAreaProvider>
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
        <Stack.Screen name="Camera" />
        <Stack.Screen name="SeachBottom" />
        <Stack.Screen name="Favorites" />
      </Stack>
    </SafeAreaProvider>
  );
};

export default Layout;
