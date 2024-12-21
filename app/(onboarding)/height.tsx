import { StyleSheet, Text, TextInput, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { useUserData } from "@/store/userStore";
import { Colors } from "@/constants/Colors";
import { getAge, getGender, getHeight, getWeight } from "@/store/tokenHelper";

const NameScreen = () => {
  const setUserData = useUserData((state) => state.setUserData);

  const { age, gender, height, weight } = useUserData();

  console.log(age, gender, height, weight, "0");
  const [ageValue, setAgeValue] = useState(age || 20);
  const [genderValue, setgenderValue] = useState<boolean>(gender || false);
  const [heightValue, setHeightValue] = useState(height || 70);
  const [weightValue, setWeightValue] = useState(weight || 180);

  const NutritionPlan = [
    { nameMale: "Male", male: true },
    { nameMale: "Female", male: false },
  ];

  useEffect(() => {
    setUserData({
      age: parseInt(ageValue),
      gender: genderValue,
      height: parseInt(heightValue),
      weight: parseInt(weightValue),
    });
  }, [ageValue, genderValue, heightValue, weightValue, setUserData]);

  return (
    <View style={styles.content}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.questionText}>What's your age?</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your age"
          placeholderTextColor="#888"
          value={ageValue.toString()}
          onChangeText={(text) => setAgeValue(Number(text))}
        />
      </View>

      <View style={styles.container}>
        <Text style={styles.questionText}>What is your sex?</Text>
        <View style={styles.optionsContainer}>
          {NutritionPlan.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.optionButton, genderValue === option.male && styles.optionSelected]}
              onPress={() => setgenderValue(option.male)}
            >
              <Text
                style={[
                  styles.optionText,
                  genderValue === option.male && styles.optionTextSelected,
                ]}
              >
                {option.nameMale}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={{ alignItems: "center" }}>
        <Text style={styles.questionText}>What's your height?</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your height"
          placeholderTextColor="#888"
          value={heightValue.toString()}
          onChangeText={(text) => setHeightValue(Number(text))}
        />
      </View>

      <View style={{ alignItems: "center" }}>
        <Text style={styles.questionText}>What's your weight?</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your weight"
          placeholderTextColor="#888"
          value={weightValue.toString()}
          onChangeText={(text) => setWeightValue(Number(text))}
        />
      </View>
    </View>
  );
};

export default NameScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 16,
    flexDirection: "column",
  },
  questionText: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
  },
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
  },
  optionButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "48%",
    borderWidth: 1,
    borderColor: Colors.grayBackGround,
  },
  optionSelected: {
    backgroundColor: Colors.primary,
  },
  optionText: {
    fontSize: 16,
    color: "#6e6e6e",
    textAlign: "center",
  },
  optionTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
});
