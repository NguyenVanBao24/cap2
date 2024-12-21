// @ts-nocheck
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Ensure you're using expo or install react-native-vector-icons
import { router } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { useUserData } from "@/store/userStore";
import { Css, formatText, screenWidth } from "@/constants/Css";

interface MenuItemProps {
  icon: string;
  text: string;
  onPress: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, text, onPress }) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIcon}>
        <Ionicons name={"menu"} size={24} color="#FF715B" />
      </View>
      <Text style={styles.menuText}>{text}</Text>
      <Ionicons name="chevron-forward" size={24} color="#ccc" />
    </TouchableOpacity>
  );
};

const ProfileScreen: React.FC = () => {
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  const handleName = () => {
    router.push("/(onboarding)/name");
  };

  const handleLogOut = () => {
    logout();
    router.replace("/");
  };

  const { fullname, dietType } = useUserData();
  console.log(fullname, dietType, "first");
  return (
    <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.profileContainer}>
            <Image source={require("@/assets/images/man.png")} style={styles.profileImage} />
            <Text style={styles.name}>{fullname || "HI"}</Text>
            <Text style={styles.role}>{formatText(dietType) || "Set your goal?"}</Text>
          </View>

          <View style={styles.menu}>
            <TouchableOpacity onPress={handleName} style={styles.tabIcon}>
              <Image source={require("@/assets/images/edit.png")} style={styles.profileImageIcon} />
              <Text style={styles.tabIconText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogOut} style={styles.tabIcon}>
              <Image
                source={require("@/assets/images/tabsIconNav/logout.png")}
                style={styles.profileImageIcon}
              />
              <Text style={styles.tabIconText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  body: {},
  title: {
    fontSize: 18,
    textAlign: "center",
  },
  profileContainer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  profileImageIcon: {
    width: 30,
    height: 30,
  },
  tabIconText: { fontSize: Css.fontTextMedium },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
  },
  role: {
    fontSize: 16,
    color: "#888",
  },
  menu: {
    marginTop: 40,
  },
  tabIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 1,
    borderBottomWidth: 1,
    marginBottom: 20,
    borderColor: "#ddd",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuIcon: {
    width: 40,
    alignItems: "center",
  },
  menuText: {
    fontSize: 16,
    flex: 1,
  },
});

export default ProfileScreen;
