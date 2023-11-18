import React from "react";
import SelectionCard from "../components/SelectionCard";

export default function Configure() {
  return (
    <div className="flex flex-col items-center my-4">
      <h1 className="text-2xl font-bold">
        First time use: set Hard and soft restrictiions
      </h1>

      <div className="flex flex-col items-center my-4">
        <SelectionCard
          title="Hard Restrictions"
          description="Select all that apply"
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
          selected="Peanuts"
          onChange={(selected) => {
            console.log(selected);
          }}
        />
      </div>
    </div>
  );
}
