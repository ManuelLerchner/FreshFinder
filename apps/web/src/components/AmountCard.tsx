import React, { useEffect, useState } from "react";
import Card from "./Card";
import { highlightText } from "../util/highlightText";

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
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
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
