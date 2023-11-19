import React, { useState } from "react";
import Card from "./Card";

export default function SliderCard({
  title,
  description,
  onChange,
}: {
  title: string;
  description: string;
  onChange: (num: number) => void;
}) {
  const [value, setValue] = useState(0);

  return (
    <Card>
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-lg">{description}</p>

      <div className="w-full flex flex-col justify-between my-4">
        <input
          type="range"
          min="0"
          max="100"
          className="range my-2"
          onChange={(e) => {
            onChange(Number(e.target.value));
          }}
        />
        <div className="w-full flex justify-between text-xs px-2">
          <span>short</span>
          <span>medium</span>
          <span>long</span>
        </div>
      </div>
    </Card>
  );
}
