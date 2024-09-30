// LoginFormReactHookForm.tsx
import React from "react";
import { StyleSheet, View, TextInput, Button, Text, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Link } from "expo-router";
import { Colors } from "@/constants/Colors";

// Định nghĩa kiểu dữ liệu cho form
interface LoginFormData {
  email: string;
  password: string;
}

const LoginFormReactHookForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  // Xử lý sự kiện gửi form
  const onSubmit = (data: LoginFormData) => {
    console.log(data);
    // Xử lý gửi dữ liệu
  };

  return (
    <View style={styles.LoginContainer}>
      <Text style={styles.HeaderLogin}>Sign Up</Text>
      <View>
        <Text style={styles.subForInput1}>Full name</Text>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email là bắt buộc",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Email không hợp lệ",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Email"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              style={{
                borderWidth: 1,
                padding: 16,
                marginBottom: 4,
                color: Colors.textInput,
                borderRadius: 10,
                borderColor: Colors.primary,
                fontSize: 18,
                fontWeight: "bold",
              }}
            />
          )}
        />
        {errors.email && <Text style={{ color: "red" }}>{errors.email.message}</Text>}
      </View>

      <View>
        <Text style={styles.subForInput1}>E-mail</Text>
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Mật khẩu là bắt buộc",
            minLength: {
              value: 6,
              message: "Mật khẩu phải có ít nhất 6 ký tự",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Mật khẩu"
              secureTextEntry
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              style={{
                borderWidth: 1,
                padding: 16,
                marginBottom: 4,
                color: Colors.textInput,
                borderRadius: 10,
                borderColor: Colors.primary,
                fontSize: 18,
                fontWeight: "bold",
              }}
            />
          )}
        />
      </View>
      {errors.password && <Text style={{ color: "red" }}>{errors.password.message}</Text>}
      <View style={styles.bottomAuthor}>
        <Text style={styles.forgotBtn}>Forgot password</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Đăng Nhập</Text>
        </TouchableOpacity>
        <Text>
          Don't have an account? <Link href={"/"}>Sign up</Link>
        </Text>
      </View>
    </View>
  );
};

export default LoginFormReactHookForm;
const styles = StyleSheet.create({
  LoginContainer: { flexDirection: "column", gap: 20, margin: 30 },
  HeaderLogin: { fontSize: 36, fontWeight: "bold" },
  subForInput1: { color: Colors.gray, fontSize: 16 },
  inputEmail: { color: Colors.gray },
  forgotBtn: { color: Colors.primary },
  bottomAuthor: { flexDirection: "column", alignItems: "center", gap: 20 },
  button: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: Colors.primary,
    width: 248,
    paddingVertical: 12,
    borderRadius: 20,
  },
});
