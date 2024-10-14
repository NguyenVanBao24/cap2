import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SocialButton from "./SocialButton";

const SignUpWith: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.lineContainer}>
        <View style={styles.line} />
        <Text style={styles.text}>Sign up with</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.buttonContainer}>
        <SocialButton
          title="FACEBOOK"
          iconName={true}
          onPress={() => console.log("Facebook button pressed")}
        />
        <SocialButton
          title="GOOGLE"
          iconName={false}
          onPress={() => console.log("Google button pressed")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  text: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default SignUpWith;
