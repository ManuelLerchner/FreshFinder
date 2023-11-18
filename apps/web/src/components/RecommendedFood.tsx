import React from "react";
import TagCard from "./TagCard";

export default function RecommendedFood({
  name,
  image,
  tags,
  onDiscard,
}: {
  name: string;
  image: string;
  tags: string[];
  onDiscard: () => void;
}) {
  return (
    <div className="bg-white border rounded-md shadow-lg  flex flex-row items-center justify-center max-w-3xl relative">
      {/* <button
        className="absolute top-0 right-0 bg-red-500 text-white px-4 p-1 rounded-lg m-1 shadow-lg hover:bg-red-600 hover:scale-[102%]"
        onClick={onDiscard}
      >
        X
      </button> */}

      <div className="flex flex-row justify-center">
        <img
          src={image}
          alt={name}
          className="max-w-[220px] rounded-md object-cover"
        />
        <div className="flex flex-col items-start justify-around mx-4 p-2">
          <h1 className="text-2xl font-bold underline mb-2">{name}</h1>
          <div className="flex flex-row flex-wrap gap-2">
            {tags.map((tag) => (
              <TagCard key={tag} tagname={tag} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
