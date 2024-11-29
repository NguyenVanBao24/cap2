import React, { useRef } from "react";
import { Animated, Dimensions, PanResponder, StyleSheet, View, Text } from "react-native";

const { height: screenHeight } = Dimensions.get("window");

const SNAP_POINTS = [screenHeight * 0.4, screenHeight * 0.2, 0]; // 60%, 80%, 100%

const App = () => {
  const translateY = useRef(new Animated.Value(SNAP_POINTS[0])).current;

  // Animations for components in the header
  const component2Opacity = useRef(new Animated.Value(1)).current;
  const component3Height = useRef(new Animated.Value(screenHeight * 0.2)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        const newY = Math.min(
          Math.max(gestureState.dy + translateY._value, SNAP_POINTS[2]),
          SNAP_POINTS[0]
        );
        translateY.setValue(newY);

        // Update animations based on body position
        if (newY <= SNAP_POINTS[1]) {
          // 80% or 100%
          Animated.timing(component2Opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start();

          Animated.timing(component3Height, {
            toValue: screenHeight * 0.01,
            duration: 300,
            useNativeDriver: false,
          }).start();
        } else {
          // 60%
          Animated.timing(component2Opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();

          Animated.timing(component3Height, {
            toValue: screenHeight * 0.2,
            duration: 300,
            useNativeDriver: false,
          }).start();
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        const velocityThreshold = 50000; // Giảm tốc độ (chỉnh giá trị này theo yêu cầu) để giảm độ nhạy
        const distanceThreshold = 0.2 * screenHeight; // 20% của chiều cao màn hình

        let newIndex = 0;

        if (Math.abs(gestureState.vy) > velocityThreshold) {
          if (gestureState.vy < 0) {
            newIndex = SNAP_POINTS.findIndex((p) => p < translateY._value);
          } else {
            newIndex = SNAP_POINTS.findIndex((p) => p > translateY._value) - 1;
          }
        } else {
          newIndex = SNAP_POINTS.reduce((prev, curr, index) => {
            return Math.abs(curr - translateY._value) <
              Math.abs(SNAP_POINTS[prev] - translateY._value)
              ? index
              : prev;
          }, 0);
        }

        newIndex = Math.max(0, Math.min(newIndex, SNAP_POINTS.length - 1));

        // Giảm tốc độ di chuyển của Animated.spring
        Animated.spring(translateY, {
          toValue: SNAP_POINTS[newIndex],
          friction: 10, // Giảm lực ma sát để chuyển động chậm hơn
          tension: 40, // Giảm độ căng của animation
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.component1}>
          <Text style={styles.text}>Component 1</Text>
        </View>

        {/* Component 2 */}
        <Animated.View style={[styles.component2, { opacity: component2Opacity }]}>
          <Text style={styles.text}>Component 2</Text>
        </Animated.View>

        {/* Component 3 */}
        <Animated.View style={[styles.component3, { height: component3Height }]}>
          <Text style={styles.text}>Component 3</Text>
        </Animated.View>
      </View>

      {/* Body */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.body, { transform: [{ translateY }] }]}
      >
        <Text style={styles.bodyText}>Body Content</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    position: "absolute",
    top: 0,
    height: screenHeight * 0.4,
    width: "100%",
    backgroundColor: "red",
    padding: 10,
    borderTopWidth: 2,
    borderTopColor: "#fff",
  },
  component1: {
    backgroundColor: "#1abc9c",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  component2: {
    backgroundColor: "#e67e22",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  component3: {
    backgroundColor: "#e74c3c",
    overflow: "hidden", // Prevent content overflow
    padding: 15,
    borderRadius: 8,
  },
  body: {
    position: "absolute",
    top: 0,
    height: screenHeight,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  bodyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#34495e",
  },
  text: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});

export default App;
