import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const DateOfBirthInput = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleDayChange = (value: string) => {
    if (/^\d{0,2}$/.test(value)) setDay(value); // Chỉ cho phép nhập 2 chữ số
  };

  const handleMonthChange = (value: string) => {
    if (/^\d{0,2}$/.test(value)) setMonth(value); // Chỉ cho phép nhập 2 chữ số
  };

  const handleYearChange = (value: string) => {
    if (/^\d{0,4}$/.test(value)) setYear(value); // Chỉ cho phép nhập 4 chữ số
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What is your date of birth?</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={day}
          onChangeText={handleDayChange}
          placeholder="DD"
          keyboardType="number-pad"
          maxLength={2}
        />
        <TextInput
          style={styles.input}
          value={month}
          onChangeText={handleMonthChange}
          placeholder="MM"
          keyboardType="number-pad"
          maxLength={2}
        />
        <TextInput
          style={styles.input}
          value={year}
          onChangeText={handleYearChange}
          placeholder="YYYY"
          keyboardType="number-pad"
          maxLength={4}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  input: {
    width: "25%",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: 18,
    paddingVertical: 5,
  },
});

export default DateOfBirthInput;
