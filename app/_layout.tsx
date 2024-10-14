import React from "react";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useAuth from "@/hooks/useAuth";
const Layout = () => {
  const { user, token, isLoading, error, login, logout } = useAuth();
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="auth/Login" options={{ headerShown: false }} />
        <Stack.Screen name="auth/Register" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false, headerBackTitle: "Go Back" }} />
      </Stack>
    </SafeAreaProvider>
  );
};

export default Layout;
