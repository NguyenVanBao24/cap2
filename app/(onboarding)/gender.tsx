import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { useUserData } from "@/store/userStore"; // Đảm bảo bạn đã import store

const EmailScreen = () => {
  const setUserData = useUserData((state) => state.setUserData);
  const { email } = useUserData();

  const [emailValue, setEmail] = useState(email || "");

  const handleSaveData = () => {
    setUserData({ email: emailValue });
  };

  console.log(emailValue);
  React.useEffect(() => {
    handleSaveData();
  }, [name, emailValue]);

  return (
    <View style={styles.content}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.questionText}>Hi! What's your first name?</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your first name"
          placeholderTextColor="#888"
          value={emailValue}
          onChangeText={setEmail}
        />
      </View>
    </View>
  );
};

export default EmailScreen;

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
