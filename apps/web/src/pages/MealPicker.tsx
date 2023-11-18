import React from "react";
import QuestionCard from "../components/QuestionCard";

export default function MealPicker() {
  return (
    <>
      <div className="flex flex-col items-center my-4">
        <h1 className="text-2xl font-bold"> Returning user: Pick your meals</h1>
      </div>

      <div className="flex flex-col items-center my-4">
        <QuestionCard
          question="Do you like fish?"
          imageUri="https://www.safefood.net/getmedia/94101697-3c3f-4fe1-8ae8-5b595d3814ba/medium-rare-steak.jpg?w=2000&h=1333&ext=.jpg&width=1360"
          onPositive={() => {}}
          onNegative={() => {}}
        />
      </div>
    </>
  );
}
