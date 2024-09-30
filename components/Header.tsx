import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
const Header = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Header</Text>
      </View>
    </SafeAreaView>
  );
};

export default Header;
const styles = StyleSheet.create({
  safeArea: {
    flex: 0,
  },
  headerContainer: {
    paddingTop: 20, // Khoảng cách từ đỉnh
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
