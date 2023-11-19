import React, { useState } from "react";
import Card from "./Card";

export default function OptionCard<T extends React.ReactNode>({
  title,
  description,
  options,
  onSubmit,
}: {
  title: string;
  description: string;
  options: T[];
  onSubmit: (num: T) => void;
}) {
  const [value, setValue] = useState<T>();

  return (
    <Card>
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-lg">{description}</p>

      <div className="flex flex-row items-center my-4 gap-2">
        {options.map((option) => (
          <button
            key={"option-" + option}
            className={
              "  text-white px-4 py-2 rounded-md hover:scale-[102%] " +
              (value === option
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-green-500 hover:bg-green-600")
            }
            onClick={() => {
              setValue(option);
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
