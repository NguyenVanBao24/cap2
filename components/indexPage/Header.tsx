import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Image } from "expo-image";
import { Colors } from "@/constants/Colors";
import { useAuthStore } from "@/store/authStore";
import { router } from "expo-router";
import { Css } from "@/constants/Css";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const Header = () => {
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/");
      console.log("Logged out successfully");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  const navigateToFavorites = () => {
    router.push("/search/Favorites");
  };

  return (
    <View style={styles.containerHeader}>
      <View style={styles.headerLeft}>
        <TouchableOpacity onPress={handleLogout} style={styles.avatarWrapper}>
          <Image
            source={require("@/assets/images/avata.png")}
            style={styles.imageHeader}
            contentFit="cover"
          />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.headerHome}>Nutrition Cook</Text>

      {/* Favorites Icon */}
      <TouchableOpacity onPress={navigateToFavorites}>
        <AntDesign name="staro" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  containerHeader: {
    height: Css.height,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Css.paddingHoriAllPage,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayBackGround,
  },
  headerLeft: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerHome: {
    fontSize: Css.fontTextLargest,
    color: Colors.primary,
    fontWeight: "800",
    fontFamily: "Roboto",
  },
  avatarWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageHeader: {
    width: 34,
    height: 34,
    borderRadius: "50%",
  },
});
