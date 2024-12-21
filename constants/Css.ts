import { Dimensions } from "react-native";

export const Css = {
  paddingHoriAllPageSmall: 8,
  paddingHoriAllPage: 12,
  paddingHoriIntro: 40,

  sizeIconLarge: 26,
  sizeIconSmall: 16,
  sizeIconSmaller: 12,

  weightHeaderHight: 800,
  weightHeaderMedium: 700,
  weightHeaderLow: 600,
  weightHeaderLowest: 500,

  marginItemLarge: 12,
  marginItemSmall: 8,

  fontTextLargest: 26,
  fontTextLarge: 20,
  fontTextMedium: 18,
  fontTextLow: 16,
  fontTextLower: 12,
  fontTextLowest: 9,

  fontWeightLarge: "800",
  fontWeightMedium: "700",
  fontWeightLow: 600,
  fontWeightLowest: 500,

  height: 50,

  topIconBack: 30,

  borderRadius: 12,
};

export const shadowStyle = {
  shadowColor: "#ccc",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 3,
  elevation: 3,
};

export const capitalizeFirstLetter = (str: string | null) =>
  str ? str[0].toUpperCase() + str.slice(1) : "";

export const splitInstructionsToArray = (text: string | null): string[] => {
  if (!text) return [];

  return text
    .split(/(?=\d+\.\s)/)
    .map((item) => item.trim())
    .filter((item) => item);
};

export const formatString = (input: string) => {
  const parts = input?.split("_");

  const formattedParts = parts.map(
    (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
  );

  return formattedParts.join(" ");
};
const _ = require("lodash");
export const isFavorite = (data1: string, data2: string) => {
  return _.isEqual(data1, data2);
};

export const screenWidth = Dimensions.get("window").width;
