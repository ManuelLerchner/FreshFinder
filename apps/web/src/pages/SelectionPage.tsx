import React, { useEffect, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import RecommendedFood from "../components/RecommendedFood";
import { mergePreferences } from "../util/updatePreferences";
import TagCard from "../components/TagCard";
import { useNavigate } from "react-router-dom";
import { requestRecommendations } from "../algorithms/recommendation";
import { localUser, supabase } from "../components/SupabaseClient";

export default function SelectionPage() {

  const [questions, setQuestions] = useState<
    { question: string; imageUri: string; categories: string[] }[]
  >([]);

  const [recommendedFood, setRecommendedFood] = useState<{
    title: string;
    url: string;
    tags: string[];
  } | null>(null);

  useEffect(() => {
    const queryFunction = async () => {
      const { recomended_food, next_tags } = await requestRecommendations(
        localUser.hardPreferences,
        localUser.userPreferences
      );

      setRecommendedFood(recomended_food);

      const { data: next_questions } = await supabase
        .from("Tags")
        .select("id, category, image_url")
        .in("category", next_tags)
        .select();

      if (!next_questions) return;

      const question = next_questions.map((question) => ({
        question: question.category,
        imageUri: question.image_url,
        categories: [question.category],
      }));

      setQuestions(question);
    };

    queryFunction();
  }, [localUser.userPreferences]);

  const navigator = useNavigate();

  useEffect(() => {
    console.log(localUser.userPreferences);
  }, [localUser.userPreferences]);

  return (
    <div className="flex flex-col items-center justify-center my-4 h-full">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="relative flex h-96 w-full justify-center items-center">
          {questions.map((question) => (
            <QuestionCard
              key={question.question}
              question={"Do you like " + question.question + " food?"}
              imageUri={question.imageUri}
              onPositive={() => {
                const updates: { [key: string]: number } = {};

                question.categories.forEach((category) => {
                  updates[category] = 1;
                });
                localUser.userPreferences = mergePreferences(localUser.userPreferences, updates);
              }}
              onNegative={() => {
                const updates: { [key: string]: number } = {};

                question.categories.forEach((category) => {
                  updates[category] = -1;
                });
                localUser.userPreferences = mergePreferences(localUser.userPreferences, updates);
              }}
            />
          ))}
        </div>

        <div className="flex flex-row overflow-x-auto gap-2 max-w-xl no-scrollbar">
          {Object.keys(localUser.userPreferences)
            .filter((tag) => localUser.userPreferences[tag] > 0)
            .map((tag) => (
              <TagCard key={tag} tagname={tag} />
            ))}
        </div>

        <h2 className="text-2xl font-bold my-4 self-start">Recommended Food</h2>

        {recommendedFood && (
          <>
            <RecommendedFood
              name={recommendedFood.title}
              image={recommendedFood.url}
              tags={recommendedFood.tags}
              onDiscard={() => {}}
            />

            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:scale-[102%] w-full"
              onClick={() => {
                navigator("/success");
              }}
            >
              Order recommended food
            </button>
          </>
        )}
      </div>
    </div>
  );
}
