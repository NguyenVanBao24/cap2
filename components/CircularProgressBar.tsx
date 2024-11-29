import { Colors } from "@/constants/Colors";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface CircularProgressBarProps {
  currentValue: number;
  totalValue: number;
  radius?: number; // Làm cho radius là tùy chọn
  strokeWidth?: number; // Làm cho strokeWidth là tùy chọn
  color?: string; // Làm cho color là tùy chọn
  strokeColor?: string;
  TextSize?: number;
  TextColorUp?: string;
  TextColorDown?: string;
  hideText?: boolean;
  typeNutrion?: string;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  currentValue,
  totalValue,
  radius = 50,
  strokeWidth = 10,
  color = "#fff",
  strokeColor = "#E7E7E7",
  TextSize = 22,
  TextColorUp = "#000",
  TextColorDown = Colors.gray,
  hideText = false,
  typeNutrion,
}) => {
  const circumference = 2 * Math.PI * radius;
  const progress = (currentValue / totalValue) * circumference;

  const offset = -Math.PI / 2;

  const viewBoxSize = radius * 2 + strokeWidth;

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Svg width={viewBoxSize} height={viewBoxSize} viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
          {/* Vòng tròn nền */}
          <Circle
            cx={radius + strokeWidth / 2} // Điều chỉnh để phù hợp với strokeWidth
            cy={radius + strokeWidth / 2} // Điều chỉnh để phù hợp với strokeWidth
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Vòng tròn tiến độ */}
          <Circle
            cx={radius + strokeWidth / 2} // Điều chỉnh để phù hợp với strokeWidth
            cy={radius + strokeWidth / 2} // Điều chỉnh để phù hợp với strokeWidth
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress} // Điểm bắt đầu từ 12h
            strokeLinecap="round" // Thêm thuộc tính này để tạo đầu tròn cho đường tiến trình
            transform={`rotate(${offset * (180 / Math.PI)}, ${radius + strokeWidth / 2}, ${
              radius + strokeWidth / 2
            })`} // Xoay vòng tròn để bắt đầu từ 12h
          />
        </Svg>
        <View style={styles.textContainer}>
          {!hideText ? (
            <>
              <Text
                style={[
                  styles.valueText,
                  { fontSize: TextSize, color: TextColorUp, fontWeight: "600" },
                ]}
              >
                {currentValue}
              </Text>
              <Text
                style={[
                  styles.valueText,
                  { fontSize: TextSize, color: TextColorDown, fontWeight: "600" },
                ]}
              >
                /{totalValue}g
              </Text>
            </>
          ) : (
            <Text
              style={[
                styles.valueText,
                { fontSize: TextSize, color: TextColorDown, fontWeight: "600" },
              ]}
            >
              {totalValue}
              {" \n"}
              Kcal
              {" \n"}
              left
            </Text>
          )}
        </View>
      </View>
      <Text>{typeNutrion}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    position: "absolute",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  valueText: {
    fontWeight: "bold",
  },
});

export default CircularProgressBar;
