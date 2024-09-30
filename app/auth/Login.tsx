// app/auth/Login.tsx
import React from "react";
import { View, Text, TextInput, Button } from "react-native";

const Login = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
      <Text>Đăng Nhập</Text>
      <TextInput placeholder="Email" style={{ borderWidth: 1, marginBottom: 12 }} />
      <TextInput
        placeholder="Mật khẩu"
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 12 }}
      />
      <Button
        title="Đăng Nhập"
        onPress={() => {
          /* Xử lý đăng nhập */
        }}
      />
    </View>
  );
};

export default Login;
