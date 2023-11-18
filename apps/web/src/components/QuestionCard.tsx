import React, { useState } from "react";
import Card from "./Card";
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
  return (
    <div className="max-w-full">
      <TinderCard
        preventSwipe={["up", "down"]}
        onCardLeftScreen={(dir) => {
          if (dir === "left") {
            onNegative();
          } else if (dir === "right") {
            onPositive();
          }
        }}
      >
        <Card>
          <h1 className="text-2xl font-bold">{question}</h1>
          <img className="w-72 rounded-md" src={imageUri} />
          <div className="w-full flex mt-4 justify-around gap-2">
            <button
              className="bg-red-500 text-white px-2 py-1 rounded-lg w-16"
              onClick={onNegative}
            >
              No
            </button>
            <button
              className="bg-green-500 text-white px-2 py-1 rounded-lg w-16"
              onClick={onPositive}
            >
              Yes
            </button>
          </div>
        </Card>
      </TinderCard>
    </div>
  );
}
