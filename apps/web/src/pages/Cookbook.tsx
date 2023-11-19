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
      difficulty: number;
      cookingTime: number;
    }[]
  >([]);

  useEffect(() => {
    const queryFunction = async () => {
      const { data, error } = await supabase
        .from("Orders")
        .select(
          "id, RecipeId, Recipes(name, recipeImages, difficulty, cookingTime)"
        )
        .eq("id", localUser.uuid);

      const newData = (data as any).map((recipe: any) => ({
        RecipeId: recipe.RecipeId,
        title: recipe.Recipes.name,
        url: recipe.Recipes.recipeImages.images[0],
        difficulty: recipe.Recipes.difficulty,
        cookingTime: recipe.Recipes.cookingTime,
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
        <h2 className="text-md font-bold">
          Start a new cooking session by selecting one of your recipes.
        </h2>

        <div className="flex flex-col justify-center items-center my-8 gap-4 w-full">
          {recipes.map((recipe) => (
            <RecommendedFood
              key={recipe.RecipeId}
              name={recipe.title}
              image={recipe.url}
              body={
                <div className="flex flex-col items-start justify-around gap-2 p-2">
                  <div className="flex flex-col items-start justify-around">
                    <p className="text-md font-light">
                      Difficulty:{" "}
                      <span className="font-bold">{recipe.difficulty}</span>
                    </p>

                    <p className="text-md font-light">
                      Cooking Time:{" "}
                      <span className="font-bold">{recipe.cookingTime}</span>
                    </p>
                  </div>
                  <div className="flex justify-end items-center gap-4 w-full">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md hover:scale-[102%]"
                      onClick={() => {
                        navigate("/cooking/" + recipe.RecipeId);
                      }}
                    >
                      Create Session
                    </button>
                  </div>
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
