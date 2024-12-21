import React from "react";
import { View, TextInput, Button, StyleSheet, Text, Alert, Dimensions, Image } from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "@/components/Custom/CustomInput";
import CustomButton from "@/components/Custom/CustomButton";
import { Colors } from "@/constants/Colors";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long.")
    .required("Password is required."),
  username: Yup.string()
    .trim()
    .required("Username is required.")
    .min(6, "Password must be at least 6 characters long."),
});

// Định nghĩa kiểu cho values
interface LoginValues {
  username: string;
  password: string;
}

const LoginScreen = () => {
  const router = useRouter();
  const { login } = useAuthStore();

  const handleLogin = async (values: LoginValues) => {
    const { username, password } = values;
    try {
      const response = await login(username, password);

      console.log(response, "response.message response.message response.message ");
      if (response.data.authenticated) {
        router.replace("/(tabs)/Home");
        console.log("Success---------------");
      } else {
        Alert.alert("Login failed", "Invalid Username or Password");
        console.log("fail---------------");
      }
    } catch (error) {
      console.log("Login error:", error);
      Alert.alert("Login failed", "An unexpected error occurred. Please try again.");
    }
  };
  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      {/* <View
        style={{
          backgroundColor: "red",
          height: screenWidth,
          width: screenWidth,
          position: "absolute",
          top: 0,
          borderWidth: 2,
          // borderColor: "#d4a017",
          // borderBottomLeftRadius: 180,
          // borderBottomRightRadius: 180,
        }}
      ></View> */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          paddingBottom: 20,
        }}
      >
        <View>
          <Image
            source={require("@/assets/images/tabsIconNav/iconNutrition.jpg")}
            style={{ height: 50, width: 60 }}
          />
        </View>
        <Text style={{ fontSize: 50, fontWeight: "700", color: Colors.primary }}>Nutri Cook</Text>
      </View>

      <Text style={styles.title}>Login</Text>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.formContainer}>
            <CustomInput
              title="Usename"
              placeholder="Usename"
              value={values.username}
              onChangeText={handleChange("username")}
              onBlur={() => handleBlur("username")}
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
              secureTextEntry={true}
            />
            {errors.password && touched.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            <View style={styles.bottomAuthor}>
              <Link style={styles.linkText} href={"/(tabs)/Home"}>
                Forgot password?
              </Link>
            </View>

            <View style={styles.alignButton}>
              <CustomButton title="LOGIN" onPress={handleSubmit as any} />
            </View>

            <View style={styles.bottomAuthor}>
              <Text style={styles.askText}>
                Don't have an account?{" "}
                <Link style={styles.linkText} href={"/auth/signup"}>
                  Sign up
                </Link>
              </Text>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20, // Thêm khoảng cách bên trong
  },
  title: {
    fontSize: 50,
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

export default LoginScreen;
