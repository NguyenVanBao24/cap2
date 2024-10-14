import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

// Định nghĩa kiểu icon map để ánh xạ với các route trong Footer
const iconNameMap = {
  Home: "home",
  Location: "map-marker",
  ShoppingCart: "shopping-cart",
  Favorites: "heart",
  Notifications: "bell",
} as const; // Đảm bảo tính cố định của kiểu

// Định nghĩa kiểu cho props của BadgeIcon
interface BadgeIconProps {
  name: keyof typeof FontAwesome.glyphMap; // Chỉ cho phép các tên icon hợp lệ của FontAwesome
  badgeCount: number;
  color: string;
  size: number;
}

// Component BadgeIcon
const BadgeIcon: React.FC<BadgeIconProps> = ({ name, badgeCount, color, size }) => (
  <View style={{ width: 24, height: 24, margin: 5 }}>
    <FontAwesome name={name} size={size} color={color} />
    {badgeCount > 0 && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{badgeCount}</Text>
      </View>
    )}
  </View>
);

// Component Footer với các icon và badge tương ứng
const Footer: React.FC<{ state: any; descriptors: any; navigation: any }> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.footerContainer}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;

        const isFocused = state.index === index;

        // Sử dụng `keyof` để đảm bảo rằng `name` là hợp lệ
        const iconName: keyof typeof FontAwesome.glyphMap =
          iconNameMap[route.name as keyof typeof iconNameMap] || "question";

        let badgeCount = 0;
        if (route.name === "ShoppingCart") badgeCount = 4;
        if (route.name === "Notifications") badgeCount = 6;

        const color = isFocused ? "#FF6F61" : "#B0B0B0";
        const size = 30;

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={() => navigation.navigate(route.name)}
            style={styles.tabButton}
          >
            <BadgeIcon name={iconName} badgeCount={badgeCount} color={color} size={size} />
            <Text style={{ color }}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "white",
  },
  tabButton: {
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    right: -6,
    top: -3,
    backgroundColor: "red",
    borderRadius: 6,
    width: 12,
    height: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default Footer;
