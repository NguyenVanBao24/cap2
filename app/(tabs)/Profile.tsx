import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Ensure you're using expo or install react-native-vector-icons
import Header from "@/components/Header";

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
  return (
    <View style={styles.container}>
      <Header title="Profile" />
      <View style={styles.profileContainer}>
        <Image
          source={require("@/assets/images/human.jpg")} // Replace with the correct image URL
          style={styles.profileImage}
        />
        <Text style={styles.name}>Shambhavi Mishra</Text>
        <Text style={styles.role}>Food Blogger</Text>
      </View>

      <View style={styles.menu}>
        <MenuItem icon="person-outline" text="Edit Profile" onPress={() => {}} />
        <MenuItem icon="star-outline" text="Renew Plans" onPress={() => {}} />
        <MenuItem icon="settings-outline" text="Settings" onPress={() => {}} />
        <MenuItem icon="document-text-outline" text="Terms & Privacy Policy" onPress={() => {}} />
        <MenuItem icon="log-out-outline" text="Log Out" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
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
    marginTop: 20,
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
