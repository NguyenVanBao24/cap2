// Common Interfaces
interface ApiResponse<T> {
  code: number; // Status code từ API
  message: string; // Thông điệp từ API
  data: T; // Dữ liệu trả về (generic)
}

interface Profile {
  height: number;
  weight: number;
  age: number;
}

// Authentication Interfaces
interface AuthenticationParam {
  username: string;
  password: string;
  email?: string; // Email là tùy chọn
  profile?: Profile; // Thông tin cá nhân tùy chọn
  fullname?: string;
}

interface LoginResponse {
  code: number;
  data: {
    userID: string;
    authenticated: boolean;
    token: string;
  };
}

interface SignUpResponse extends LoginResponse {
  username: string; // Tên người dùng
  profile?: Profile; // Thông tin người dùng
}

// Recipe Interfaces
interface Recipe {
  recipe_ID: string;
  recipeName: string;
  description: string;
  cookingInstructions: string;
  imageURL: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  prepTime: number | null;
  cookTime: number | null;
  nutritionalQuality: string;
  difficultyLevel: string | null;
  mealType: string[];
  ingredientList: IngredientListItem[];
}

interface IngredientListItem {
  ingredientId: string;
  ingredientName: string;
  quantity: number;
  unit: string;
}

interface RecipeResponse extends ApiResponse<Recipe> {}

// Ingredient Interfaces
interface Ingredient {
  ingredientName: string;
  quantity: number;
  unit: string;
  imageURL: string;
  ingredientDescription: string;
  protein: string; // Lượng protein
  calories: string; // Lượng calo
  carbs: string; // Lượng carbohydrate
  fat: string; // Lượng chất béo
  ingredientType: string; // Loại nguyên liệu (ví dụ: "Vegetable")
  ingredient_ID: string; // ID nguyên liệu
}

interface IngredientResponse extends ApiResponse<Ingredient> {}

// Featured Foods Interface
interface FearuredFoodsProps {
  header?: string; // Tiêu đề của phần hiển thị
  recipes?: Recipe; // Công thức nấu ăn
  ingredient?: Ingredient; // Nguyên liệu
}

interface FavoriteRecipe {
  favoriteID: string;
  userID: string;
  recipeID: string;
  dateAdded: string; // ISO date format
}

interface FavoriteRecipeResponse {
  code: number;
  message: string;
  data: FavoriteRecipe[];
}

interface NutritionTrackingResponse {
  code: number;
  message: string;
  data: NutritionTrackingData;
}

interface NutritionTrackingData {
  user_ID: string; // ID người dùng
  date: string; // Ngày dưới dạng ISO string
  calories: number; // Lượng calo
  protein: number; // Lượng protein
  fat: number; // Lượng chất béo
  carbs: number; // Lượng carbohydrate
  daily_Nutrition_Tracking_ID: string; // ID của bản ghi theo dõi dinh dưỡng hàng ngày
  mealType: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK"; // Loại bữa ăn
}

interface RecipePlan {
  recipeList: string[]; // Mảng các ID công thức món ăn
  mealType: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK"; // Kiểu bữa ăn
  date: string; // Ngày dưới dạng ISO string
  user_ID: string; // ID của người dùng
}

interface TrendingFavoriteResponse {
  code: number;
  message: string;
  data: FavoriteRecipe[];
}

interface FavoriteRecipe {
  favoriteID: string;
  recipeID: string;
}
interface UserData {
  username: string;
  password: string;
  email: string;
  fullname: string;
  age: number;
  gender: boolean; // Assuming `true` represents male and `false` represents female
  weight: number;
  height: number;
  activityFactor: string;
  nutritionPlan: string;
  dietType: string;
  user_ID: string;
}

interface ApiResponseUser {
  code: number;
  message: string;
  data: UserData;
}
