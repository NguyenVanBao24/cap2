import React from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Formik } from "formik";
import { RegisterSchema } from "@/validations";
import CustomButton from "./CustomButton";
import CustomInput from "./CustomInput";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";

const RegisterForm: React.FC = () => {
  return (
    <Formik
      initialValues={{ username: "", email: "", password: "", confirmPassword: "" }}
      validationSchema={RegisterSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.containerButton}>
          <CustomInput
            title="Full Name"
            placeholder="Full Name"
            value={values.email}
            onChangeText={handleChange("Full Name")}
            onBlur={() => handleBlur("Full Name")}
            error={touched.email && errors.email ? errors.email : undefined}
          />
          <CustomInput
            title="E-mail"
            placeholder="Email"
            value={values.email}
            onChangeText={handleChange("email")}
            onBlur={() => handleBlur("email")}
            error={touched.email && errors.email ? errors.email : undefined}
          />

          <CustomInput
            title="Password"
            placeholder="Password"
            value={values.password}
            onChangeText={handleChange("password")}
            onBlur={() => handleBlur("password")} // Đảm bảo hàm onBlur không nhận đối số
            error={touched.password && errors.password ? errors.password : undefined}
            secureTextEntry
          />
          <CustomInput
            title="Password"
            placeholder="Password"
            value={values.password}
            onChangeText={handleChange("password")}
            onBlur={() => handleBlur("password")} // Đảm bảo hàm onBlur không nhận đối số
            error={touched.password && errors.password ? errors.password : undefined}
            secureTextEntry
          />

          <View style={styles.alignButton}>
            <CustomButton title="LOGIN" onPress={handleSubmit as any} />
          </View>
          <View style={styles.bottomAuthor}>
            <Text style={styles.askText}>
              Don't have an account?{" "}
              <Link style={styles.linkText} href={"/auth/Login"}>
                Login
              </Link>
            </Text>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  containerButton: {},
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  alignButton: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomAuthor: {
    marginTop: 16,
    alignItems: "center",
  },
  askText: {
    fontSize: 14,
  },
  linkText: {
    color: Colors.primary,
    fontWeight: "500",
  },
});
