import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { Css } from "@/constants/Css";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

const NavigateDailyTracking = () => {
  return (
    <View style={styles.container}>
      {/* Title Section */}
      <View style={styles.titleWrapper}>
        <Text style={styles.titleText}>Track Your </Text>
        <Text style={styles.titleText}>Weekly Progress</Text>
      </View>

      {/* Button Section */}
      <TouchableOpacity
        style={styles.buttonWrapper}
        onPress={() => router.push("/(tabs)/DailyTracking")}
      >
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>View Now</Text>
          <AntDesign name="rightcircleo" size={20} color={Colors.white} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 30,
    backgroundColor: Colors.white,
    borderRadius: 18,
    shadowColor: Colors.black,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: Colors.grayBackGround,
  },
  titleWrapper: {
    flex: 1,
  },
  titleText: {
    fontSize: Css.fontTextMedium,
    fontWeight: "600",
    color: Colors.primary,
  },
  buttonWrapper: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    overflow: "hidden",
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: Colors.white,
    fontSize: Css.fontTextMedium,
    fontWeight: "600",
    marginRight: 10,
  },
});

export default NavigateDailyTracking;
