import { supabase } from "../components/SupabaseClient";

export async function requestRecommendations(
  hard_requirements: number[],
  userPreferences: {
    [key: string]: number;
  }
): Promise<{
  recomended_food: {
    //data of the currently best food
    title: string;
    url: string;
    tags: string[];
  };
  next_tags: string[]; // at least two params so that the next cards can be generated
}> {
  console.log(hard_requirements);
  const { data, error } = await supabase
    .from("RecipeTags")
    .select("TagId, RecipeId, Recipes(name, recipeImages), Tags(category)")
    .not("TagId", "in", "(" + hard_requirements.join(",") + ")");

  if (!data) {
    return {
      recomended_food: {
        title: "None",
        url: "https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-8867280-7265556.png",
        tags: ["Error"],
      },
      next_tags: [],
    };
  }

  //TODO implement the algorithm to find the best recipe
  const best_recipe = data[0];

  //TODO implement the algorithm to find the optimum tags to split the search space
  const next_tags = ["vegan", "spicy", "keto"];

  return {
    recomended_food: {
      title: (best_recipe.Recipes as any).name,
      url: (best_recipe.Recipes as any).recipeImages.images[0],
      tags: [(best_recipe.Tags as any).category],
    },
    next_tags,
  };
}
