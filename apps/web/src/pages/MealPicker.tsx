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
        <h1 className="text-2xl font-bold"> Returning user: Pick your meals</h1>
      </div>

      <div className="flex flex-col items-center my-4">
        {stage === 0 && (
          <OptionCard
            title="How many meals are you cooking?"
            description="Select the number of meals you are cooking"
            options={[1, 2, 3, 4, 5]}
            onSubmit={(num) => {
              console.log(num);
              setStage(1);
            }}
          />
        )}
        {stage === 1 && (
          <OptionCard
            title="Which cooking difficulty do you prefer?"
            description="How difficult do you want your meals to be?"
            options={["Easy", "Medium", "Hard"]}
            onSubmit={(cooking_level) => {
              console.log(cooking_level);
              setStage(2);
            }}
          />
        )}
        {stage === 2 && (
          <SliderCard
            title="What cooking time you prefer?"
            description="How much time do you want to spend cooking?"
            onSubmit={(cooking_time) => {
              console.log(cooking_time);
              navigate("/food-selection");
            }}
          />
        )}
      </div>
    </>
  );
}
