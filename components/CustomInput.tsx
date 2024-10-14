// components/CustomInput.tsx
import { Colors } from "@/constants/Colors";
import React from "react";
import { View, TextInput, StyleSheet, Text, TextInputProps } from "react-native";

interface CustomInputProps extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void; // Đảm bảo rằng onBlur không nhận đối số
  error?: string;
  secureTextEntry?: boolean;
  title: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  title,
  secureTextEntry = false,
  ...props // Nhận tất cả các props còn lại của TextInputProps
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={() => onBlur && onBlur()} // Đảm bảo rằng onBlur không nhận đối số nào
        secureTextEntry={secureTextEntry}
        {...props} // Truyền các props còn lại vào TextInput
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    color: "#9796A1",
    fontSize: 16,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#C4C4C4",
    borderRadius: 8,
    padding: 12,
    fontSize: 17,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});

export default CustomInput;
