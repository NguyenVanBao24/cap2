// @ts-nocheck
import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useUserData } from "@/store/userStore"; // Đảm bảo bạn đã import store
import { useAuthStore } from "@/store/authStore";

const NameScreen = ({ setUserData }) => {
  // const setUserData = useUserData((state) => state.setUserData);
  const { password } = useAuthStore();
  const { email, fullname } = useUserData();

  const [nameValue, setNameValue] = useState(fullname || "");
  const [emailValue, setEmailValue] = useState(email || "");
  const [passwordValue, setPasswordValue] = useState(password || "");

  return (
    <View style={styles.content}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.questionText}>Hi! What's your first name?</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your first name"
          placeholderTextColor="#888"
          value={nameValue}
          onChangeText={setNameValue}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.questionText}>What's your email address?</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your first name"
          placeholderTextColor="#888"
          value={emailValue}
          onChangeText={setEmailValue}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.questionText}>Change your password?</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#888"
          value={passwordValue}
          onChangeText={setPasswordValue}
          secureTextEntry={true} // Ẩn mật khẩu khi người dùng nhập
          keyboardType="default" // Đảm bảo không có bàn phím đặc biệt, mặc định là bàn phím văn bản
        />
      </View>
    </View>
  );
};

export default NameScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 16,
    flexDirection: "column",
  },
  questionText: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
  },
});
