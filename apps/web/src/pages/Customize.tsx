import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../components/SupabaseClient";
import { openAiKey, openaiURL } from "../components/OpenAIClient";
import axios from "axios";

export default function Customize({
  recipeID,
  recipeCallback,
}: {
  recipeID: string;
  recipeCallback: (recipe: any) => void;
}) {
  //const [prompt, setPrompt] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // add statefule variables for the sliders
  const [spicy, setSpicy] = useState("");
  const [cheese, setCheese] = useState("");

  const handleAISubmit = async (data: {
    id: any;
    name: any;
    Ingredients: any;
    Steps: any;
  }) => {
    // console.log("data", data);
    let prompt = `This is a recipe for ${data.name}. The ingredients are [${data.Ingredients.Ingredients}] with the corresponding Amount: [${data.Ingredients.AmountOnePerson}].`;
    prompt += `The steps to make it are: [${data.Steps}].`;
    prompt += `Adapt the recipe to be more or less spicy: ${spicy}. A value greater 0 means more spicy, a value less than 0 means less spicy.`;
    prompt += `Adapt the recipe to be more or less cheesy: ${cheese}. A value greater 0 means more cheesy, a value less than 0 means less cheesy.`;
    prompt +=
      "Choose the number of amount you want to add or reduce to adjust the recipe.";
    prompt +=
      'Return the recipe with the adapted ingredients and adapted steps. Use the JSON format.: "{ "Ingredients": {"Ingredients":[ ... ],"AmountOnePerson":[...]}, "Steps": [ ... ] }"\n';
    prompt +=
      "Only return the JSON file with no preleading or succesional text.";
    // console.log("prompt ", prompt);
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          openaiURL,
          {
            messages: [{ role: "user", content: prompt }],
            model: "gpt-3.5-turbo",
            temperature: 0.5,
            max_tokens: 1000,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ` + openAiKey,
            },
          }
        );
        setApiResponse(response.data.choices[0].message.content);
        console.log("response", response.data.choices[0].message.content);
        recipeCallback(JSON.parse(response.data.choices[0].message.content));
      } catch (error) {
        console.error("Error:", error);
      }
      setLoading(false);
    };
    fetchData();
  };

  return (
    <>
      <div className="flex flex-col items-center my-4">
        <h1 className="text-2xl font-bold">Customize Recipe</h1>
        <p className="text-lg my-2">
          The recipe will be adjusted to your liking using AI.
        </p>

        <div className="flex flex-row items-center justify-center gap-4 my-16">
          <div className="dropdown">
            <label tabIndex={0} className="btn m-1">
              Spicy
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 flex items-center justify-center"
            >
              <input
                type="range"
                min={-100}
                max="100"
                className="range"
                step="50"
                defaultValue="0"
                onChange={(e) => {
                  setSpicy(e.target.value);
                }}
              />
              <div className="w-full flex justify-between text-xs px-2">
                <span>--</span>
                <span>-</span>
                <span>0</span>
                <span>+</span>
                <span>++</span>
              </div>
            </ul>
          </div>
          <div className="dropdown">
            <label tabIndex={0} className="btn m-1">
              Cheese
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 flex items-center justify-center"
            >
              <input
                type="range"
                min={-100}
                max="100"
                className="range"
                step="50"
                defaultValue="0"
                onChange={(e) => {
                  setCheese(e.target.value);
                }}
              />
              <div className="w-full flex justify-between text-xs px-2">
                <span>--</span>
                <span>-</span>
                <span>0</span>
                <span>+</span>
                <span>++</span>
              </div>
            </ul>
          </div>
          </div>
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn m-1 bg-green-300"
            onClick={() => {
              supabase
                .from("Recipes")
                .select("id, name, Ingredients, Steps")
                .eq("id", recipeID)
                .then((data) => {
                  if (data && data.data && data.data.length) {
                    handleAISubmit(data.data[0]);
                  }
                });
            }}
          >
            Adjust Recipe
          </label>
        </div>
        {loading && (
          <div className="flex flex-col items-center my-4">
            <p className="text-xl font-bold">Customizing...</p>
            <span className="loading loading-ring loading-lg"></span>
          </div>
        )}
      </div>
    </>
  );
}
