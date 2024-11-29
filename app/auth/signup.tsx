import React from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert, Dimensions } from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "@/components/Custom/CustomInput";
import CustomButton from "@/components/Custom/CustomButton";
import { Colors } from "@/constants/Colors";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("username is required."),
  email: Yup.string().required("username is required."),
  fullname: Yup.string().required("username is required."),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long.")
    .required("Password is required."),
});

// Định nghĩa kiểu cho values
interface SignupProps {
  username: string;
  password: string;
  email: string;
  fullname: string;
}
const signup = () => {
  const router = useRouter();
  const { signup } = useAuthStore(); // Sử dụng hàm login từ Zustand store

  // Chỉ định kiểu cho values
  const handleLogin = async (values: SignupProps) => {
    const { username, email, password, fullname } = values;
    try {
      const response = await signup(username, email, password, fullname);

      if (response.code === 1000) {
        router.replace("/(tabs)/Home");
      } else {
        Alert.alert("Login failed", response?.message || "Invalid credentials");
      }
    } catch (error) {
      console.log("Login error:", error);
      Alert.alert("Login failed", "An unexpected error occurred. Please try again.");
    }
  };
  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <Formik
        initialValues={{ username: "", password: "", email: "", fullname: "" }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.formContainer}>
            <CustomInput
              title="Email"
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={() => handleBlur("email")}
            />
            {errors.username && touched.username && (
              <Text style={styles.error}>{errors.username}</Text>
            )}

            <CustomInput
              title="Password"
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={() => handleBlur("password")}
              // secureTextEntry
            />
            {errors.password && touched.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <CustomInput
              title="Full Name"
              placeholder="Full Name"
              value={values.fullname}
              onChangeText={handleChange("fullname")}
              onBlur={() => handleBlur("fullname")}
            />
            {errors.username && touched.username && (
              <Text style={styles.error}>{errors.username}</Text>
            )}
            <CustomInput
              title="Username"
              placeholder="Username"
              value={values.username}
              onChangeText={handleChange("username")}
              onBlur={() => handleBlur("username")}
            />
            {errors.username && touched.username && (
              <Text style={styles.error}>{errors.username}</Text>
            )}
            <View style={styles.alignButton}>
              <CustomButton title="SIGN UP" onPress={handleSubmit as any} />
            </View>

            <View style={styles.bottomAuthor}>
              <Text style={styles.askText}>
                You have accout?
                <Link style={styles.linkText} href={"/auth/login"}>
                  Login
                </Link>
              </Text>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20, // Thêm khoảng cách bên trong
  },
  title: {
    fontSize: 34,
    marginBottom: 20,
    fontWeight: "800",
  },
  formContainer: {
    width: "100%", // Để chiếm toàn bộ chiều rộng
    alignItems: "center", // Căn giữa các input
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  bottomAuthor: {
    marginTop: 16,
    alignItems: "center",
  },
  linkText: {
    color: Colors.primary,
    fontWeight: "500",
  },
  alignButton: {
    justifyContent: "center",
    width: "100%", // Để nút chiếm toàn bộ chiều rộng
  },
  askText: {
    fontSize: 14,
  },
});
