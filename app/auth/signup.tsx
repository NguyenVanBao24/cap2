import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuthStore } from "@/store/authStore";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "@/components/Custom/CustomInput";
import CustomButton from "@/components/Custom/CustomButton";
import { Colors } from "@/constants/Colors";
import axios from "axios";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("username is required."),
  email: Yup.string().required("email is required."),
  fullname: Yup.string().required("fullname is required."),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long.")
    .required("Password is required."),
});

interface SignupProps {
  username: string;
  password: string;
  email: string;
  fullname: string;
}

const Signup = () => {
  const router = useRouter();
  const { signup } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (values: SignupProps) => {
    const { username, email, password, fullname } = values;
    try {
      const response = await signup(username, email, password, fullname);

      console.log(response, "signup");
      if (response.message == "Create User successfully") {
        router.replace("/auth/login");
      } else {
        setErrorMessage(response?.message || "Invalid credentials");
      }
    } catch (error) {
      console.log("Login error:", error);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  const closeErrorModal = () => setErrorMessage(null);

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
            {errors.email && touched.email && <Text style={styles.error}>{errors.email}</Text>}

            <CustomInput
              title="Password"
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={() => handleBlur("password")}
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
            {errors.fullname && touched.fullname && (
              <Text style={styles.error}>{errors.fullname}</Text>
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
                You have an account?
                <Link style={styles.linkText} href={"/auth/login"}>
                  Login
                </Link>
              </Text>
            </View>
          </View>
        )}
      </Formik>

      {errorMessage && (
        <View style={styles.errorModal}>
          <Text style={styles.errorText}>{errorMessage}</Text>
          <TouchableOpacity onPress={closeErrorModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 34,
    marginBottom: 20,
    fontWeight: "800",
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
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
    width: "100%",
  },
  askText: {
    fontSize: 14,
  },
  errorModal: {
    position: "absolute",
    top: Dimensions.get("window").height / 2 - 150,
    left: Dimensions.get("window").width / 2 - 250,
    width: 500,
    height: 300,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 20,
  },
  errorText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "blue",
    fontWeight: "bold",
  },
});
