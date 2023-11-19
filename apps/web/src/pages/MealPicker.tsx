import React, { useState } from "react";
import OptionCard from "../components/OptionCard";
import { useNavigate } from "react-router-dom";
import SliderCard from "../components/SliderCard";

export default function MealPicker() {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);

  return (
    <>
      <div className="flex flex-col items-center my-4">
        <h1 className="text-2xl font-bold"> Meal Preferences </h1>
      </div>

      <div className="flex flex-col items-center my-4">
        <div>
          <OptionCard
            title="What cooking level you prefer?"
            description="How difficult do you want your meals to be?"
            options={["Easy", "Medium", "Hard"]}
            onSubmit={(cooking_level) => {
              console.log(cooking_level);
              setStage(1);
            }}
          />
          <SliderCard
            title="What cooking time you prefer?"
            description="How much time do you want to spend cooking?"
            onChange={(cooking_time) => {
              console.log(cooking_time);
            }}
          />
          <button
            className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate("/food-selection")}
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
}
