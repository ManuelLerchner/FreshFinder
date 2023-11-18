import React, { useEffect, useState } from "react";
import Card from "./Card";
import { highlightText } from "../util/highlightText";

export default function SelectionCard({
  title,
  description,
  options,
  onChange,
  onNext,
}: {
  title: string;
  description: string;
  options: string[];
  onChange: (options: string[]) => void;
  onNext: () => void;
}) {
  const [search, setSearch] = useState<string>("");
  const [selected, setSelected] = useState<string[]>([]);

  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);

  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, options]);

  return (
    <Card>
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-lg">{description}</p>

      <input
        type="text"
        className="border-2 border-gray-500 rounded-lg px-2 py-1"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul className="flex flex-col items-start my-4 space-y-2">
        {filteredOptions.map((option) => (
          <li key={option}>
            <label className="text-xl font-bold">
              <input
                type="checkbox"
                className="mr-2"
                name={title}
                value={option}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelected([...selected, option]);
                  } else {
                    setSelected(selected.filter((o) => o !== option));
                  }
                  onChange(selected);
                }}
              />
              {highlightText(option, search)}
            </label>
          </li>
        ))}
      </ul>

      <button
        className="bg-green-600 text-white px-2 py-1 rounded-lg self-end"
        onClick={() => {
          onNext();
        }}
      >
        Next
      </button>
    </Card>
  );
}
