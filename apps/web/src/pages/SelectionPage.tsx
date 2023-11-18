import React, { useEffect, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import RecommendedFood from "../components/RecommendedFood";
import { mergePreferences } from "../util/updatePreferences";
import TagCard from "../components/TagCard";

const questionsDB = [
  {
    question: "Do you like meat?",
    imageUri:
      "https://images.squarespace-cdn.com/content/v1/5ba526da8dfc8c614b5e5cc6/1540594362409-CXGHX9PLATQYS922IKGN/Products-1048-Fotolia_172144922_M.jpg?format=2500w",
    categories: ["meat"],
  },
  {
    question: "Do you like salad?",
    imageUri:
      "https://images.squarespace-cdn.com/content/v1/5ba526da8dfc8c614b5e5cc6/1540594362409-CXGHX9PLATQYS922IKGN/Products-1048-Fotolia_172144922_M.jpg?format=2500w",
    categories: ["vegan"],
  },
];

export default function SelectionPage() {
  const [userPreferences, setUserPreferences] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    console.log(userPreferences);
  }, [userPreferences]);

  return (
    <div className="flex flex-col items-center justify-center my-4 h-full">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="relative flex h-96 w-full justify-center items-center">
          {questionsDB.map((question) => (
            <QuestionCard
              key={question.question}
              question={question.question}
              imageUri={question.imageUri}
              onPositive={() => {
                const updates: { [key: string]: number } = {};

                question.categories.forEach((category) => {
                  updates[category] = 1;
                });

                setUserPreferences((prev) => mergePreferences(prev, updates));
              }}
              onNegative={() => {
                const updates: { [key: string]: number } = {};

                question.categories.forEach((category) => {
                  updates[category] = -1;
                });

                setUserPreferences((prev) => mergePreferences(prev, updates));
              }}
            />
          ))}
        </div>

        <div className="flex flex-row overflow-x-auto gap-2 max-w-xl no-scrollbar">
          {Object.keys(userPreferences)
            .filter((tag) => userPreferences[tag] > 0)
            .map((tag) => (
              <TagCard key={tag} tagname={tag} />
            ))}
        </div>

        <h2 className="text-2xl font-bold my-4 self-start">Recommended Food</h2>

        <RecommendedFood
          name="Chicken"
          image="https://ais.kochbar.de/kbrezept/22629_1009908/1200x1200/haehnchen-in-curry-sahne-sosse-auf-reis-rezept-bild-nr-2.jpg"
          tags={["vegan", "low-carb", "meat", "salad"]}
          onDiscard={() => {}}
        />

        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:scale-[102%] w-full"
          onClick={() => {
            console.log("clicked");
          }}
        >
          Accept Recommendation
        </button>
      </div>
    </div>
  );
}
