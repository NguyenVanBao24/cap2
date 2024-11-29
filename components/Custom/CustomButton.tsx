import { Colors } from "@/constants/Colors";
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  color?: string;
  borderColor?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  backgroundColor = Colors.primary,
  color = "#ffffff",
  borderColor = Colors.primary,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }, { borderColor }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    borderRadius: 32,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    elevation: 2,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 2,
  },
});

export default CustomButton;
