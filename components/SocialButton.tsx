import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Bạn có thể sử dụng thư viện icon khác nếu muốn

type SocialButtonProps = {
  title: string;
  iconName: boolean;
  onPress: () => void;
};
const SocialButton: React.FC<SocialButtonProps> = ({ title, iconName, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {iconName ? (
        <Ionicons name="logo-facebook" size={30} color="blue" style={styles.icon} />
      ) : (
        <Image source={require("@/assets/images/logo-gg.jpg")} style={styles.imageButton} />
      )}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    padding: 10,
    paddingHorizontal: 10,
    margin: 5,
    elevation: 1,
    backgroundColor: "white",
  },
  icon: {
    marginRight: 10,
    borderRadius: 50,
    height: 30,
  },
  imageButton: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    color: "black",
    letterSpacing: 1,
  },
});

export default SocialButton;
