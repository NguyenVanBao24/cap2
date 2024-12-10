import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { StyleSheet } from "react-native";

import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/Roboto-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider
        value={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: "#fff",
          },
        }}
      >
        <Stack
          screenOptions={{
            headerShown: false,
            presentation: "modal",
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="auth/" />
          <Stack.Screen name="search/" />
          <Stack.Screen name="(onboarding)/" />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});
