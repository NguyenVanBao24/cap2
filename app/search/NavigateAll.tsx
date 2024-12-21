import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HeaderElement from "@/components/indexPage/HeaderElement";
import { SafeAreaView } from "react-native-safe-area-context";

const NavigateAll = () => {
  return (
    <View style={styles.container}>
      <Text>0</Text>
      <HeaderElement header={"filterName"} />
    </View>
  );
};

export default NavigateAll;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
});
