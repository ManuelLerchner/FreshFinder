import { supabase } from "../components/SupabaseClient";

const defaultPreferences = {
  recomended_food: {
    title: "None",
    url: "https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-8867280-7265556.png",
    tags: ["Error"],
  },
  next_tags: [],
};

export async function requestRecommendations(
  hard_requirements: number[],
  userPreferences: {
    [key: string]: number;
  }
): Promise<{
  recomended_food: {
    RecipeId: number;
    title: string;
    url: string;
    tags: string[];
  };
  next_tags: string[]; // at least two params so that the next cards can be generated
}> {
  let queryData: {
    TagId: number;
    RecipeId: number;
    Recipes: {
      name: string;
      recipeImages: {
        images: string[];
      };
    };
    Tags: {
      category: string;
    };
  }[];

  if (!hard_requirements || hard_requirements.length === 0) {
    const { data, error } = await supabase
      .from("RecipeTags")
      .select("TagId, RecipeId, Recipes(name, recipeImages), Tags(category)");
    queryData = data as any;
  } else {
    const { data, error } = await supabase
      .from("RecipeTags")
      .select("TagId, RecipeId, Recipes(name, recipeImages), Tags(category)")
      .not("TagId", "in", "(" + hard_requirements.join(",") + ")");
    queryData = data as any;
  }

  if (!queryData || queryData.length === 0) {
    return {
      recomended_food: {
        RecipeId: 0,
        title: "None",
        url: "https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-8867280-7265556.png",
        tags: ["Error"],
      },
      next_tags: [],
    };
  }

  const aggregatedData: {
    [key: string]: {
      RecipeId: number;
      name: string;
      recipeUrl: string;
      tags: string[];
    };
  } = {};

  for (const entry of queryData) {
    if (!aggregatedData[entry.RecipeId]) {
      aggregatedData[entry.RecipeId] = {
        RecipeId: entry.RecipeId,
        name: entry.Recipes.name,
        recipeUrl: entry.Recipes.recipeImages.images[0],
        tags: [entry.Tags.category],
      };
    } else {
      aggregatedData[entry.RecipeId].tags.push(entry.Tags.category);
    }
  }

  //TODO implement the algorithm to find the best recipe
  const weighted_recipes = Object.keys(aggregatedData).map((key) => {
    const recipe = aggregatedData[key];
    let weight = 0;
    for (const tag of recipe.tags) {
      if (userPreferences[tag]) {
        weight += userPreferences[tag];
      }
    }

    return {
      ...recipe,
      weight,
    };
  });

  weighted_recipes.sort((a, b) => b.weight - a.weight);
  const best_recipe = weighted_recipes[0];

  //TODO implement the algorithm to find the optimum tags to split the search space

  const tag_histogram: {
    [key: string]: number;
  } = {};

  for (const recipe of weighted_recipes) {
    for (const tag of recipe.tags) {
      if (userPreferences[tag]) {
        continue;
      }

      if (!tag_histogram[tag]) {
        tag_histogram[tag] = 1;
      } else {
        tag_histogram[tag]++;
      }
    }
  }

  const sorted_tags = Object.entries(tag_histogram)
    .sort((a, b) => b[1] - a[1])
    .map((entry) => entry[0]);

  const median = Math.floor(sorted_tags.length / 2);

  const next_tags = sorted_tags.slice(median, median + 2);

  return {
    recomended_food: {
      RecipeId: best_recipe.RecipeId,
      title: best_recipe.name,
      url: best_recipe.recipeUrl,
      tags: best_recipe.tags,
    },
    next_tags,
  };
}
