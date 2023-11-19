import React from "react";

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-xl p-4 my-4 flex flex-col items-center w-full">
      {children}
    </div>
  );
}
