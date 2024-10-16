// app/auth/Login.tsx
import Header from "@/components/HeaderAuthentication";
import LoginForm from "@/components/Login";
import SignUpWith from "@/components/SignUpWith";
import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";

const Login = () => {
  return (
    <View style={styles.loginPage}>
      <Header />
      <View style={styles.containerBody}>
        <Text style={styles.headerText}>Login</Text>
        <LoginForm />
      </View>
      <SignUpWith />
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  loginPage: {
    backgroundColor: Colors.white,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerBody: { flexDirection: "column", gap: 32 },
  headerText: {
    fontSize: 36,
    fontWeight: "bold",
  },
});
