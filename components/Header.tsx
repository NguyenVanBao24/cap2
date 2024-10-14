import { StyleSheet, Text, View } from "react-native";
import React from "react";

// Định nghĩa kiểu cho props
interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <View style={styles.headerRoot}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerRoot: {},
  headerTitle: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "700",
  },
});
