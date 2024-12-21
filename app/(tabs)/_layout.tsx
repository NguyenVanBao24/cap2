import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Text, Image } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("@/assets/images/tabsIconNav/home.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? Colors.primary : Colors.gray,
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? Colors.primary : Colors.gray, fontSize: 12 }}>
              Home
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="Diary"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("@/assets/images/tabsIconNav/dailytracking.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? Colors.primary : Colors.gray,
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? Colors.primary : Colors.gray, fontSize: 12 }}>
              Diary
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="DashBoard"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("@/assets/images/tabsIconNav/calorie.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? Colors.primary : Colors.gray,
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? Colors.primary : Colors.gray, fontSize: 12 }}>
              Daily Tracking
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("@/assets/images/tabsIconNav/profile.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? Colors.primary : Colors.gray,
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? Colors.primary : Colors.gray, fontSize: 12 }}>
              Profile
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}
