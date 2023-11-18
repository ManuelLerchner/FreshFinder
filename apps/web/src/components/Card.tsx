import React from "react";

import TinderCard from "react-tinder-card";

export default function Card({ children }: { children: React.ReactNode }) {
  const onSwipe = (direction: any) => {
    console.log("You swiped: " + direction);
  };

  const onCardLeftScreen = (myIdentifier: any) => {
    console.log(myIdentifier + " left the screen");
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-xl p-4 m-4 flex flex-col items-center">
        {children}
      </div>
    </>
  );
}
