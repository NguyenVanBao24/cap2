import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
interface LoadingProps {
  backgroundColor: string; // Xác định kiểu của backgroundColor
}
const Loading: React.FC<LoadingProps> = ({ backgroundColor }) => {
  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Text style={styles.text}>Loading</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    flex: 1,
  },
  text: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
});
