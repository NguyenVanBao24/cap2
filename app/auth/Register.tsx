import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RegisterForm from "@/components/RegisterComponents";
import SignUpWith from "@/components/SignUpWith";
import { Colors } from "@/constants/Colors";
import Header from "@/components/HeaderAuthentication";

const Register = () => {
  return (
    <View style={styles.loginPage}>
      <Header />
      <View style={styles.containerBody}>
        <Text style={styles.headerText}>Register</Text>
        <RegisterForm />
      </View>
      <SignUpWith />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  loginPage: {
    backgroundColor: Colors.white,
    flex: 1,
    alignItems: "center",
  },
  containerBody: { flexDirection: "column", gap: 32 },
  headerText: {
    fontSize: 36,
    fontWeight: "bold",
  },
});
