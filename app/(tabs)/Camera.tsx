import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Camera } from "expo-camera";

const CameraSelect = () => {
  // State for managing camera permissions and camera visibility
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  if (showCamera) {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={styles.closeButton} onPress={() => setShowCamera(false)}>
          <Text style={styles.closeButtonText}>Close Camera</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Camera</Text>
      <ScrollView style={styles.contentContainer}></ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => setShowCamera(true)}></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 16,
  },
  contentContainer: {
    flex: 1,
    marginBottom: 16,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  closeButton: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: [{ translateX: -50 }],
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 18,
  },
});

export default CameraSelect;
