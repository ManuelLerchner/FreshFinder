import React from "react";
import FocusComponent from "../layouts/FocusComponent";
import QuestionCard from "../components/QuestionCard";
import RecommendedFood from "../components/RecommendedFood";

export default function SelectionPage() {
  return (
    <div className="flex flex-col items-center justify-center my-4 h-full">
      <QuestionCard
        question="Do you like meat?"
        imageUri="https://images.squarespace-cdn.com/content/v1/5ba526da8dfc8c614b5e5cc6/1540594362409-CXGHX9PLATQYS922IKGN/Products-1048-Fotolia_172144922_M.jpg?format=2500w"
        onPositive={() => {}}
        onNegative={() => {}}
      />

      <RecommendedFood
        name="Chicken"
        image="https://ais.kochbar.de/kbrezept/22629_1009908/1200x1200/haehnchen-in-curry-sahne-sosse-auf-reis-rezept-bild-nr-2.jpg"
        description="Chicken is a great source of protein"
        onDiscard={() => {}}
      />
    </div>
  );
}
