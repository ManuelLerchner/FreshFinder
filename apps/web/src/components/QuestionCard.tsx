import React from "react";

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
    <div className="bg-white rounded-xl shadow-xl p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold">{question}</h1>
      <div className="flex mt-4 items-center gap-2">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={onNegative}
        >
          No
        </button>

        <img className="w-64 rounded-md shadow-xl" src={imageUri} />

        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={onPositive}
        >
          Yes
        </button>
      </div>
    </div>
  );
}
