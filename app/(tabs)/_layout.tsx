import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#000",
          borderTopColor: "#000",
          height: 60,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
        tabBarIconStyle: {
          marginBottom: 5,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("@/assets/images/home.png")}
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
        name="Daily Tracking"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("@/assets/images/dailytracking.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? Colors.primary : Colors.gray,
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? Colors.primary : Colors.gray, fontSize: 12 }}>
              Tracking
            </Text>
          ),
        }}
      />

      <Tabs.Screen
        name="Camera"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("@/assets/images/camera.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? Colors.primary : Colors.gray,
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? Colors.primary : Colors.gray, fontSize: 12 }}>
              Camera
            </Text>
          ),
        }}
      />

      <Tabs.Screen
        name="Favorites"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("@/assets/images/favorite.png")}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? Colors.primary : Colors.gray,
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: focused ? Colors.primary : Colors.gray, fontSize: 12 }}>
              Favorites
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("@/assets/images/profile.png")}
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
