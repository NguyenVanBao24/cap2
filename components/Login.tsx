// LoginForm.tsx
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "@/components/CustomInput"; // Đường dẫn đến CustomInput
import CustomButton from "@/components/CustomButton"; // Đường dẫn đến CustomButton
import { Colors } from "@/constants/Colors";
import { LoginSchema } from "@/validations";
import { Link, Redirect, router } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import useAuth from "@/hooks/useAuth";

type RootStackParamList = {
  index: undefined;
  Form: undefined;
};
type FormScreenProp = NativeStackNavigationProp<RootStackParamList, "Form">;

const LoginForm: React.FC = ({}) => {
  const { user, token, isLoading, error, login, logout } = useAuth();

  const navigation = useNavigation<FormScreenProp>();
  return (
    <Formik
      style={styles.container}
      initialValues={{ email: "", password: "" }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        login(values.email, values.password);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.containerButton}>
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

          <View style={styles.bottomAuthor}>
            <Link style={styles.linkText} href={"/auth/Register"}>
              Forgot pasword?
            </Link>
          </View>
          <View style={styles.alignButton}>
            <CustomButton title="LOGIN" onPress={handleSubmit as any} />
          </View>

          <View style={styles.bottomAuthor}>
            <Text style={styles.askText}>
              Don't have an account?{" "}
              <Link style={styles.linkText} href={"/auth/Register"}>
                Sign up
              </Link>
            </Text>
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {},
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

export default LoginForm;
