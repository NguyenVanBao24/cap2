// Header.tsx (React Native)
import { Colors } from "@/constants/Colors";
import React from "react";
import { View, StyleSheet } from "react-native";

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.circle1}></View>
      <View style={styles.circle2}></View>
      <View style={styles.circle3}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    position: "relative",
    overflow: "hidden",
  },
  circle1: {
    width: 120,
    height: 120,
    borderRadius: 100,
    backgroundColor: Colors.primary,
    position: "absolute",
    top: -40,
    left: -60,
    opacity: 0.8,
  },
  circle2: {
    width: 160,
    height: 160,
    borderRadius: 75,
    backgroundColor: Colors.circle,
    zIndex: -1,
    position: "absolute",
    top: -90,
    left: 0,
    opacity: 0.6,
  },
  circle3: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: Colors.primary,
    position: "absolute",
    top: -80,
    right: -80,
    opacity: 0.8,
  },
});

export default Header;
