import { Tabs } from "expo-router";
import React, { useState } from "react";
import { Platform, View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // Import the useRouter hook

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { updateUserInformationPlan } from "@/services/authService";
import { useUserData } from "@/store/userStore";
import { getuserID } from "@/store/tokenHelper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const {
    password,
    email,
    fullname,
    age,
    gender,
    weight,
    height,
    activityFactor,
    nutritionPlan,
    dietType,
  } = useUserData();
  console.log(
    password,
    email,
    fullname,
    age,
    gender,
    weight,
    height,
    activityFactor,
    nutritionPlan,
    dietType,
    "--------------"
  );
  const [currentTab, setCurrentTab] = useState(0);
  const arrRouter = ["name", "height", "nutritionPlan", "activityFactor", "dietType"];
  // Function to handle navigation
  const handleBackPress = async () => {
    if (currentTab > 0) {
      const previousTab = arrRouter[currentTab - 1];
      router.push(`/(onboarding)/${previousTab}`);

      setCurrentTab(currentTab - 1);
    } else {
      const response = await updateUserInformationPlan({
        id,
        password,
        email,
        fullname,
        age: parseInt(age),
        gender,
        weight,
        height,
        activityFactor,
        nutritionPlan,
        dietType,
      });
      router.back();
    }
  };
  const id = getuserID();
  const handleNextPress = async () => {
    if (currentTab < arrRouter.length - 1) {
      router.push(`/(onboarding)/${arrRouter[currentTab + 1]}`);
      setCurrentTab(currentTab + 1);
    } else if (currentTab < arrRouter.length) {
      try {
        const response = await updateUserInformationPlan({
          id,
          password,
          email,
          fullname,
          age: parseInt(age),
          gender,
          weight,
          height,
          activityFactor,
          nutritionPlan,
          dietType,
        });
      } catch (error) {
        console.log("Lỗi ở onbroading _layout: " + error);
      }
      router.replace(`/(tabs)/Profile`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.header}>
        <View style={styles.progressIndicator}>
          {/* Render dots with dynamic active state */}
          {[...Array(arrRouter.length)].map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentTab === index ? styles.activeDot : null]}
            />
          ))}
        </View>
      </View>

      {/* Tabs */}
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarStyle: { display: "none" },
        }}
      >
        <Tabs.Screen name="name" />
        <Tabs.Screen name="gender" />
        <Tabs.Screen name="dayofbirth" />
        <Tabs.Screen name="age" />
        <Tabs.Screen name="height" />
        <Tabs.Screen name="weight" />
        <Tabs.Screen name="nutritionPlan" />
        <Tabs.Screen name="activityFactor" />
        <Tabs.Screen name="dietType" />
      </Tabs>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
          <Text style={styles.nextButtonText}>
            {currentTab == arrRouter.length - 1 ? "Finish" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerHeader: { flexDirection: "row" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backButton: {
    paddingHorizontal: 8,
    position: "absolute",
    top: 50,
  },
  progressIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ddd",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.primary,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  nextButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
