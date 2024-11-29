import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import React, { useState } from "react";
import { useUserData } from "@/store/userStore";

const NameScreen = () => {
  const setUserData = useUserData((state) => state.setUserData);
  const [name, setName] = useState("");

  const handleNext = () => {
    setUserData({ fullname: name }); // Lưu giá trị vào Zustand store
    // Chuyển đến màn hình tiếp theo hoặc thực hiện logic tiếp theo
  };

  return (
    <View style={styles.content}>
      <Text style={styles.questionText}>Hi! What's your email?</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName} // Cập nhật trạng thái cục bộ khi nhập liệu
      />
    </View>
  );
};

export default NameScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
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
