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

  const [swipeCount, setSwipeCount] = useState(0);

  const [recommendedFood, setRecommendedFood] = useState<{
    RecipeId: number;
    title: string;
    url: string;
    tags: string[];
  } | null>(null);

  const queryFunction = async () => {
    setSwipeCount(swipeCount + 1);

    if (swipeCount >= 5) {
      setQuestions([]);
      return;
    }

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

    const question = next_questions!.map((question) => ({
      question: question.category,
      imageUri: question.image_url,
      categories: [question.category],
    }));

    setQuestions(question);
  };

  const placeOrder = async () => {
    console.log(localUser)
    const { data, error } = await supabase.from("Orders").insert([
      {
        id: localUser.uuid,
        RecipeId: recommendedFood!.RecipeId,
      },
    ]);

    console.log(data, error);
  };

  useEffect(() => {
    queryFunction();
  }, []);

  const navigator = useNavigate();

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
                localUser.userPreferences = mergePreferences(
                  localUser.userPreferences,
                  updates
                );

                queryFunction();
              }}
              onNegative={() => {
                const updates: { [key: string]: number } = {};

                question.categories.forEach((category) => {
                  updates[category] = -1;
                });
                localUser.userPreferences = mergePreferences(
                  localUser.userPreferences,
                  updates
                );

                queryFunction();
              }}
            />
          ))}
          {questions.length === 0 && (
            <div className="bg-white rounded-xl shadow-xl p-4 flex flex-col items-center gap-2">
              <h1 className="text-2xl font-bold">Thats it!</h1>
              <p className="text-lg">
                You found the perfect food for you! Click the button below to
                order it.
              </p>
              <img
                className="w-72 h-52 my-4 rounded-md object-contain"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Star_icon_stylized.svg/2153px-Star_icon_stylized.svg.png"
                alt="Perfect food"
              />
            </div>
          )}
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
              onClick={async () => {
                await placeOrder();
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
