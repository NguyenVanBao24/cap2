// components/CustomInput.tsx
import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, TextInputProps, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
  ...props
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const toggleSecureEntry = () => {
    setIsSecure((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onBlur={() => onBlur && onBlur()}
          secureTextEntry={isSecure}
          {...props}
          autoCapitalize="none"
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={toggleSecureEntry} style={styles.icon}>
            <Ionicons name={isSecure ? "eye-off" : "eye"} size={24} color="gray" />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  title: {
    color: "#9796A1",
    fontSize: 16,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C4C4C4",
    borderRadius: 12,
    paddingRight: 10,
    width: "100%",
  },
  input: {
    flex: 1,
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
  icon: {
    marginLeft: 8,
  },
});

export default CustomInput;
