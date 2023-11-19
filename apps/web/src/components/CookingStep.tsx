import React from "react";
import TagCard from "./TagCard";

export default function CookingStep({
  step_number,
  url,
  description,
  onFinished,
  buttonDisabled,
  buttonText,
}: {
  step_number: number;
  url: string;
  description: string;
  onFinished: () => void;
  buttonDisabled: boolean;
  buttonText: string;
}) {
  return (
    <div className="bg-white border rounded-md shadow-lg  flex flex-row items-center justify-center max-w-3xl relative">
      <div className="flex flex-row justify-center">
        <img
          src={url}
          alt={"Step " + step_number}
          className="max-w-[220px] h-52 rounded-md object-cover"
        />
        <div className="flex flex-col items-start justify-around mx-4 gap-2 p-2 max-w-[360px]">
          <h1 className="text-2xl font-bold underline ">
            {"Step " + step_number}
          </h1>
          <p className="text-lg my-2">{description}</p>
          <button
            className={
              "w-full bg-green-500 text-white text-2xl font-bold rounded-md " +
              (buttonDisabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-green-600 hover:scale-[102%]")
            }
            onClick={() => {
              !buttonDisabled && onFinished();
            }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
