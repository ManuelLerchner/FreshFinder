import React from "react";
import QuestionCard from "../components/QuestionCard";
import Card from "../components/Card";
import AmountCard from "../components/AmountCard";
import { useNavigate } from "react-router-dom";

export default function MealPicker() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-center my-4">
        <h1 className="text-2xl font-bold"> Returning user: Pick your meals</h1>
      </div>

      <div className="flex flex-col items-center my-4">
        <AmountCard
          title="How many people are cooking?"
          description="Select the number of people cooking"
          options={[1, 2, 3, 4, 5]}
          onSubmit={(num) => {
            console.log(num);
            navigate("/food-selection");
          }}
        />
      </div>
    </>
  );
}
