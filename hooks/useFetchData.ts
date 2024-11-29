import { useState, useEffect } from "react";
import { getAllRecipesService } from "@/services/recipeService";
import { getAllIngredientService } from "@/services/ingredientService";

export const useFetchData = () => {
  const [recipes, setRecipes] = useState<Recipe | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [recipesData, ingredientsData] = await Promise.all([
          getAllRecipesService(),
          getAllIngredientService(),
        ]);
        setRecipes(recipesData.data);
        setIngredients(ingredientsData.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { recipes, ingredients, loading };
};
