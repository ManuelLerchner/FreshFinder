import React, { useEffect, useState } from "react";
import OptionCard from "../components/OptionCard";
import { useNavigate } from "react-router-dom";
import SliderCard from "../components/SliderCard";
import { localUser, supabase } from "../components/SupabaseClient";
import RecommendedFood from "../components/RecommendedFood";

export default function Cookbook() {
  const navigate = useNavigate();
  const [participants, setParticipants] = useState(1);
  const [recipes, setRecipes] = useState<
    {
      RecipeId: number;
      title: string;
      url: string;
    }[]
  >([]);

  useEffect(() => {
    const queryFunction = async () => {
      const { data, error } = await supabase
        .from("Orders")
        .select("id, RecipeId, Recipes(name, recipeImages)")
        .eq("id", localUser.uuid);

      const newData = (data as any).map((recipe: any) => ({
        RecipeId: recipe.RecipeId,
        title: recipe.Recipes.name,
        url: recipe.Recipes.recipeImages.images[0],
      }));

      setRecipes(newData);
    };

    queryFunction();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center my-4">
        <h1 className="text-2xl font-bold"> Start Cooking! </h1>
      </div>

      <div className="flex flex-col items-center justify-center my-2">
        <h2 className="text-md font-bold">Start a new cooking session:</h2>

        <div className="flex flex-row justify-center items-center my-8">
          {recipes.map((recipe) => (
            <RecommendedFood
              key={recipe.RecipeId}
              name={recipe.title}
              image={recipe.url}
              body={
                <div className="flex justify-center items-center">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md hover:scale-[102%]"
                    onClick={() => {
                      navigate("/cooking");
                    }}
                  >
                    Join
                  </button>
                </div>
              }
              onDiscard={() => {}}
            />
          ))}
        </div>
      </div>
    </>
  );
}
