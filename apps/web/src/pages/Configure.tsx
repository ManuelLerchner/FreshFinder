import React, { useState } from "react";
import SelectionCard from "../components/SelectionCard";
import QuestionCard from "../components/QuestionCard";
import { useNavigate } from "react-router-dom";

export default function Configure() {
  const [stage, setStage] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center my-4 h-full">
      <div className="relative flex h-96 w-full justify-center items-center">
        {stage === 0 && (
          <QuestionCard
            question="Do you have allergies?"
            imageUri="https://efbcogj6hn3.exactdn.com/wp-content/uploads/2023/01/GettyImages-1333930513-2-1024x633.jpg?strip=all&lossy=1&ssl=1"
            onPositive={() => {
              setStage(1);
            }}
            onNegative={() => {
              setStage(2);
            }}
          />
        )}

        {stage === 1 && (
          <SelectionCard
            title="Allergies"
            description="Select all your allergies"
            options={[
              "Peanuts",
              "Tree Nuts",
              "Dairy",
              "Eggs",
              "Wheat",
              "Soy",
              "Fish",
              "Shellfish",
            ]}
            onChange={(selected) => {
              console.log(selected);
            }}
            onNext={() => {
              setStage(2);
            }}
          />
        )}

        {stage === 2 && (
          <SelectionCard
            title="Disliked Foods"
            description="Select all the foods you dislike"
            options={[
              "Onions",
              "Tomatoes",
              "Peppers",
              "Mushrooms",
              "Broccoli",
              "Carrots",
              "Celery",
              "Spinach",
            ]}
            onChange={(selected) => {
              console.log(selected);
            }}
            onNext={() => {
              navigate("/");
            }}
          />
        )}
      </div>
    </div>
  );
}
