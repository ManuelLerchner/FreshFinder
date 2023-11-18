import React from "react";

export default function SelectionCard({
  title,
  description,
  options,
  selected,
  onChange,
}: {
  title: string;
  description: string;
  options: string[];
  selected: string;
  onChange: (selected: string) => void;
}) {
  return (
    <div className="bg-white rounded-xl shadow-xl p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-lg">{description}</p>

      <ul className="flex flex-col items-start my-4 space-y-2">
        {options.map((option) => (
          <li key={option}>
            <label className="text-xl font-bold">
              <input
                type="radio"
                checked={selected === option}
                onChange={() => onChange(option)}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
