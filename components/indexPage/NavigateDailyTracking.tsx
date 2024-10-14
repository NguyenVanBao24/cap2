import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const NavigateDailyTracking = () => {
  return (
    <TouchableOpacity style={styles.trackView}>
      <View style={styles.trackTitleSite}>
        <Text style={styles.titleTack}>Track Your </Text>
        <Text style={styles.titleTack}>Weekly Progress</Text>
      </View>

      <View style={styles.trackButtonSite}>
        <View style={styles.trackButtonElement}>
          <Text style={styles.trackButton}>View Now</Text>
          <Ionicons name="menu" size={20} style={styles.trackIcon} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NavigateDailyTracking;

const styles = StyleSheet.create({
  trackView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 30,
    marginHorizontal: 8,
    backgroundColor: Colors.primary,
    flex: 1,
    borderRadius: 18,
  },
  trackTitleSite: { width: "60%" },
  titleTack: {
    fontSize: 20,
    fontWeight: "800",
    color: Colors.white,
  },
  trackButtonSite: {
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  trackButtonElement: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 6,
  },
  trackButton: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "800",
  },
  trackIcon: {
    color: Colors.primary,
    paddingRight: 8,
  },
});
