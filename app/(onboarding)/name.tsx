import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useUserData } from "@/store/userStore"; // Đảm bảo bạn đã import store

const NameScreen = () => {
  const setUserData = useUserData((state) => state.setUserData);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Lưu dữ liệu khi người dùng nhập thông tin
  const handleSaveData = () => {
    setUserData({ fullname: name, email, password });
  };

  // Gọi hàm lưu dữ liệu khi component cập nhật
  React.useEffect(() => {
    handleSaveData();
  }, [name, email, password]); // Lưu dữ liệu khi bất kỳ trường nào thay đổi

  return (
    <View style={styles.content}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.questionText}>Hi! What's your first name?</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your first name"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.questionText}>What's your email?</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.questionText}>Change your password?</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
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
