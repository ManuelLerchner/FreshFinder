import React, { useState } from "react";
import Card from "./Card";

export default function SliderCard({
  title,
  description,
  onSubmit,
}: {
  title: string;
  description: string;
  onSubmit: (num: number) => void;
}) {
  const [value, setValue] = useState(0);

  return (
    <Card>
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-lg">{description}</p>

      <input
        type="range"
        min="0"
        max="100"
        className="range my-4"
        onChange={(e) => {
          setValue(Number(e.target.value));
        }}
      />

      <button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md hover:scale-[102%]"
        onClick={() => {
          onSubmit(value);
        }}
      >
        Confirm
      </button>
    </Card>
  );
}
