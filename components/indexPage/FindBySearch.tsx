import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Modal, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Css } from "@/constants/Css";
import { router } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const FindBySearch = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <View style={styles.container}>
      {/* Search Input Section */}
      <TouchableOpacity
        style={styles.searchContainer}
        onPress={() => router.push("/search/SeachBottom")}
      >
        <Ionicons name="search" size={20} color={Colors.black} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Find for nutrition..."
          placeholderTextColor="#8e8e93"
          editable={false}
        />
      </TouchableOpacity>

      {/* Filter Button */}
      <TouchableOpacity style={styles.filterButton} onPress={() => router.push("/search/Camera")}>
        <MaterialCommunityIcons name="magnify-scan" size={24} color={Colors.black} />
      </TouchableOpacity>

      {/* Modal Example for Bottom Sheet */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheetContainer}>
            <Text style={styles.modalTitle}>Search Options</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Css.fontTextLarge,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 12,
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.grayBackGround,
    shadowColor: Colors.black,
    elevation: 5,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: Css.fontTextLow,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: Colors.white,
    fontWeight: "500",
  },
  filterButton: {
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.grayBackGround,
    backgroundColor: Colors.white,
  },
  modalOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "flex-end",
  },
  bottomSheetContainer: {
    backgroundColor: Colors.white,
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalButton: {
    paddingVertical: 10,
    backgroundColor: Colors.backgroundInput,
    borderRadius: 8,
    alignItems: "center",
  },
  modalButtonText: {
    fontSize: 16,
    color: Colors.black,
  },
});

export default FindBySearch;
