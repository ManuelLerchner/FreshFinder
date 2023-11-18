import React from "react";

export default function RecommendedFood({
  name,
  image,
  description,
  onDiscard,
}: {
  name: string;
  image: string;
  description: string;
  onDiscard: () => void;
}) {
  return (
    <div className="bg-white border rounded-md shadow-lg  flex flex-row items-center justify-center">
      <div className="flex flex-row items-center justify-center">
        <img src={image} alt={name} className="w-52" />
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-lg">{description}</p>
        </div>
      </div>
    </div>
  );
}
