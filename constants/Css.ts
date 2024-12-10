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

  borderRadius: 12,
};

export const shadowStyle = {
  shadowColor: "#ccc",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 3,
  elevation: 3,
};

// export const capitalizeFirstLetter = (str: string | null) =>
//   str ? str[0].toUpperCase() + str.slice(1) : "";

// export const splitInstructions = (text: string | null): string => {
//   if (!text) return "";

//   return text
//     .split(/(\d+\.\s)/) // Tách theo số thứ tự dạng "1. ", "2. ", ...
//     .filter((item) => item.trim() !== "") // Loại bỏ các chuỗi rỗng hoặc chỉ chứa khoảng trắng
//     .reduce<string[]>((result, item, index, arr) => {
//       if (/\d+\.\s/.test(item) && arr[index + 1]) {
//         result.push(item.trim() + arr[index + 1].trim()); // Kết hợp số thứ tự và nội dung
//       }
//       return result;
//     }, [])
//     .join("\n"); // Nối các phần tử thành chuỗi, mỗi phần tử trên một dòng
// };
export const splitInstructions = (text: string | null): string[] => {
  if (!text) return [];

  return text
    .split(/(\d+\.\s)/) // Tách theo số thứ tự dạng "1. ", "2. ", ...
    .filter((item) => item.trim() !== "") // Loại bỏ chuỗi rỗng hoặc chỉ chứa khoảng trắng
    .reduce<string[]>((result, item, index, arr) => {
      if (/\d+\.\s/.test(item) && arr[index + 1]) {
        result.push(item.trim() + arr[index + 1].trim()); // Ghép số thứ tự với nội dung
      }
      return result;
    }, []);
};
