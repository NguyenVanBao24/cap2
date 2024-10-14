import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

import { Redirect, router } from "expo-router";
import useAuth from "@/hooks/useAuth";

const index = () => {
  const { user, isLoading, token } = useAuth();
  useEffect(() => {
    if (user) {
      console.log("User or Token changed", user, token);
      <Redirect href={"/(tabs)/Home"} />;
    }
  }, [user, token]);
  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  console.log("21 form", user, token);
  if (user === "a") {
    return <Redirect href={"/(tabs)/Home"} />;
  }
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View>
          <View>
            <Text>
              Discover Endless{"\n"}
              Possibilities with <Text>Aora</Text>
            </Text>
          </View>

          <Text>
            Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with
            Aora
          </Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/auth/Login")}>
          <Text>login</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({});
