import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Colors } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import useAuth from "@/hooks/useAuth";
import { Redirect, router } from "expo-router";

const Header = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={[styles.containerHeader, { paddingTop: insets.top }]}>
      <View style={styles.title}>
        <View style={styles.headerFirst}>
          <Text style={styles.titleFirst}>What Would</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Image
              source={require("@/assets/images/avata.png")}
              style={styles.imageHeader}
              contentFit="cover"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.titleFirst}>You Want To Eat?</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  title: { flex: 1, flexDirection: "column", justifyContent: "center" },
  headerFirst: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  underTitle: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
  titleFirst: { color: Colors.textInput, fontWeight: "800", fontSize: 28 },
  titleSecond: { color: Colors.primary, fontWeight: "500" },
  imageHeader: { width: 42, height: 42 },
});
