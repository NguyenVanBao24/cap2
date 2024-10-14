// components/CustomButton.tsx
import { Colors } from "@/constants/Colors";
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  color?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  backgroundColor = Colors.primary,
  color = "#ffffff",
}) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor }]} onPress={onPress}>
      <Text style={[styles.buttonText, { color }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 260,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 32,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 2,
  },
});

export default CustomButton;
