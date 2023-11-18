import React from "react";
import Card from "./Card";

export default function AmountCard({
  title,
  description,
  options,
  onSubmit,
}: {
  title: string;
  description: string;
  options: number[];
  onSubmit: (num: number) => void;
}) {
  return (
    <Card>
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-lg">{description}</p>

      <div className="flex flex-row items-center my-4 gap-2">
        {options.map((option) => (
          <button
            key={option}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md hover:scale-[102%]"
            onClick={() => {
              onSubmit(option);
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </Card>
  );
}
