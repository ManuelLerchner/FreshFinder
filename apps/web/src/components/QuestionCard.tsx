import React, { useRef } from "react";
import TinderCard from "react-tinder-card";

export default function QuestionCard({
  question,
  imageUri,
  onPositive,
  onNegative,
}: {
  question: string;
  imageUri: string;
  onPositive: () => void;
  onNegative: () => void;
}) {
  const ref = useRef(null);

  return (
    <TinderCard
      ref={ref}
      className="absolute"
      preventSwipe={["up", "down"]}
      onCardLeftScreen={(dir) => {
        if (dir === "left") {
          onNegative();
        } else if (dir === "right") {
          onPositive();
        }
      }}
    >
      <div className="bg-white rounded-xl shadow-xl p-2 flex flex-col items-center justify-center gap-2 w-96 h-80 overflow-y-auto">
        <h1 className="text-2xl font-bold">{question}</h1>
        <img
          className="w-64 h-52 rounded-md object-contain"
          src={imageUri}
          alt={question}
        />
        <div className="flex mt-1 justify-around gap-2 items-center">
          <button
            className="bg-red-500 text-white px-2 py-1 rounded-lg w-16 hover:scale-[102%]"
            onClick={() => (ref.current as any).swipe("left")}
          >
            No
          </button>
          <button
            className="bg-green-500 text-white px-2 py-1 rounded-lg w-16 hover:scale-[102%]"
            onClick={() => (ref.current as any).swipe("right")}
          >
            Yes
          </button>
        </div>
      </div>
    </TinderCard>
  );
}
