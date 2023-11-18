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
  const data = supabase.from("table").select("*").limit(1).eq("id", 1);

  return {
    recomended_food: {
      title: "Hünchen mit Reis",
      url: "https://www.chefkoch.de/rezepte/1360101240528747/Huehnchen-mit-Reis.html",
      tags: ["Hünchen", "Reis", "Gemüse"],
    },
    next_tags: ["vegan", "spicy", "sweet"],
  };
}
