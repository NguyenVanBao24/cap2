import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import CustomButton from "@/components/Custom/CustomButton";
import { Css } from "@/constants/Css";
import { captions, images } from "@/constants/data";
const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const [firstTime, setFirstTime] = useState(true);
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(1);

  useEffect(() => {
    const checkFirstTime = async () => {
      const hasFinishedOnboarding = await AsyncStorage.getItem("onboardingCompleted");
      if (hasFinishedOnboarding) {
        setFirstTime(false);
      }
    };
    checkFirstTime();
  }, []);

  const handleLoginWithYourAccount = () => {
    router.push("/auth/login");
    setFirstTime(true);
  };

  const handleSignUpnWithYourAccount = () => {
    router.push("/auth/signup");
    setFirstTime(true);
  };

  // Hàm cập nhật currentIndex chính xác khi cuộn dừng lại
  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width); // Dùng Math.round để làm tròn chỉ số
    setCurrentIndex(index);
  };

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Text style={styles.subHeader}>Welcome to</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <View>
              <Image
                source={require("@/assets/images/tabsIconNav/iconNutrition.jpg")}
                style={{ height: 30, width: 40 }}
              />
            </View>
            <Text style={styles.header}>Nutri Cook</Text>
          </View>
        </View>

        <View style={{ height: "80%", paddingBottom: 60 }}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handleMomentumScrollEnd}
            scrollEventThrottle={16}
            snapToInterval={width}
            decelerationRate="fast"
          >
            {images.map((image, index) => (
              <View key={index} style={styles.imageCaptionContainer}>
                <Image source={image} style={styles.image} />
                <Text style={styles.caption}>{captions[index]}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.dotsContainer}>
            {images.map((_, index) => (
              <Text
                key={index}
                style={[styles.dot, currentIndex === index ? styles.activeDot : null]}
              >
                ●
              </Text>
            ))}
          </View>
        </View>

        {firstTime ? (
          <View style={styles.bothButton}>
            <CustomButton
              onPress={handleSignUpnWithYourAccount}
              title="Sign up"
              backgroundColor={Colors.white}
              color={Colors.primary}
              borderColor={Colors.primary}
            />
            <CustomButton
              onPress={handleLoginWithYourAccount}
              title="Login with your account"
              backgroundColor={Colors.primary}
              color={Colors.white}
            />
          </View>
        ) : (
          <View style={styles.bothButton}>
            <CustomButton
              onPress={handleLoginWithYourAccount}
              title="Login with your account"
              backgroundColor={Colors.white}
              color={Colors.primary}
              borderColor={Colors.primary}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingVertical: 30,
    backgroundColor: Colors.white,
  },
  imageCaptionContainer: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "stretch",
  },
  image: {
    width: width * 0.9,
    height: width * 1.1,
    borderRadius: (width * 0.7) / 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#ccc",
    resizeMode: "cover",
    elevation: 500,
    borderWidth: 1,
    borderColor: Colors.grayBackGround,
  },
  caption: {
    textAlign: "center",
    fontSize: 18,
    color: Colors.textInput,
    fontWeight: "600",
    marginTop: 4,
    marginBottom: 20,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    fontSize: 9,
    color: "grey",
    marginHorizontal: 2,
  },
  activeDot: {
    color: Colors.primary,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 30,
    backgroundColor: Colors.white,
  },
  subHeader: { fontSize: 16, fontWeight: "500", color: "#333" },
  header: { fontSize: 28, fontWeight: "700", color: Colors.primary },
  bothButton: {
    flexDirection: "column",
    width: "100%",
    paddingHorizontal: Css.paddingHoriIntro,
  },
});

export default HomeScreen;
